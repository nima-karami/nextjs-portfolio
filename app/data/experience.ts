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
      `Ran two rounds of customer discovery (25+ conversations) and made hard product calls from them: pivoted from a guardrailed builder to a blank-canvas editor, then wedged on gift givers, the least price-sensitive segment, choosing to solve the pain beneath feature requests rather than ship every ask and to position YOURS as a premium gift experience over price-driven print-on-demand.`,
      `Designed an interactive prototype for an AI gift concierge that replaces an intimidating blank canvas with a guided conversation: it profiles the recipient and occasion, then routes the resulting brief into AI image generation to propose ready-to-buy designs, the on-ramp for non-designers, with the full editor as opt-in depth.`,
      `Designed and built the product 0-to-1 and solo in an AI-native, agentic-coding workflow, including a real-time 2D-to-3D preview that composites user-authored canvas art onto textured 3D garment models (Three.js / React Three Fiber) entirely client-side.`,
      `Designed an extensible plugin system, with product, tool, and template registries that decouple products, design tools, and print geometry from the rendering engine, so adding a new garment or design tool is a self-contained plugin with no engine changes.`,
    ],
  },
  {
    company: 'TimePlay',
    position: 'Lead Full-Stack Developer',
    date: '2024 – Present',
    description: [
      `Built a full-stack analytics system: a client-side event pipeline (buffer, flush, retry) instrumenting UI impressions, interactions, and auth/session/transaction state across the lottery app, storefronts, and scratch games, feeding a Go batch-ingestion endpoint and schema with PII-masked data-warehouse exports.`,
      `Created and led a real-money cruise-line gaming web client (React/TypeScript) from kickoff through launch, directing a cross-functional team of up to seven developers (frontend, backend, and game), building the bulk of the codebase and owning the instant-win game engine, payment/wallet flows, PWA behavior, and accessibility; the launch increased the cruise-line partner's gross revenue 21%.`,
      `Built the partner-configuration architecture serving seven cruise-line partners, replacing a fork-per-partner approach with a single source of truth for feature flags, behavior, copy, and theming, and wrote its documentation.`,
      `Built a solo, agentic "prompt to playable game" pipeline (Gemini creative director, multimodal asset generation, vision-LLM QA-and-repair eval loop), exposing each stage as a discrete, agent-invocable CLI tool so a coding agent can call them to generate, evaluate, and iterate autonomously; I used the demo to start an internal AI working group.`,
    ],
  },
  {
    company: 'TimePlay',
    position: 'Full-Stack Developer',
    date: '2023 – 2024',
    description: [
      `Led the design, front-end development, and product direction of a live Deal or No Deal game: designed the full flow in Figma and built and shipped the React/TypeScript controller as lead developer, iterating with the product manager through playtests alongside marketing, customer success, and product from concept to launch; introducing the mobile version increased both players and gross revenue 12%.`,
      `On Wheel of Fortune, owned the multi-package purchase flow (package selection and branded confirmation) in the player-facing dashboard SPA, and built the gameplay controller's puzzle-solve feature end-to-end: a six-state solve flow with submit/lock logic and a message-queue layer for real-time network and state events, letting players solve the puzzle from their phone, on a title that reaches over 35,000 players a year.`,
      `Extended a Node.js/Express and MongoDB payments service that charges and pays out cruise-passenger folios, taking it from a single cruise line to multiple partners (NCL, Carnival, RCCL) through partner-aware payment routing and SOAP integrations with each line's financial systems, and added a filterable transactions-ledger endpoint.`,
    ],
  },
  {
    company: 'TimePlay',
    position: 'Frontend Developer',
    date: '2022 – 2023',
    description: [
      `Introduced React to solve an ADA-compliance blocker: the company's Phaser/canvas trivia game could not be made accessible and a partner (Carnival) had a legal requirement. Built the company's first WCAG/ADA-accessible game controller (React + Tailwind, with aria-live screen-reader announcements and focus management); it passed a third-party audit (UsableNet), won partner sign-off, and became the default controller pattern across partners, on trivia titles that reach over 600,000 players a year.`,
    ],
  },
  {
    company: 'Functionland',
    position: 'UX Designer',
    date: '2021 – 2022',
    description: [
      `Designed and built Functionland's landing page, translating early product positioning into a public-facing web experience, and directed a small design team on supporting media content.`,
    ],
  },
  {
    company: 'Diamond Schmitt',
    position: 'Architectural Designer & Computational Designer',
    date: '2021 – 2022',
    description: [
      `Implemented evolutionary algorithms to optimize tower placement and geometry, improving urban space utilization and architectural quality.`,
      `Engineered an automated system for simulating shadow impacts, leveraging weather data for environmental analysis.`,
    ],
  },
];
