import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ledgerPath = path.join(root, 'data', 'agrarian-futures', 'claim-ledger.json');
const states = new Set(['verified', 'sourced_unreviewed', 'source_required', 'hypothesis', 'proposal', 'simulated', 'narrative']);
const required = ['id', 'claim', 'domain', 'evidence_state', 'source_required', 'jurisdiction', 'date_scope', 'units', 'method', 'uncertainty', 'review_status', 'article_id', 'source_title', 'source_url', 'source_date', 'source_locator'];

function validateLedger(value) {
  const errors = [];
  if (!value || typeof value !== 'object' || Array.isArray(value)) return ['ledger must be a JSON object'];
  if (value.version !== 'v0') errors.push('version must be "v0"');
  if (!Array.isArray(value.claims)) return [...errors, 'claims must be an array'];
  const ids = new Set();
  value.claims.forEach((record, index) => {
    const label = `claims[${index}]`;
    if (!record || typeof record !== 'object' || Array.isArray(record)) { errors.push(`${label} must be an object`); return; }
    for (const field of required) if (!(field in record)) errors.push(`${label} missing required field "${field}"`);
    if (typeof record.id !== 'string' || !/^AF-(ECO|MRV)-\d{3}$/.test(record.id)) errors.push(`${label}.id has invalid stable ID format`);
    if (ids.has(record.id)) errors.push(`duplicate claim ID "${record.id}"`);
    ids.add(record.id);
    if (!states.has(record.evidence_state)) errors.push(`${label}.evidence_state is not an allowed evidence state`);
    if (![0, 3].includes(record.article_id)) errors.push(`${label}.article_id must be 0 or 3`);
    if (typeof record.source_required !== 'boolean') errors.push(`${label}.source_required must be boolean`);
    for (const field of required) if (field in record && typeof record[field] !== 'string' && !['article_id', 'source_required'].includes(field)) errors.push(`${label}.${field} must be a string`);
    if (record.evidence_state === 'verified') {
      for (const field of ['source_title', 'source_url', 'source_date', 'source_locator']) if (!record[field]?.trim()) errors.push(`${label} verified claim requires non-empty ${field}`);
      if (record.source_required) errors.push(`${label} verified claim cannot have source_required=true`);
    }
  });
  return errors;
}

async function readJson(file) { return JSON.parse(await readFile(file, 'utf8')); }
function assertRejected(value, label) { const errors = validateLedger(value); if (!errors.length) throw new Error(`self-test failed: ${label} was accepted`); }

if (process.argv.includes('--self-test')) {
  const valid = { version: 'v0', claims: [{ id: 'AF-ECO-001', claim: 'x', domain: 'economics', evidence_state: 'source_required', source_required: true, jurisdiction: '', date_scope: '', units: '', method: '', uncertainty: '', review_status: '', article_id: 0, source_title: '', source_url: '', source_date: '', source_locator: '' }] };
  assertRejected({ ...valid, claims: [valid.claims[0], { ...valid.claims[0] }] }, 'duplicate ID');
  assertRejected({ ...valid, claims: [{ ...valid.claims[0], evidence_state: 'verified' }] }, 'verified record without source metadata');
  console.log('SELF-TEST PASS (duplicate ID and missing verified source metadata rejected)');
} else {
  try {
    const errors = validateLedger(await readJson(ledgerPath));
    if (errors.length) { console.error(`FAIL (${errors.length} validation error${errors.length === 1 ? '' : 's'})`); errors.forEach((error) => console.error(`- ${error}`)); process.exitCode = 1; }
    else {
      const ledger = await readJson(ledgerPath);
      const counts = Object.fromEntries([...states].map((state) => [state, ledger.claims.filter((claim) => claim.evidence_state === state).length]));
      console.log(`PASS (${ledger.claims.length} records, ${Object.entries(counts).map(([state, count]) => `${state}=${count}`).join(', ')})`);
    }
  } catch (error) { console.error(`FAIL: ${error.message}`); process.exitCode = 1; }
}
