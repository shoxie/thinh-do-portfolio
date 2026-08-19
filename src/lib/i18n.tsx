"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Lang = "en" | "vi";

type Dict = Record<string, string>;

const en: Dict = {
  "html.lang": "en",
  "meta.title": "Thinh Do — Do Duy Thinh · Photographer",
  "meta.desc":
    "Thinh Do (Do Duy Thinh) — photographer. Cinematic portrait photography from Vietnam.",

  "nav.about": "About",
  "nav.craft": "Craft",
  "nav.projects": "Projects",
  "nav.contact": "Contact",

  "hero.role1": "Photographer",
  "hero.role2": "Visual Storyteller",
  "hero.lede":
    "I chase light for a living and frame it for the love of it. Portraits by day, golden hour by night.",
  "hero.cta1": "View the projects",
  "hero.cta2": "About me",
  "hero.basedIn": "Based in",
  "hero.basedInVal": "Vietnam",
  "hero.shotOn": "Shot on",
  "hero.scroll": "Scroll",

  "about.num": "01 — About",
  "about.caption": "On location, chasing the last light.",
  "about.h2": "One camera,<br><em>one obsession</em> — looking<br>closely at light.",
  "about.body":
    "<p>I'm <strong>Thinh Do</strong>, better known online as <strong>Do Duy Thinh</strong>. " +
    "Photography is how I look at the world: I spend my days chasing light, reading faces, " +
    "and finding frames where other people only see a crowd.</p>" +
    "<p>Portraits are the main stage. Every shoot turns out to be the same ritual — " +
    "you point your attention somewhere most people don't look, you stay patient, and you wait " +
    "for the one frame where everything lines up. A perfect backlit portrait and a perfect " +
    "candid have the exact same feeling.</p>" +
    "<p>Most of what you'll see here is <strong>portraits, fashion, food and product work</strong>. " +
    "I shoot wide and cinematic with a Fujifilm XT5, " +
    "because I like the world better when it's framed cleanly.</p>",

  "stats.projects": "Projects",
  "stats.photos": "Photographs",
  "stats.papers": "Research papers",
  "stats.ratio": "Aspect ratio",
  "stats.golden": "Golden hours",

  "craft.num": "02 — Craft",
  "craft.h2": "What I actually do",
  "craft.tag1": "the craft",
  "craft.card1": "Photography",
  "craft.note1":
    "Every shoot is a hunt for light — the same patience, the same timing, the same one frame where everything lines up.",
  "craft.tag2": "the portfolio",
  "craft.card2": "What I shoot",
  "craft.l1": "Portrait & editorial work",
  "craft.l2": "Fashion & studio shoots",
  "craft.l3": "Food & product photography",
  "craft.l4": "Natural light & backlit work",
  "craft.l5": "Cinematic framing",
  "craft.note2":
    "I shoot fast and light. The best frame is usually the one right after somebody stops posing.",
  "craft.tag3": "how it goes",
  "craft.card3": "On set",
  "craft.note3":
    "Behind the scenes — public parks, no permits, a lot of walking, and whatever light the sky decides to give us.",

  "gal.num": "03 — Projects",
  "gal.h2": "Selected projects",
  "gal.intro":
    "Six projects — two photography essays and four research papers. Click any project to explore its frames or read its papers.",
  "gal.empty": "No projects in this set yet.",
  "chip.all": "All",
  "chip.photography": "Photography",
  "chip.research": "Research",
  "projects.type.photography": "Photography",
  "projects.type.research": "Research",
  "projects.frames": "frames",
  "projects.papers": "papers",
  "projects.open": "View project",
  "projects.documents": "Documents",

  "contact.num": "04 — Contact",
  "contact.h2": "Got a shoot,<br>a new idea,<br><em>or just want to talk?</em>",

  "footer.copy": "All photographs shot & owned by Thinh Do.",
  "footer.top": "Back to top",

  "sound.play": "Play music",
  "sound.playing": "Now playing",
  "sound.off": "Music off",
  "sound.none": "No track",
  "gal.loadFail": "Could not load the gallery — serve this folder over http:// rather than opening the file directly.",
  "lb.open": "open full size",
};

const vi: Dict = {
  "html.lang": "vi",
  "meta.title": "Thinh Do — Do Duy Thinh · Nhiếp ảnh",
  "meta.desc":
    "Thinh Do (Do Duy Thinh) — nhiếp ảnh gia. Ảnh chân dung điện ảnh từ Việt Nam.",

  "nav.about": "Giới thiệu",
  "nav.craft": "Công việc",
  "nav.projects": "Dự án",
  "nav.contact": "Liên hệ",

  "hero.role1": "Nhiếp ảnh",
  "hero.role2": "Kể chuyện bằng hình",
  "hero.lede":
    "Tôi săn ánh sáng để kiếm sống và đóng khung nó vì đam mê. Chân dung ban ngày, giờ vàng ban chiều.",
  "hero.cta1": "Xem dự án",
  "hero.cta2": "Về tôi",
  "hero.basedIn": "Đang ở",
  "hero.basedInVal": "Việt Nam",
  "hero.shotOn": "Chụp bằng",
  "hero.scroll": "Cuộn",

  "about.num": "01 — Giới thiệu",
  "about.caption": "Tại hiện trường, đuổi theo ánh sáng cuối ngày.",
  "about.h2": "Một chiếc máy ảnh,<br><em>một nỗi ám ảnh</em> — nhìn<br>thật kỹ vào ánh sáng.",
  "about.body":
    "<p>Tôi là <strong>Thinh Do</strong>, trên mạng hay được biết đến với tên <strong>Do Duy Thinh</strong>. " +
    "Nhiếp ảnh là cách tôi nhìn thế giới: cả ngày rong ruổi theo ánh sáng, đọc khuôn mặt, " +
    "và tìm những khung hình ở nơi người khác chỉ thấy một đám đông.</p>" +
    "<p>Chân dung là sân khấu chính. Hoá ra mỗi buổi chụp đều là cùng một nghi thức — " +
    "bạn đặt sự chú ý vào nơi ít ai để mắt tới, bạn kiên nhẫn, và bạn chờ đúng một khoảnh khắc " +
    "khi mọi thứ khớp vào nhau. Một bức chân dung ngược sáng hoàn hảo và một khoảnh khắc bất chợt " +
    "hoàn hảo cho cảm giác y hệt nhau.</p>" +
    "<p>Phần lớn những gì bạn thấy ở đây là <strong>chân dung, thời trang, ẩm thực và sản phẩm</strong>. " +
    "Tôi chụp rộng và điện ảnh bằng Fujifilm XT5, " +
    "bởi tôi thấy thế giới đẹp hơn khi được đóng khung gọn gàng.</p>",

  "stats.projects": "Dự án",
  "stats.photos": "Ảnh",
  "stats.papers": "Bài nghiên cứu",
  "stats.ratio": "Tỉ lệ khung hình",
  "stats.golden": "Giờ vàng",

  "craft.num": "02 — Công việc",
  "craft.h2": "Tôi thực sự làm gì",
  "craft.tag1": "nghề chính",
  "craft.card1": "Nhiếp ảnh",
  "craft.note1":
    "Mỗi buổi chụp là một cuộc săn ánh sáng — cùng sự kiên nhẫn ấy, cùng thời khắc ấy, cùng một khung hình nơi mọi thứ khớp vào nhau.",
  "craft.tag2": "danh mục",
  "craft.card2": "Tôi chụp gì",
  "craft.l1": "Chân dung & phóng sự",
  "craft.l2": "Thời trang & studio",
  "craft.l3": "Ẩm thực & sản phẩm",
  "craft.l4": "Ánh sáng tự nhiên & ngược sáng",
  "craft.l5": "Khung hình điện ảnh",
  "craft.note2":
    "Tôi chụp nhanh và gọn. Khung hình đẹp nhất thường là ngay sau khi người ta thôi tạo dáng.",
  "craft.tag3": "diễn ra thế nào",
  "craft.card3": "Hậu trường",
  "craft.note3":
    "Hậu trường — công viên công cộng, không giấy phép, đi bộ rất nhiều, và bất cứ thứ ánh sáng nào bầu trời chịu cho.",

  "gal.num": "03 — Dự án",
  "gal.h2": "Dự án tiêu biểu",
  "gal.intro":
    "Sáu dự án — hai bộ ảnh và bốn bài nghiên cứu. Bấm vào bất kỳ dự án nào để xem ảnh hoặc đọc bài nghiên cứu.",
  "gal.empty": "Chưa có dự án nào trong nhóm này.",
  "chip.all": "Tất cả",
  "chip.photography": "Nhiếp ảnh",
  "chip.research": "Nghiên cứu",
  "projects.type.photography": "Nhiếp ảnh",
  "projects.type.research": "Nghiên cứu",
  "projects.frames": "ảnh",
  "projects.papers": "bài nghiên cứu",
  "projects.open": "Xem dự án",
  "projects.documents": "Tài liệu",

  "contact.num": "04 — Liên hệ",
  "contact.h2": "Cần chụp ảnh,<br>có ý tưởng mới,<br><em>hay chỉ muốn trò chuyện?</em>",

  "footer.copy": "Toàn bộ ảnh do Thinh Do chụp & sở hữu.",
  "footer.top": "Về đầu trang",

  "sound.play": "Phát nhạc",
  "sound.playing": "Đang phát",
  "sound.off": "Đã tắt nhạc",
  "sound.none": "Chưa có nhạc",
  "gal.loadFail":
    "Không tải được thư viện ảnh — hãy chạy thư mục này qua http:// thay vì mở file trực tiếp.",
  "lb.open": "mở ảnh cỡ đầy đủ",
};

const DICTS: Record<Lang, Dict> = { en, vi };

const LANG_KEY = "gs123.lang";

/* ── tiny external store for the language, so the initial locale can be
   detected client-side without a hydration mismatch ── */
let lang: Lang = "en";
let detected = false;
const listeners = new Set<() => void>();

function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "en" || saved === "vi") return saved;
  } catch {
    /* storage unavailable */
  }
  if (typeof navigator !== "undefined") {
    const langs = navigator.languages ?? [navigator.language ?? "en"];
    if (langs.some((l) => String(l).toLowerCase().startsWith("vi")))
      return "vi";
  }
  return "en";
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot(): Lang {
  if (typeof window !== "undefined" && !detected) {
    detected = true;
    lang = detectLang();
  }
  return lang;
}

function getServerSnapshot(): Lang {
  return "en";
}

function setLangStore(next: Lang) {
  if (next === lang) return;
  lang = next;
  try {
    localStorage.setItem(LANG_KEY, next);
  } catch {
    /* storage unavailable */
  }
  listeners.forEach((cb) => cb());
}

type I18nValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nValue>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export function I18nProvider({
  children,
  title,
  desc,
}: {
  children: ReactNode;
  title?: Record<Lang, string>;
  desc?: Record<Lang, string>;
}) {
  const langValue = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    const dict = DICTS[langValue];
    document.documentElement.lang = dict["html.lang"] ?? langValue;
    document.title = title?.[langValue] ?? dict["meta.title"];
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", desc?.[langValue] ?? dict["meta.desc"]);
  }, [langValue, title, desc]);

  const setLang = useCallback((l: Lang) => setLangStore(l), []);

  const t = useCallback(
    (key: string) => DICTS[langValue][key] ?? DICTS.en[key] ?? key,
    [langValue],
  );

  return (
    <I18nContext.Provider value={{ lang: langValue, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
