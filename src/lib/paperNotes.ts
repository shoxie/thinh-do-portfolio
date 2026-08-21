export type PaperNote = {
  file: string;
  desc: string;
  learned: string;
  applied: string;
  future: string;
};

export const PAPER_LABELS = {
  learned: "What I learned (What)",
  applied: "So what — analysis for Art Direction",
  future: "Now what — how I apply it as AD",
} as const;

/* keyed by the `file` value in projects.json */
export const PAPER_NOTES: Record<string, PaperNote> = {
  "busm4769-asm1.docx": {
    file: "busm4769-asm1.docx",
    desc: "Evaluates Interviewer.AI at AIA Vietnam — efficiency (time/cost) vs. bias and opacity — and proposes a human-in-the-loop governance model. For an Art Director this is the same tension as AI culling/retouch and generative mood boards: powerful, but unsayable without oversight.",
    learned:
      "AI magnifies both efficiency and bias. My contribution was to audit outputs against ethical risk, not just speed — tracing where training data or opaque scoring could silently exclude talent.",
    applied:
      "Applied critical review to map Interviewer.AI failure modes and design a control layer: transparent criteria, audit logs and a required human review checkpoint before any candidate rejection. The logic mirrors how I now gate AI-assisted selects and retouch — tool proposes, human decides.",
    future:
      "As AD I will keep AI as pre-select, never decision-maker: publish the criteria I use for casting and shortlisting, keep human sign-off, and schedule bias checks after each campaign — so visual decisions stay defensible to client and talent.",
  },
  "asm-2-er.docx": {
    file: "asm-2-er.docx",
    desc: "Collective enterprise bargaining at Telstra (Australia) — CWU union vs. management cost pressure — analysed through integrative (win-win) bargaining within the Fair Work system.",
    learned:
      "How Australian collective bargaining actually works: protected action, good-faith requirements and the difference between distributive and integrative moves. My role was to translate legal structure into negotiable interests rather than positions.",
    applied:
      "Mapped each party’s underlying interests and built a package trade (wage guardrails + productivity gains + rostering flexibility) instead of single-issue haggling — the same packaging I now use to align usage rights, shoot days and revisions with a client budget.",
    future:
      "On productions I will frame negotiations around interests not demands: one-page term sheets, explicit scope vs. fee tables, and documented approvals. The ER lens keeps freelance sets professional — clear, fair, and enforceable.",
  },
  "asm-3-er.docx": {
    file: "asm-3-er.docx",
    desc: "CBA employment relations under heavy regulation — pay structures, DEI, and remote-work friction — with compliance-led conflict strategies. Directly relevant to running a diverse, partly-remote creative crew.",
    learned:
      "That compliance is not admin overhead but trust infrastructure: minimum standards, DEI and remote-work policy shape whether people can do their best work. I learned to read a workplace through those structures, not just culture statements.",
    applied:
      "Diagnosed CBA’s friction points (pay equity gaps, remote fatigue, inclusion) and built resolution pathways that kept both compliance and engagement in scope — a discipline I now apply to call sheets, credit, consent and post-production handoffs.",
    future:
      "As AD I will run sets with a written standards checklist: inclusive casting briefs, consent and credit before release, and remote-retouch workflows with boundaries on hours — so craft quality does not depend on informal goodwill.",
  },
  "asm-1.docx": {
    file: "asm-1.docx",
    desc: "In-depth interviews at five Vietnamese firms (Vinamilk, VUS, VEAM, Uniqlo, SunHouse) on how digital tools lift productivity yet create adaptation stress — a precise analogue for a studio adopting AI culling, tethered workflow and cloud delivery.",
    learned:
      "How to run semi-structured interviews, code themes and separate real productivity gain from novelty. My contribution was synthesis: five noisy workplaces distilled into a pattern — tool helps most where the human workflow was re-designed, not where it was simply overlaid.",
    applied:
      "Mapped benefits (fewer manual repeats) vs. frictions (skill anxiety, blurred hours) and linked each to a workflow redesign opportunity. That same diagnosis now guides my studio pipeline — automate selects/exports, but keep creative decisions human-paced and documented.",
    future:
      "As AD I will introduce new tools with a micro-change plan: pilot, measure, train, retro. The paper taught me that adoption failure is rarely about the tool — it is about skipping the human transition.",
  },
  "people-analytics-asm-2-1.docx": {
    file: "people-analytics-asm-2-1.docx",
    desc: "Conflict-of-interest and governance case — transparency, CSR and internal controls. For a studio, this is how you keep decision-making clean when client, talent and personal brand interests collide.",
    learned:
      "That governance is not bureaucracy but a creative enabler: clear codes keep a small team fast because choices are pre-legitimized. I learned to write recommendations as controls — who decides, on what evidence, logged where.",
    applied:
      "Built ethical guardrails from real conflict scenarios (recusal rules, dual-approval for sensitive usage). I now frame set governance the same way: consent logs, usage caps and a paper trail for contentious selects — so disputes never become personal.",
    future:
      "Every Art Direction engagement will start with a one-page governance note: decision rights, conflict routes and post-mortem rules. Trust scales with that clarity, not with charisma.",
  },
  "as3-sgs-tut01-team-4-1.docx": {
    file: "as3-sgs-tut01-team-4-1.docx",
    desc: "Qualitative People Analytics on 27 L'Oréal Vietnam Glassdoor reviews — IMPACT + Val AI for thematic/sentiment mapping (career block, leadership) → Qualtrics follow-up design. Direct method for listening to a creative crew without formal HR.",
    learned:
      "To treat text as data: IMPACT framing, inductive coding with Val AI, then human validation to avoid hallucinating themes. My contribution was the judgment layer — separating signal (repeated career-ceiling mentions) from noise (one-off rants).",
    applied:
      "Surfaced that advancement opacity, not workload, drove attrition sentiment and designed a Qualtrics instrument to test it. That listening sequence is now my set retro: anonymous pulse checks, thematic read, then a concrete fix before next shoot.",
    future:
      "As AD I will run a lightweight people-analytics loop on every team: pre-shoot expectations check, post-shoot 5-question pulse, quarterly theme review. The camera directional skill matters less if the team’s signal is ignored.",
  },
  "busm2565-assessment-report.docx": {
    file: "busm2565-assessment-report.docx",
    desc: "Peer contribution audit for BUSM2565 — task split, milestone tracking and calibrated peer matrix. The Artefact art directors need most: how to keep credit fair when ideas are shared.",
    learned:
      "That fairness is designed, not declared. I learned to set observable criteria before work starts and evidence contributions in a shared doc — so evaluation never relies on memory or loudest voice.",
    applied:
      "Facilitated criteria alignment, then reviewed deliverables evidence-first before scoring. That structure prevented last-minute inflation and is now my model for crew credit and revisions accounting on set.",
    future:
      "Future teams will get a one-page contribution charter on day one: who owns what, how review works, how disputes escalate. Transparency early is kinder than arbitration late.",
  },
  "busm2565-sg-g10-team-02-business-environment-report.pdf": {
    file: "busm2565-sg-g10-team-02-business-environment-report.pdf",
    desc: "Full PESTLE/SWOT + supply-and-demand assessment of Gucci — counterfeits, Millennial demand and PR shocks linked to revenue via brand-equity analysis. Core commercial literacy for an Art Director who must protect a client’s brand while pushing a visual idea.",
    learned:
      "To link outside-in analysis to an inside decision. My contribution was translating macro shifts (counterfeit supply, demand rotation) into a choice: where Gucci should not commercialize despite short-term revenue.",
    applied:
      "Quantified how counterfeit pressure and crisis coverage eroded perceived scarcity and built recommendations around scarcity protection, not discounting. That same outside-in check now frames my shoot briefs: what market tension is this image paid to resolve?",
    future:
      "Before any campaign I will require a 120-word brand-pressure note (PESTLE + demand) so visual risk is tied to business risk — AD judgment framed in the client’s P&L language, not just aesthetics.",
  },
  "case-study-analysis-ube-asm-3.docx": {
    file: "case-study-analysis-ube-asm-3.docx",
    desc: "Vinamilk competitive positioning — value chain, financial matrix and industry structure → growth plays for international expansion. How an AD reads a Vietnamese client’s operable advantage, not just its product shots.",
    learned:
      "To map a value chain to where the brand can actually defend margin. I learned to find the kink — the one capability (cold chain, sourcing, distribution) that makes a premium image believable.",
    applied:
      "Fused financial ratios with chain analysis to isolate Vinamilk’s durable edge and built expansion options that reinforce it, rather than chase volume. That discipline keeps my food/product art direction honest — styling never promises what the chain cannot deliver.",
    future:
      "As AD for FMCG/hospitality I will start with ops reality: sample the chain, shoot what it reliably does best, and grade the story to that truth. Visual credibility outlasts visual novelty.",
  },
  "busm4561-asm1.docx": {
    file: "busm4561-asm1.docx",
    desc: "ILO/OECD-backed analysis of how automation, pandemic and economic volatility re-shape youth labour — with a Vietnam lens from personal jewelry-industry context. Why an AD must design for continuous upskilling, not static craft.",
    learned:
      "That skill half-life is short. My contribution was bridging global ILO/OECD data to a Vietnamese entry-level reality — showing why generic ‘learn to code’ advice fails without situated pathways.",
    applied:
      "Linked macro youth-unemployment data to specific reskilling levers relevant locally (modular credentialing, on-the-job tool apprenticeship). That framing now shapes my own upskilling plan — quarterly, small, and tied to a deliverable (see Timeline → Next 12 months).",
    future:
      "I will budget 10% of every project for learning — one new controlled Lighting/colour-management competency per quarter — so the portfolio compounds rather than repeats.",
  },
  "busm4561-sgsg03-team06-asm2-1.docx": {
    file: "busm4561-sgsg03-team06-asm2-1.docx",
    desc: "Digital consumer behaviour → personas, journey mapping and omnichannel strategy for personalization and conversion. How an AD keeps a campaign coherent across touchpoints instead of producing one hero image that dies on feed crop.",
    learned:
      "To design from journey evidence, not demographics alone. I learned to build personas around jobs-to-be-done and map where visual consistency earns trust — and where platform-specific variation is required.",
    applied:
      "Built journey-aware formats (hero + feed crop + detail texture) from persona data rather than generic best practice. That is how I now art-direct deliverable packs: one system, natively cropped, with hierarchy preserved.",
    future:
      "Every AD pack will ship with a touchpoint matrix: format, safe area, hierarchy and copy relationship — so the image system survives real placement, not just portfolio artboard.",
  },
  "assessment-2-narrative-of-eportfolio-cv-valuation-and-recruitment-process.pdf": {
    file: "assessment-2-narrative-of-eportfolio-cv-valuation-and-recruitment-process.pdf",
    desc: "Narrative CV valuation and recruitment process — plus logistics/supply-chain optimization thinking — applied to how a portfolio and its delivery chain create value.",
    learned:
      "That a CV and its delivery are a supply chain: sourcing (evidence), warehousing (portfolio IA), transport (file naming, delivery, versioning) and tracking (feedback loops). Value leaks at every handoff if not designed.",
    applied:
      "Applied process-optimization to my own portfolio logistics: consistent file naming, deliverable checklist, and a tracked feedback loop with reviewers — reducing rework and missed attachments before assessment.",
    future:
      "Studio operations will run on that same optimization mindset: standardized ingest → select → grade → export → deliver pipeline with named owners and time boxes, so creative energy is reserved for direction, not file hunting.",
  },
  "self-reflection.docx": {
    file: "self-reflection.docx",
    desc: "Structured self-reflection using What → So what → Now what on the BUSM2565 business environment project — what I contributed, where my analysis was strong or thin, and how peer feedback redirected the work. Model for the AD retro.",
    learned:
      "To separate self-judgment from evidence. My contribution was strongest in linking outside-in frameworks to a visual argument (Gucci scarcity), thinnest where recommendations floated without cost or operational ownership.",
    applied:
      "Wrote the reflection against the actual peer matrix and marker comments, not memory — naming one decision to keep and one to change. That evidence-first review is now my post-shoot retro template.",
    future:
      "Every Art Direction engagement will close with a one-page retro in this form — What happened, So what did the market/audience signal mean, Now what will I adjust in the system — published as part of the case study.",
  },
};
