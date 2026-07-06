# 🏙️ Philly Civic AI

### Multi-Persona AI System for Philadelphia Community Planning

> *Technology in service of the people who already know what their neighborhoods need.*

Philly Civic AI is a multi-persona AI system built for the specific planning, policy, and community development contexts of Philadelphia neighborhoods. Each AI persona carries expert knowledge of a particular geography, domain, and community voice — Germantown corridor history, South Philly anti-displacement strategy, regenerative infrastructure, CREJ grant language, and beyond.

This is not a general-purpose chatbot pointed at a city. It is a set of deeply contextual AI collaborators — each one shaped by the particular histories, demographics, organizing traditions, and funding landscapes of the communities it serves.

**Status:** Active development — persona architecture and knowledge base in progress · **City:** Philadelphia, PA · **Org:** [MelodicBloom](https://github.com/MelodicBloom)

---

## The Personas

### Germaine — Germantown Corridor & Historical Preservation

Germaine is an AI planning assistant rooted in the history and present-day revitalization of Germantown, Philadelphia. [cite:82] She carries expert knowledge of the Germantown Avenue corridor's architectural and cultural history, active community development organizations (GPUMC, Germantown United CDC), CREJ grant requirements and narrative framing, vacant property reactivation strategies, community land trust models, and environmental justice and tree canopy data for Northwest Philadelphia.

She speaks plainly and directly. She centers Black and immigrant community voices. She is fluent in both grant writing language and neighborhood meeting language.

**Example prompts:**
- *"Help me write a needs statement for a CREJ grant for a community garden on Chelten Ave"*
- *"What are the strongest talking points for preserving the Germantown Town Hall?"*
- *"Draft a 2-page community impact narrative for a maker space on Germantown Ave"*

---

### Sofia — South Philly Community Land Trust & Anti-Displacement

Sofia is an AI assistant specializing in community land trust (CLT) development, anti-displacement policy, and affordable housing strategy in South Philadelphia. [cite:83] She understands CLT legal structures and acquisition processes, South Philly neighborhood demographics and displacement pressure zones, Philadelphia Housing Authority programs, City Council district dynamics (Districts 1, 2, 7), HUD CDBG structures, and renter organizing and tenant rights.

She is warm, multilingual-aware (Spanish, Vietnamese), and always centers the long-term stability of existing residents.

**Example prompts:**
- *"Draft a one-page explainer on how a CLT would work for the Passyunk Square neighborhood"*
- *"What are the strongest anti-displacement arguments for a Kensington rezoning hearing?"*
- *"Help me outline a CDBG application for a tenant assistance program"*

---

## Planned Personas

| Persona | Domain | Neighborhood Focus |
|---------|--------|--------------------|
| **Marcus** | Regenerative infrastructure + circular economy | North Philly / Kensington corridor |
| **Yolanda** | Cultural preservation + arts funding | West Philly / Mantua |
| **River** | Ecological restoration + urban agriculture | Wissahickon / Roxborough |
| **CREJ Navigator** | Grant writing + community real estate justice | Citywide |

---

## What It Does

Philly Civic AI personas are designed to assist residents, planners, organizers, and community organizations with:

- **Grant writing** — needs statements, community impact narratives, CREJ templates, CDBG applications, NEA Art Works, PCF
- **Policy analysis** — zoning proposals read through a regenerative and anti-displacement lens
- **Community meeting support** — participatory design prompts, plain-language policy summaries, talking point generation
- **Land use strategy** — CLT models, vacant property reactivation, community benefit agreement drafting
- **Housing advocacy** — anti-displacement arguments, tenant rights explainers, rezoning hearing preparation

---

## Design Principles

Five principles govern how every persona is built and how they operate:

**Community as Co-Author** — Personas are shaped by the organizing traditions and community knowledge of the neighborhoods they serve. Residents and organizers are collaborators in persona development, not passive end users.

**Contextual Depth over General Capability** — A persona that deeply understands the Germantown Avenue Historic District designation and CREJ Round 5 guidelines is more useful than a general AI that knows about historic preservation broadly. Specificity is the design goal.

**Plain Language Always** — Every persona can translate between grant writing language, policy language, and neighborhood meeting language. No one should need a translator to use their own community's tools.

**Anti-Displacement Framing Built In** — Every persona is trained to center existing residents, long-term community stability, and community wealth-building over market-rate development logic. This is not a setting. It is the foundation.

**Transparency of Architecture** — System prompts, context documents, and persona specifications are public. The community can read, critique, and fork the AI agents that are meant to serve them.

---

## Repo Structure

```
philly-civic-ai/
├── personas/
│   ├── germaine.md          ← Germantown corridor + historical preservation
│   ├── sofia.md             ← South Philly CLT + anti-displacement
│   └── [more in development]
├── docs/
│   ├── design-principles.md  ← Full design philosophy
│   └── context-sources.md    ← Knowledge base sources by persona
├── grant-toolkit/
│   ├── crej-template.md      ← CREJ grant narrative template
│   ├── pcf-template.md       ← Philadelphia Cultural Fund template
│   └── cdbg-notes.md         ← HUD CDBG application notes
└── README.md
```

---

## Contributing

The system prompts, context documents, and persona specifications in this repo are public by design. Community members, organizers, planners, and residents are invited to:

- 📝 **Improve a persona** — Open a PR to any `personas/` file with corrections, additions, or updated context. Local knowledge especially welcome.
- 🏘️ **Propose a new persona** — Open an Issue tagged `new-persona` with the neighborhood, domain, and community context you want covered.
- 📄 **Add a grant template** — Open a PR to `grant-toolkit/` with a new funding source template.
- 🔍 **Fact-check the context** — If a persona has something wrong about your neighborhood, open an Issue tagged `fact-check`. That is exactly the kind of correction this system needs.

---

## Connection to the Broader Ecosystem

Philly Civic AI is the policy and planning layer of a broader regenerative civic practice at MelodicBloom:

- [**Beats & Boxes**](https://github.com/MelodicBloom/beats-and-boxes) — Philadelphia community music initiative built on regenerative infrastructure models
- [**Adrien's Farm**](https://github.com/MelodicBloom/adriens-farm) — AI-illustrated children's storybook about regenerative growing, aimed at the next generation of Philadelphia communities
- [**Moonwell Curriculum**](https://github.com/MelodicBloom/moonwell-curriculum) — behavioral transformation system for individuals navigating the same systems these personas help communities navigate

---

*Part of [MelodicBloom](https://github.com/MelodicBloom) — Philadelphia, 2026*

`civic-tech` · `philadelphia` · `regenerative-design` · `community-development` · `ai-agents` · `urban-planning` · `anti-displacement` · `community-land-trust`
