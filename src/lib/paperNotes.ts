export type PaperNote = {
  file: string;
  desc: string;
  learned: string;
  applied: string;
  future: string;
};

export const PAPER_LABELS = {
  learned: "What I learned",
  applied: "Practical application in the assignment",
  future: "Future application",
} as const;

/* keyed by the `file` value in projects.json */
export const PAPER_NOTES: Record<string, PaperNote> = {
  "busm4769-asm1.docx": {
    file: "busm4769-asm1.docx",
    desc: "This study evaluates the implementation of AI-driven recruitment technology (specifically Interviewer.AI) at AIA Vietnam. It balances the clear operational advantages—such as time and cost optimization—against significant ethical risks, including algorithmic bias and a lack of process transparency. To mitigate these issues, the paper outlines a robust governance framework centered on a human-in-the-loop oversight mechanism.",
    learned:
      "The dual nature of recruitment AI—while it drives efficiency, it carries inherent risks regarding algorithmic bias and systemic opacity.",
    applied:
      "Exercising critical thinking allowed for a thorough audit of AI outputs, an analysis of ethical implications, and the design of a human-supervised control framework.",
    future:
      "When implementing HR technologies down the line, establishing transparent governance protocols and conducting regular data audits will be essential to ensure complete fairness.",
  },
  "asm-2-er.docx": {
    file: "asm-2-er.docx",
    desc: "This paper explores the collective enterprise bargaining process at Telstra within the framework of the Australian industrial relations system. It addresses the delicate balance between corporate demands for cost efficiency and the union's (CWU) mission to protect worker rights and working conditions. Ultimately, the study highlights the value of integrative bargaining strategies in reaching mutually beneficial outcomes.",
    learned:
      "The core mechanics of collective bargaining under Australian labor law and the critical role unions play in advocating for workers.",
    applied:
      "Utilizing integrative bargaining principles helped formulate win-win solutions that align the strategic interests of Telstra management with the CWU union.",
    future:
      "Drawing on collaborative negotiation techniques and open communication will serve as a strong foundation for resolving labor disputes and fostering a positive workplace culture.",
  },
  "asm-3-er.docx": {
    file: "asm-3-er.docx",
    desc: "This research examines employment relations at Commonwealth Bank of Australia (CBA) within its heavily regulated financial sector environment. The analysis covers key areas such as compensation structures, Diversity, Equity, and Inclusion (DEI) initiatives, and workplace friction stemming from remote-work policies. It provides conflict management strategies designed to maintain legal compliance while boosting employee engagement.",
    learned:
      "The critical importance of labor law compliance, statutory minimum standards, and robust DEI frameworks in the banking sector.",
    applied:
      "Analyzing CBA's employment landscape enabled the development of targeted dispute-resolution strategies around remote work to ensure full legal compliance.",
    future:
      "The intention is to stay current with evolving employment legislation and establish rigorous internal audit processes to minimize legal risks for organizations.",
  },
  "asm-1.docx": {
    file: "asm-1.docx",
    desc: "This qualitative study investigates how digital tools impact day-to-day operations across Vietnamese workplaces. Based on in-depth interviews with employees at major companies (including Vinamilk, VUS, VEAM, Uniqlo, and SunHouse), the report details how technology drives productivity while introducing adaptation stress. The findings present a nuanced look at digital transformation on an individual level.",
    learned:
      "Qualitative research methodology using in-depth interviews to measure technology's impact on employee productivity and workplace engagement.",
    applied:
      "Synthesizing field data from workers across five major enterprises allowed for clear mapping of both the benefits and friction points of workplace digital transformation.",
    future:
      "Championing the integration of automation tools in daily operations will help streamline processes, cut redundant manual tasks, and optimize workflow efficiency.",
  },
  "people-analytics-asm-2-1.docx": {
    file: "people-analytics-asm-2-1.docx",
    desc: "This case study explores corporate governance frameworks and ethical decision-making when navigating conflicts of interest. It emphasizes the importance of transparency, accountability, and Corporate Social Responsibility (CSR) in protecting long-term enterprise value. The paper outlines recommendations for establishing robust ethical codes and internal controls.",
    learned:
      "The foundational role that strong governance, transparency, and Corporate Social Responsibility (CSR) play in sustainable business growth.",
    applied:
      "Analyzing real-world conflict-of-interest scenarios provided the necessary context to design ethical guidelines aimed at safeguarding multi-stakeholder interests.",
    future:
      "Embedding ethical standards and operational transparency will stand at the core of all future management decisions and business leadership practices.",
  },
  "as3-sgs-tut01-team-4-1.docx": {
    file: "as3-sgs-tut01-team-4-1.docx",
    desc: "This project focuses on leveraging qualitative HR analytics to examine 27 real Glassdoor reviews from L'Oréal Vietnam. By combining the IMPACT framework with Val Generative AI, the study measures employee sentiment and pinpoints operational bottlenecks, particularly around career advancement barriers and leadership dynamics. Building on these findings, it proposes a targeted Qualtrics survey to gather deeper, actionable workplace insights.",
    learned:
      "How to apply the IMPACT framework alongside Val Generative AI to effectively process qualitative data and analyze employee sentiment from real-world feedback.",
    applied:
      "Applying thematic and sentiment analysis to the Glassdoor reviews made it possible to identify key organizational challenges and design a follow-up survey strategy.",
    future:
      "Moving forward, my goal is to leverage data-driven People Analytics and employee listening tools to proactively surface management issues and enhance the overall employee experience.",
  },
  "busm2565-assessment-report.docx": {
    file: "busm2565-assessment-report.docx",
    desc: "This document logs and evaluates individual contributions for the BUSM2565 group project. It outlines task delegation, milestone tracking, and peer evaluations based on pre-agreed performance criteria. The report reflects a commitment to fairness, open communication, and individual accountability in a collaborative team environment.",
    learned:
      "The value of transparency, equity, and personal accountability when evaluating peer performance in group dynamics.",
    applied:
      "Facilitating open, objective discussions across the team made it possible to review each member's deliverables before finalizing a fair peer-assessment matrix.",
    future:
      "Maintaining clear performance metrics and transparent evaluation processes will remain a priority in future team management roles to drive accountability and collaboration.",
  },
  "busm2565-sg-g10-team-02-business-environment-report.pdf": {
    file: "busm2565-sg-g10-team-02-business-environment-report.pdf",
    desc: "This report delivers a comprehensive business environment assessment for the luxury fashion house Gucci. Utilizing strategic frameworks such as PESTLE, SWOT, and supply-and-demand analysis, the paper evaluates how macro-level shifts—such as changing Millennial consumer behavior, counterfeit markets, and PR crises—impact top-line revenue. Strategic recommendations are then offered to protect brand equity.",
    learned:
      "How to evaluate a global luxury brand's operating environment using PESTLE, SWOT, and foundational supply-and-demand dynamics.",
    applied:
      "Deploying economic models served to quantify the commercial impact of counterfeit goods, media crises, and evolving youth consumer preferences on Gucci's bottom line.",
    future:
      "Employing comprehensive analytical frameworks will be key to evaluating both micro and macro factors prior to making strategic business or marketing decisions.",
  },
  "case-study-analysis-ube-asm-3.docx": {
    file: "case-study-analysis-ube-asm-3.docx",
    desc: "This strategic analysis examines the competitive positioning and market leadership of Vinamilk, Vietnam's premier dairy producer. Using value chain analysis, financial matrix evaluations, and industry structure models, the paper highlights the company's core capabilities. It concludes with actionable growth strategies for international expansion and sustained market dominance.",
    learned:
      "How to analyze competitive positioning, value chains, and sustainable market leadership strategies within the FMCG sector.",
    applied:
      "Merging financial matrix evaluations, industry analysis, and core competency mapping resulted in concrete market expansion strategies for Vinamilk.",
    future:
      "Applying strategic management thinking will help sharpen future approaches to resource allocation, budgeting, and long-term business planning.",
  },
  "busm4561-asm1.docx": {
    file: "busm4561-asm1.docx",
    desc: "This paper explores the changing global labor landscape driven by automation, post-pandemic realities, and economic shifts. Drawing on data from the ILO and OECD, it highlights the growing challenges facing young workers, particularly youth unemployment and skill gaps. The study stresses the urgent need for continuous upskilling and re-skilling programs.",
    learned:
      "A broad perspective on how technology, pandemic disruptions, and economic volatility are reshaping global labor markets and youth employment.",
    applied:
      "Connecting global ILO and OECD data to Vietnam's local context and personal experience in the jewelry industry underscored the critical need for continuous skill development.",
    future:
      "Cultivating a lifelong learning mindset and proactively acquiring emerging technological skills will ensure adaptability amidst changing industry demands.",
  },
  "busm4561-sgsg03-team06-asm2-1.docx": {
    file: "busm4561-sgsg03-team06-asm2-1.docx",
    desc: "This report investigates evolving consumer behavior across digital touchpoints and details how brands can adapt effectively. It maps out target buyer personas, designs customer journey flows, and outlines an integrated omnichannel marketing strategy. The research emphasizes data-driven decision-making to deliver personalized messaging and maximize conversion rates.",
    learned:
      "How digital consumer behaviors shift and how to build data-informed, omnichannel marketing strategies.",
    applied:
      "Developing detailed target buyer profiles made it possible to map user journeys tailored specifically for digital marketing channels and conversion funnel optimization.",
    future:
      "Adopting data-driven marketing techniques will be crucial for refining campaign targeting, improving user engagement, and driving higher overall conversions.",
  },
  "assessment-2-narrative-of-eportfolio-cv-valuation-and-recruitment-process.pdf": {
    file: "assessment-2-narrative-of-eportfolio-cv-valuation-and-recruitment-process.pdf",
    desc: "This paper addresses logistics optimization and supply chain management efficiency for modern enterprises. It analyzes operational bottlenecks in transportation and warehousing, advocating for integrated IT solutions to improve real-time tracking. The primary objective is to streamline resource usage, lower operational overhead, and reduce delivery lead times.",
    learned:
      "The strategic value of supply chain optimization, smart inventory management, and logistics technology in driving cost savings.",
    applied:
      "Evaluating operational risks alongside quantitative modeling enabled the formulation of concrete solutions for warehouse management and faster delivery cycles.",
    future:
      "Bringing process-optimization thinking into daily resource and operations management will maximize cost efficiency across future projects.",
  },
};
