import type { Metadata } from "next";
import projectsRaw from "./projects.json";

export type ProjectPhoto = {
  slug: string;
  title: string;
  w: number;
  h: number;
  ratio: number;
  lqip: string;
  grid: string;
  full: string;
};

export type ProjectDoc = {
  name: string;
  file: string;
  ext: string;
  size: number;
};

export type Project = {
  slug: string;
  name: string;
  type: "photography" | "research";
  description: string;
  cover: string;
  photos: ProjectPhoto[];
  documents: ProjectDoc[];
  page?: string;
};

export const PROJECTS = projectsRaw as Project[];

export const SUB_NAV = [
  { href: "/#projects", key: "nav.projects" },
  { href: "/#contact", key: "nav.contact" },
] as const;

export const fmtSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

/* ── per-project page copy ── */

export type LangCopy = {
  eyebrow: string;
  h2: string;
  lede: string[];
  framesH2: string;
  docsH2: string;
  cta: string;
  shotOn?: string;
  metaFrames: string;
  metaPapers: string;
  metaSize: string;
  metaFormats: string;
  open: string;
  download: string;
  next: string;
  back: string;
};

export type ProjectPageCopy = {
  en: LangCopy;
  vi: LangCopy;
};

export const PROJECT_COPY: Record<string, ProjectPageCopy> = {
  "taos-project": {
    en: {
      eyebrow: "Photography essay",
      h2: "Twelve frames,<br><em>one walk.</em>",
      lede: [
        "A twelve-frame photography essay — on-location portraits and scenes, shot wide and cinematic with a Fujifilm XT5. No studio, no staging plan; just the light as it happened and whatever the walk gave us.",
        "Every frame below opens full size — the same way they came out of the camera, graded to one consistent mood.",
      ],
      framesH2: "The <em>frames</em>",
      docsH2: "",
      cta: "View the frames",
      shotOn: "Fujifilm XT5 · Cinematic",
      metaFrames: "Frames",
      metaPapers: "Papers",
      metaSize: "Total size",
      metaFormats: "Formats",
      open: "open full size",
      download: "Download",
      next: "Next project",
      back: "Back to the portfolio",
    },
    vi: {
      eyebrow: "Bài luận nhiếp ảnh",
      h2: "Mười hai khung hình,<br><em>một chuyến đi.</em>",
      lede: [
        "Một bài luận nhiếp ảnh mười hai khung hình — chân dung và cảnh chụp tại hiện trường, rộng và điện ảnh bằng Fujifilm XT5. Không studio, không kịch bản dàn dựng; chỉ có ánh sáng đúng lúc nó xảy ra và những gì chuyến đi trao lại.",
        "Mỗi khung hình dưới đây mở ở kích thước đầy đủ — y như lúc ra khỏi máy, được cân màu theo một tâm trạng nhất quán.",
      ],
      framesH2: "Những <em>khung hình</em>",
      docsH2: "",
      cta: "Xem khung hình",
      shotOn: "Fujifilm XT5 · Cinematic",
      metaFrames: "Khung hình",
      metaPapers: "Số bài",
      metaSize: "Dung lượng",
      metaFormats: "Định dạng",
      open: "mở ảnh cỡ đầy đủ",
      download: "Tải xuống",
      next: "Dự án tiếp theo",
      back: "Quay lại portfolio",
    },
  },
  "employment-relations": {
    en: {
      eyebrow: "Research · Employment Relations",
      h2: "Work, <em>fairness</em><br>& the firm.",
      lede: [
        "Essays and analyses on employment relationships — how fairness is negotiated between employers and employees, and how contemporary HRM debates shape the modern workplace.",
      ],
      framesH2: "",
      docsH2: "Papers & <em>files</em>",
      cta: "View the papers",
      metaFrames: "Frames",
      metaPapers: "Papers",
      metaSize: "Total size",
      metaFormats: "Formats",
      open: "",
      download: "Download",
      next: "Next project",
      back: "Back to the portfolio",
    },
    vi: {
      eyebrow: "Nghiên cứu · Quan hệ lao động",
      h2: "Công việc, <em>công bằng</em><br>& doanh nghiệp.",
      lede: [
        "Các bài luận và phân tích về quan hệ lao động — cách sự công bằng được thương lượng giữa người sử dụng lao động và người lao động, và cách các tranh luận HRM đương đại định hình nơi làm việc hiện đại.",
      ],
      framesH2: "",
      docsH2: "Bài viết & <em>tài liệu</em>",
      cta: "Xem các bài viết",
      metaFrames: "Khung hình",
      metaPapers: "Số bài",
      metaSize: "Dung lượng",
      metaFormats: "Định dạng",
      open: "",
      download: "Tải xuống",
      next: "Dự án tiếp theo",
      back: "Quay lại portfolio",
    },
  },
  "people-analytics": {
    en: {
      eyebrow: "Research · People Analytics",
      h2: "People,<br><em>measured.</em>",
      lede: [
        "Team analytics reports and assessments that turn workforce metrics into answers for real HR questions — from workload and retention to team performance.",
      ],
      framesH2: "",
      docsH2: "Papers & <em>files</em>",
      cta: "View the papers",
      metaFrames: "Frames",
      metaPapers: "Papers",
      metaSize: "Total size",
      metaFormats: "Formats",
      open: "",
      download: "Download",
      next: "Next project",
      back: "Back to the portfolio",
    },
    vi: {
      eyebrow: "Nghiên cứu · People Analytics",
      h2: "Con người,<br><em>được đo lường.</em>",
      lede: [
        "Các báo cáo và đánh giá phân tích đội nhóm biến các chỉ số nhân lực thành câu trả lời cho những câu hỏi HR thực tế — từ khối lượng công việc, giữ chân nhân viên đến hiệu suất đội nhóm.",
      ],
      framesH2: "",
      docsH2: "Bài viết & <em>tài liệu</em>",
      cta: "Xem các bài viết",
      metaFrames: "Khung hình",
      metaPapers: "Số bài",
      metaSize: "Dung lượng",
      metaFormats: "Định dạng",
      open: "",
      download: "Tải xuống",
      next: "Dự án tiếp theo",
      back: "Quay lại portfolio",
    },
  },
  "understanding-the-business-environment": {
    en: {
      eyebrow: "Research · Business Environment",
      h2: "The world <em>outside</em><br>the firm.",
      lede: [
        "Case study analyses of how economic, political and social forces push and pull on business decisions — and why firms rarely decide anything in a vacuum.",
      ],
      framesH2: "",
      docsH2: "Papers & <em>files</em>",
      cta: "View the papers",
      metaFrames: "Frames",
      metaPapers: "Papers",
      metaSize: "Total size",
      metaFormats: "Formats",
      open: "",
      download: "Download",
      next: "Next project",
      back: "Back to the portfolio",
    },
    vi: {
      eyebrow: "Nghiên cứu · Môi trường kinh doanh",
      h2: "Thế giới <em>bên ngoài</em><br>doanh nghiệp.",
      lede: [
        "Phân tích tình huống về cách các lực lượng kinh tế, chính trị và xã hội tác động đến quyết định của doanh nghiệp — và vì sao doanh nghiệp hiếm khi quyết định gì trong chân không.",
      ],
      framesH2: "",
      docsH2: "Bài viết & <em>tài liệu</em>",
      cta: "Xem các bài viết",
      metaFrames: "Khung hình",
      metaPapers: "Số bài",
      metaSize: "Dung lượng",
      metaFormats: "Định dạng",
      open: "",
      download: "Tải xuống",
      next: "Dự án tiếp theo",
      back: "Quay lại portfolio",
    },
  },
  "work-in-global-society": {
    en: {
      eyebrow: "Research · Global Society",
      h2: "Working in a<br><em>globalised</em> world.",
      lede: [
        "Reflections on what it means to work across borders — CV valuation, recruitment processes, and a narrative ePortfolio that ties the story together.",
      ],
      framesH2: "",
      docsH2: "Papers & <em>files</em>",
      cta: "View the papers",
      metaFrames: "Frames",
      metaPapers: "Papers",
      metaSize: "Total size",
      metaFormats: "Formats",
      open: "",
      download: "Download",
      next: "Next project",
      back: "Back to the portfolio",
    },
    vi: {
      eyebrow: "Nghiên cứu · Xã hội toàn cầu",
      h2: "Làm việc trong thế giới<br><em>toàn cầu hoá</em>.",
      lede: [
        "Những suy ngẫm về việc làm việc xuyên biên giới — định giá CV, quy trình tuyển dụng và một ePortfolio tự sự kết nối câu chuyện.",
      ],
      framesH2: "",
      docsH2: "Bài viết & <em>tài liệu</em>",
      cta: "Xem các bài viết",
      metaFrames: "Khung hình",
      metaPapers: "Số bài",
      metaSize: "Dung lượng",
      metaFormats: "Định dạng",
      open: "",
      download: "Tải xuống",
      next: "Dự án tiếp theo",
      back: "Quay lại portfolio",
    },
  },
};

export const nextProjectSlug = (slug: string) => {
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  if (idx < 0) return null;
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  return next.slug === slug ? null : next.slug;
};

export const projectMetadata = (slug: string): Metadata => {
  const p = PROJECTS.find((x) => x.slug === slug);
  return {
    title: `${p?.name ?? slug} — Thinh Do · Do Duy Thinh`,
    description: p?.description,
  };
};
