export type Experience = {
  company: string;
  position: string;
  date: string;
  description: string[];
};

export const experience: Experience[] = [
  {
    company: 'YOURS',
    position: 'Founder',
    date: '2025 – Present',
    description: [
      `Ran two rounds of customer discovery (25+ conversations) and made the hard calls from them: pivoted from a guardrailed builder to a blank-canvas editor, then wedged on gift givers, the least price-sensitive segment, positioning YOURS as a premium gift experience over price-driven print-on-demand.`,
      `Designed an interactive prototype for an AI gift concierge that replaces a blank canvas with a guided conversation: it profiles the recipient and occasion, then routes the brief into AI image generation to propose ready-to-buy designs, with the full editor as opt-in depth for non-designers.`,
      `Designed and built the product 0-to-1 and solo in an AI-native agentic-coding workflow, including a client-side real-time 2D-to-3D preview that composites user-authored canvas art onto textured 3D garment models (Three.js / React Three Fiber).`,
      `Designed an extensible plugin system with product, tool, and template registries that decouple products, design tools, and print geometry from the rendering engine, so a new garment or design tool ships as a self-contained plugin with no engine changes.`,
    ],
  },
  {
    company: 'TimePlay',
    position: 'Lead Full-Stack Developer',
    date: '2024 – Present',
    description: [
      `Built a full-stack analytics system: a client-side event pipeline (buffer, flush, retry) instrumenting impressions, interactions, and auth/session/transaction state across the lottery app, storefronts, and scratch games, feeding a Go batch-ingestion endpoint with PII-masked data-warehouse exports.`,
      `Created and led a real-money cruise-line gaming web client (React/TypeScript) from kickoff through launch, directing a cross-functional team of up to seven, building the bulk of the codebase and owning the instant-win game engine, payment/wallet flows, PWA, and accessibility; the launch increased the partner's gross revenue 21%.`,
      `Built and documented the partner-configuration architecture serving seven cruise-line partners, replacing a fork-per-partner approach with a single source of truth for feature flags, behavior, copy, and theming.`,
      `Built a solo, agentic "prompt to playable game" pipeline using Gemini, multimodal asset generation, and a vision-LLM QA/eval loop, exposing each stage as an agent-invocable CLI tool; used the demo to start an internal AI working group.`,
    ],
  },
  {
    company: 'TimePlay',
    position: 'Full-Stack Developer',
    date: '2023 – 2024',
    description: [
      `Led the design, front-end, and product direction of a live Deal or No Deal game: designed the full flow in Figma and shipped the React/TypeScript controller as lead developer, iterating with the product manager through playtests; introducing the mobile version increased both players and gross revenue 12%.`,
      `On Wheel of Fortune (35,000+ players a year), owned the multi-package purchase flow in the player-facing dashboard SPA and built the gameplay controller's puzzle-solve feature end-to-end: a six-state solve flow with submit/lock logic and a message-queue layer for real-time network and state events, letting players solve from their phone.`,
      `Extended a Node.js/Express and MongoDB payments service for cruise-passenger folios from a single cruise line to multiple partners (NCL, Carnival, RCCL) via partner-aware routing and SOAP integrations with each line's financial systems, and added a filterable transactions-ledger endpoint.`,
    ],
  },
  {
    company: 'TimePlay',
    position: 'Frontend Developer',
    date: '2022 – 2023',
    description: [
      `Introduced React to solve an ADA-compliance blocker: the company's Phaser/canvas trivia game (600,000+ players a year) could not be made accessible and a partner (Carnival) had a legal requirement. Built the company's first WCAG/ADA-accessible game controller (React + Tailwind, aria-live announcements, focus management); it passed a third-party audit (UsableNet), won partner sign-off, and became the default controller across partners.`,
    ],
  },
  {
    company: 'Functionland',
    position: 'UX Designer',
    date: '2021 – 2022',
    description: [
      `Designed and built Functionland's landing page and directed a small design team on supporting launch media.`,
    ],
  },
  {
    company: 'Diamond Schmitt',
    position: 'Architectural Designer & Computational Designer',
    date: '2021 – 2022',
    description: [
      `Built computational design tools for tower-placement optimization and shadow-impact simulation, using evolutionary algorithms and weather data to support architectural decision-making.`,
    ],
  },
];
