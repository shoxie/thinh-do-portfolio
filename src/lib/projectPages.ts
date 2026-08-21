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
      eyebrow: "Research · Employment Relations — AD lens",
      h2: "Work, <em>fairness</em><br>& the set.",
      lede: [
        "Essays on how fairness is negotiated between employers and employees — bargaining structures, DEI, remote-work and conflict. For an Art Director this is the production team: how to make a set fair, legible and collaborative under time and fee pressure.",
        "Each paper opens with a What → So what → Now what analysis for AD: the control or agreement I would put in place on my next production.",
      ],
      framesH2: "",
      docsH2: "Papers & <em>analysis for AD</em>",
      cta: "View the analysis",
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
      eyebrow: "Nghiên cứu · Quan hệ lao động — lăng kính AD",
      h2: "Công việc, <em>công bằng</em><br>& phim trường.",
      lede: [
        "Các bài luận về cách sự công bằng được thương lượng giữa người sử dụng lao động và người lao động — cấu trúc thương lượng, DEI, làm việc từ xa và xung đột. Với Art Director, đó là ê-kíp sản xuất: làm sao để set công bằng, rõ ràng và hợp tác dưới áp lực thời gian và chi phí.",
        "Mỗi paper mở ra với phân tích What → So what → Now what cho AD: cơ chế kiểm soát hay thoả thuận tôi sẽ đặt cho sản xuất tiếp theo.",
      ],
      framesH2: "",
      docsH2: "Bài viết & <em>phân tích cho AD</em>",
      cta: "Xem phân tích",
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
      eyebrow: "Research · People Analytics — AD lens",
      h2: "People,<br><em>listened to.</em>",
      lede: [
        "Qualitative analytics on how teams actually feel: Glassdoor sentiment with IMPACT + Val AI, governance cases and technology adoption interviews. For an Art Director, this is crew and talent direction — sensing blockers before they become burn-out.",
        "Each file includes a coded What → So what → Now what so a reader can audit method, not just conclusion.",
      ],
      framesH2: "",
      docsH2: "Papers & <em>analysis for AD</em>",
      cta: "View the analysis",
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
      eyebrow: "Nghiên cứu · People Analytics — lăng kính AD",
      h2: "Con người,<br><em>được lắng nghe.</em>",
      lede: [
        "Phân tích định tính về cảm nhận thực của đội ngũ: sentiment Glassdoor bằng IMPACT + Val AI, các case quản trị và phỏng vấn về chuyển đổi công nghệ. Với Art Director, đó là nghệ thuật chỉ đạo con người — cảm nhận tắc nghẽn trước khi thành kiệt sức.",
        "Mỗi file kèm phân tích What → So what → Now what để người đọc kiểm được phương pháp, không chỉ kết luận.",
      ],
      framesH2: "",
      docsH2: "Bài viết & <em>phân tích cho AD</em>",
      cta: "Xem phân tích",
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
      eyebrow: "Research · Business Environment — AD lens",
      h2: "The world <em>outside</em><br>the frame.",
      lede: [
        "Gucci and Vinamilk analysed with PESTLE, SWOT, value chain and demand dynamics — why a business rarely decides in a vacuum. An Art Director needs that outside-in literacy to protect brand equity while pushing a visual idea.",
        "Each paper traces framework → insight → recommendation, with a reflection on where my analysis was strong or thin.",
      ],
      framesH2: "",
      docsH2: "Papers & <em>analysis for AD</em>",
      cta: "View the analysis",
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
      eyebrow: "Nghiên cứu · Môi trường kinh doanh — lăng kính AD",
      h2: "Thế giới <em>bên ngoài</em><br>khung hình.",
      lede: [
        "Gucci và Vinamilk được phân tích bằng PESTLE, SWOT, chuỗi giá trị và động lực cầu — vì sao doanh nghiệp hiếm khi quyết định trong chân không. Art Director cần năng lực đọc từ ngoài vào để bảo vệ brand equity khi đẩy một ý tưởng thị giác.",
        "Mỗi bài truy vết framework → insight → khuyến nghị, kèm phản tư về điểm mạnh và điểm mỏng trong phân tích của tôi.",
      ],
      framesH2: "",
      docsH2: "Bài viết & <em>phân tích cho AD</em>",
      cta: "Xem phân tích",
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
      eyebrow: "Research · Global Society — AD lens",
      h2: "Working in a<br><em>globalised</em> studio.",
      lede: [
        "ILO/OECD labour shifts, CV valuation and recruitment — what it means to be hireable across borders. For an aspiring Art Director, this is positioning: lifelong learning, portfolio logistics and narrative that travels.",
        "Includes my self-reflection artefact (What → So what → Now what) modelling how I retro a project before the next one.",
      ],
      framesH2: "",
      docsH2: "Papers & <em>analysis for AD</em>",
      cta: "View the analysis",
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
      eyebrow: "Nghiên cứu · Xã hội toàn cầu — lăng kính AD",
      h2: "Làm việc trong studio<br><em>toàn cầu hoá</em>.",
      lede: [
        "Dịch chuyển lao động ILO/OECD, định giá CV và tuyển dụng — ý nghĩa của việc có thể được thuê xuyên biên giới. Với Art Director tương lai, đó là định vị: học suốt đời, logistics của portfolio và câu chuyện có thể đi xa.",
        "Gồm artefact self-reflection (What → So what → Now what) mẫu cho cách tôi retro một dự án trước khi bước sang dự án tiếp theo.",
      ],
      framesH2: "",
      docsH2: "Bài viết & <em>phân tích cho AD</em>",
      cta: "Xem phân tích",
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
  const title = `${p?.name ?? slug} — Thinh Do · Do Duy Thinh`;
  const ogImage = {
    url: "/assets/hero/hero-bg.png",
    width: 1254,
    height: 1254,
    alt: p ? `${p.name} — Thinh Do` : "Thinh Do — portfolio",
  };
  return {
    title: { absolute: title },
    description: p?.description,
    openGraph: p
      ? {
          title,
          description: p.description,
          url: `/projects/${slug}`,
          siteName: "Do Duy Thinh",
          type: "article",
          locale: "en_US",
          images: [ogImage],
        }
      : undefined,
    twitter: p
      ? {
          card: "summary_large_image",
          title,
          description: p.description,
          images: [ogImage.url],
        }
      : undefined,
  };
};
