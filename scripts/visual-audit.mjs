import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import { accessSync, constants } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const url = process.env.AUDIT_URL || process.argv[2] || 'http://127.0.0.1:4173';
const outputRoot = path.resolve(process.env.AUDIT_OUTPUT || 'visual-artifacts');
const explicitChromium = process.env.CHROMIUM_BIN;

function resolveChromium() {
  const candidates = [
    explicitChromium,
    '/data/data/com.termux/files/usr/bin/chromium-browser',
    '/data/data/com.termux/files/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/usr/bin/google-chrome',
  ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      accessSync(candidate, constants.X_OK);
      return candidate;
    } catch {
      // Keep searching.
    }
  }

  for (const command of ['chromium-browser', 'chromium', 'google-chrome']) {
    try {
      return execFileSync('command', ['-v', command], { encoding: 'utf8', shell: true }).trim();
    } catch {
      // Keep searching.
    }
  }

  try {
    const playwrightBinary = chromium.executablePath();
    accessSync(playwrightBinary, constants.X_OK);
    return playwrightBinary;
  } catch {
    // Continue to the actionable error.
  }

  throw new Error('Chromium was not found. In Termux run: pkg install x11-repo chromium');
}

const executablePath = resolveChromium();
const extraArgs = (process.env.TERMUX_CHROMIUM_ARGS || '')
  .split(' ')
  .map((value) => value.trim())
  .filter(Boolean);

const browser = await chromium.launch({
  executablePath,
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--disable-software-rasterizer',
    '--no-first-run',
    '--no-default-browser-check',
    ...extraArgs,
  ],
});

const routes = ['story', 'sitemap', 'article', 'diagram', 'interactive'];
const viewports = [
  { name: 'narrow-mobile', width: 320, height: 720 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'desktop', width: 1440, height: 1200 },
];
const findings = [];

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => pageErrors.push(error.message));

  for (const route of routes) {
    const routeDir = path.join(outputRoot, viewport.name);
    await mkdir(routeDir, { recursive: true });
    const response = await page.goto(`${url}/#${route}`, { waitUntil: 'networkidle', timeout: 45_000 });
    await page.waitForTimeout(350);

    const metrics = await page.evaluate(() => {
      const root = document.querySelector('#root');
      const main = document.querySelector('main');
      return {
        title: document.title,
        heading: document.querySelector('h1')?.textContent?.trim() || '',
        rootTextLength: root?.textContent?.trim().length || 0,
        mainVisible: Boolean(main && main.getBoundingClientRect().height > 0),
        horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        buttons: document.querySelectorAll('button').length,
        imagesWithoutAlt: [...document.images].filter((image) => !image.hasAttribute('alt')).length,
      };
    });

    const screenshot = path.join(routeDir, `${route}.png`);
    await page.screenshot({ path: screenshot, fullPage: true });

    const failures = [];
    if (!response?.ok()) failures.push(`HTTP ${response?.status() ?? 'no response'}`);
    if (!metrics.mainVisible) failures.push('main content is not visible');
    if (metrics.rootTextLength < 200) failures.push('root content appears incomplete');
    if (metrics.horizontalOverflow > 4 && route !== 'diagram') failures.push(`horizontal overflow: ${metrics.horizontalOverflow}px`);
    if (!metrics.heading) failures.push('missing primary heading');

    if (route === 'story') {
      const story = page.getByTestId('field-to-city-story');
      if (!(await story.isVisible())) failures.push('story is not visible');
      await page.getByRole('button', { name: 'Aggregate stability' }).click();
      if (!(await page.getByText('A method, not a local result').isVisible())) failures.push('evidence note is missing');
      await page.getByRole('button', { name: 'Show B' }).click();
      if ((await page.locator('#af-reveal').inputValue()) !== '100') failures.push('scenario control failed');
      await page.getByRole('button', { name: 'Compare equally' }).click();
    }

    findings.push({
      viewport: viewport.name,
      route,
      screenshot,
      metrics,
      consoleErrors: [...consoleErrors],
      pageErrors: [...pageErrors],
      failures,
    });
    consoleErrors.length = 0;
    pageErrors.length = 0;
  }

  await context.close();
}

await browser.close();
await mkdir(outputRoot, { recursive: true });
await writeFile(path.join(outputRoot, 'audit.json'), `${JSON.stringify({ url, executablePath, findings }, null, 2)}\n`);

const failed = findings.filter((finding) => finding.failures.length || finding.consoleErrors.length || finding.pageErrors.length);
if (failed.length) {
  console.error(`Visual audit failed in ${failed.length} route/viewport combinations.`);
  for (const item of failed) {
    console.error(`- ${item.viewport}/${item.route}: ${[...item.failures, ...item.consoleErrors, ...item.pageErrors].join('; ')}`);
  }
  process.exit(1);
}

console.log(`Visual audit passed. Artifacts: ${outputRoot}`);
