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
  "meta.title": "Thinh Do — Do Duy Thinh · Art Director",
  "meta.desc":
    "Thinh Do (Do Duy Thinh) — Art Director & Photographer from Vietnam. Concept to final frame: fashion, portrait, product and food campaigns.",

  "nav.about": "About",
  "nav.narrative": "Story",
  "nav.craft": "Capabilities",
  "nav.timeline": "Journey",
  "nav.projects": "Projects",
  "nav.contact": "Contact",

  "hero.role1": "Art Director",
  "hero.role2": "Photographer",
  "hero.lede":
    "Art Director and photographer based in Vietnam. I direct visual systems from concept and casting to light and final grade — so campaigns feel coherent whether it is a portrait, a fashion spread or a product still life.",
  "hero.cta1": "View the projects",
  "hero.cta2": "About me",
  "hero.basedIn": "Based in",
  "hero.basedInVal": "Vietnam",
  "hero.shotOn": "Shot on",
  "hero.scroll": "Scroll",

  "about.num": "01 — About",
  "about.caption": "On location, directing — not just shooting.",
  "about.h2": "Art direction<br><em>through the lens</em> — from<br>concept to final frame.",
  "about.body":
    "<p>I'm <strong>Thinh Do</strong> — <strong>Do Duy Thinh</strong> online — an <strong>Art Director (Photographer)</strong> training to lead visual campaigns, not just shoot them. Photography is my core craft, but art direction is the frame that holds everything together: concept, casting, styling, light, set and post.</p>" +
    "<p>Most of those decisions are invisible in the final image. A portrait that feels effortless usually took three lighting tests, two wardrobe revisions and a lot of walking in a public park with no permits — which is exactly what the <em>Commercial Campaign</em> and <em>TAOS</em> books document as case studies, not just galleries.</p>" +
    "<p>My work centres on <strong>portrait, fashion, product and food</strong>, shot wide and cinematic on a Fujifilm XT5. I direct lean, location-based shoots and keep the grade consistent across a series so an audience reads it as one visual system, not twelve disconnected frames.</p>" +
    "<p>I study at <strong>RMIT University</strong> (Business) where I pair studio practice with analysis of how businesses, people and labour markets actually work. That mix — <em>business environment, people analytics and employment relations</em> — is what I bring to set: I can read a brief commercially, direct people analytically and keep a production fair and collaborative.</p>",
  "about.direction.k": "Career direction",
  "about.direction.v":
    "Aspiring <strong>Art Director</strong> in commercial photography and visual content — building toward leading small creative teams and end-to-end campaigns (concept → shooting direction → edit) for fashion, lifestyle and hospitality brands in Vietnam and regionally.",
  "about.direction.why": "Why this direction",
  "about.direction.whyV":
    "I like the responsibility that sits between client intent and audience feeling. The AD decides what to keep and what to cut — and that judgment is learned by shooting a lot, studying how brands make money, how teams stay motivated, and how contracts protect creatives. This portfolio curates each project as evidence for that judgment.",
  "about.analytical.k": "How I work analytically",
  "about.analytical.v":
    "For every artefact I map <strong>What → So what → Now what</strong>: what I did and my specific contribution, what it taught me (with framework or evidence), and how I will apply it as an AD. The Skills, Journey and Project pages make that explicit — so an employer can trace capability, not just taste.",

  "narrative.num": "01 — Narrative",
  "narrative.h2": "The curiosity<br><em>that keeps me making</em>",
  "narrative.lede":
    "My story — in my own words. How a quiet curiosity turned into photography, what RMIT taught me through making, and why I am becoming an Art Director.",
  "narrative.mylife.k": "My life",
  "narrative.mylife.p1":
    "I have always been someone who enjoys creating things and finding different ways to express myself. Growing up, I had a stable life, but I was always curious about what else was out there. I wanted to experience more, meet new people, and learn things that were outside of what I already knew. I think that curiosity has always been an important part of who I am.",
  "narrative.mylife.p2":
    "Photography became one of the ways I could explore that curiosity. At first, I was simply interested in taking photos and seeing what I could create. But the more I photographed, the more I realised that I was not just interested in the image itself. I enjoyed the process of finding a feeling, creating an atmosphere, and turning an idea in my head into something I could actually see.",
  "narrative.mylife.p3":
    "For me, photography has become a way of telling stories from my own perspective. Sometimes the story comes from the subject, sometimes from the environment, and sometimes simply from the way I choose to frame something. It has taught me to slow down, observe things differently, and find my own way of seeing the world.",
  "narrative.story.k": "Story — what RMIT taught me",
  "narrative.story.p1":
    "The projects I have worked on at RMIT have helped me understand what kind of creative person I want to become. Portrait photography taught me how to work with people and how small changes in expression, pose, or lighting can completely change the feeling of an image. Fashion projects gave me more freedom to experiment with styling, composition, and mood, and helped me become more confident in developing my own visual ideas.",
  "narrative.story.p2":
    "My product and commercial projects were another important step for me. They made me realise that creating a good image is not only about making something look beautiful. There has to be a reason behind the way the product is presented, the lighting that is used, and even the smallest details in the background. I started paying much more attention to texture, colour, shadows, and realism because I wanted the final image to feel intentional but still believable.",
  "narrative.story.p3":
    "I have also learned a lot from the projects that did not go exactly as planned. Sometimes an idea looked better in my head than it did in the final image, and sometimes I had to completely rethink something after receiving feedback. Instead of seeing this as a failure, I have learned to treat it as part of the process. RMIT has taught me to experiment more, be open to criticism, and not be afraid to change my idea when I find a better direction.",
  "narrative.future.k": "Future Career — Art Director",
  "narrative.future.p1":
    "Through all of these experiences, I have started to understand that I want to go beyond being only a photographer. I enjoy taking photographs, but I am even more interested in the process of coming up with an idea and figuring out how every visual element can work together. This is why I am interested in becoming an Art Director in the future.",
  "narrative.future.p2":
    "I want to work on projects where I can develop the overall visual direction, from the first idea to the final image. I am interested in working with photographers, stylists, designers, models, and other creatives, and bringing different ideas together to create something that feels consistent and meaningful. My experience with photography gives me a starting point because I understand how an image is made, but I want to continue learning about the other parts of the creative process as well.",
  "narrative.future.p3":
    "I do not know exactly where this path will take me yet, and I think that is part of what makes it exciting. What I know is that I want to keep creating, keep experimenting, and keep finding new ways to tell stories through visuals. Everything I have experienced so far, from my first curiosity about photography to the projects I have worked on at RMIT, has helped me move closer to understanding the kind of creative I want to become.",
  "narrative.analytical": "Reflecting on this — portrait taught me people direction, fashion taught me how to build a visual system, product taught me intentional realism and control of texture, colour and light, and learning from feedback gave me an iterative method. That progression is why I am moving from photographer toward Art Director.",

  "stats.projects": "Projects",
  "stats.photos": "Photographs",
  "stats.papers": "Research papers",
  "stats.ratio": "Aspect ratio",
  "stats.golden": "Golden hours",

  "about.facts.education": "Education",
  "about.facts.educationV": "RMIT University — Bachelor of Business",
  "about.facts.work": "Work Experience",
  "about.facts.workV":
    "Freelance Photographer & Visual Content · Art Direction assistance · Post-Production (lighting, grading, retouch)",
  "about.facts.skills": "Core tools",
  "about.facts.skillsV":
    "Fujifilm XT5 · Adobe Photoshop / Lightroom / Illustrator · Capture & Grading · Concept boarding · Studio & location lighting",
  "about.facts.hobbies": "Also",
  "about.facts.hobbiesV": "Tennis · Gym · Gaming · Visual research",
  "about.facts.email": "Professional Email",
  "about.facts.emailV": "duythinh.dave@gmail.com",

  "craft.num": "02 — Capabilities",
  "craft.h2": "What I bring as<br><em>an Art Director</em>",
  "craft.tag1": "concept → direction",
  "craft.card1": "Visual direction",
  "craft.focus": "AD in practice",
  "craft.note1":
    "Analysis before shutter: I translate a brief into a visual system (mood board → palette → set/prop rules → shot logic) so every frame reads as one campaign. Evidence: Commercial Campaign book — four studies, one grading system.",
  "craft.tag2": "craft & system",
  "craft.card2": "Shooting & post system",
  "craft.l1": "Concept boarding & shot logic (Commercial Campaign, TAOS 4-stage arc)",
  "craft.l2": "Location direction & people direction (natural light, backlit, performance)",
  "craft.l3": "Fashion / portrait / product / food — one consistent grade",
  "craft.l4": "Business-aware decisions (Gucci & Vinamilk case analyses)",
  "craft.l5": "Team-aware leadership (People Analytics & Employment Relations)",
  "craft.note2":
    "One pipeline, four genres. The grade, lens choice and negative space are the system — not decoration.",
  "craft.tag3": "evidence map",
  "craft.card3": "How the portfolio proves it",
  "craft.note3":
    "Each project below is mapped to an AD capability: Commercial Campaign = end-to-end direction; TAOS = narrative control; Business Environment = client/commercial literacy; People Analytics = team listening & motivation; Employment Relations = fair production.",
  "craft.evidence": "Evidence",
  "craft.cap1.ev1": "Commercial Campaign book (concept → lighting → edit notes per entry)",
  "craft.cap1.ev2": "TAOS — 4-stage narrative with colour as dramaturgy",
  "craft.cap1.ev3": "Mood board discipline & consistent palette across 30 frames",
  "craft.cap2.ev1": "Fujifilm XT5 system: M, ISO 100, 1/2000, ƒ1.2 — location-first, no studio",
  "craft.cap2.ev2": "Product lighting: controlled highlights without losing glass texture",
  "craft.cap2.ev3": "Food heritage study: warm directional light + negative space",
  "craft.cap3.ev1": "Gucci PESTLE/SWOT → protects brand equity (AD needs this)",
  "craft.cap3.ev2": "L'Oréal Glassdoor IMPACT + Val AI → listening to creative teams",
  "craft.cap3.ev3": "CBA/Telstra ER → fair sets, clear agreements",
  "craft.analytical": "Analytical lens: every claim above is unpacked in the Projects with What/So what/Now what. An employer can audit the thinking, not just the image.",

  "timeline.num": "03 — Journey",
  "timeline.h2": "Education, work<br><em>& how I learn</em>",
  "timeline.intro":
    "Not just what I did — but my contribution, what changed in my thinking, and what I’d do differently next time as an Art Director.",
  "timeline.edu.k": "Education",
  "timeline.edu.title": "RMIT University — Bachelor of Business",
  "timeline.edu.meta": "Business · Analytical core for an AD",
  "timeline.edu.body":
    "<p>Coursework in <strong>Business Environment, People Analytics, Employment Relations and Work in Global Society</strong> gives me the commercial and human lens an Art Director needs: reading a brand’s market, listening to a team’s signal, and structuring fair work.</p>",
  "timeline.edu.b1": "Built fluency in PESTLE, SWOT, value chain and demand analysis — applied in the Gucci and Vinamilk cases. I now brief shoots with the same outside-in logic: what market pressure is the image trying to relieve?",
  "timeline.edu.b2": "Learned qualitative team analytics (IMPACT + Val AI, Glassdoor sentiment, Qualtrics design) in the L’Oréal study. As AD this becomes direction: how to surface blockers on a creative team before they become burn-out.",
  "timeline.edu.b3": "Strong academic standing with reflective practice (self-reflection artefacts) — I audit decisions with What → So what → Now what, not just gut feeling.",
  "timeline.work.k": "Experience",
  "timeline.work.title": "Freelance Photographer → Art Direction (in training)",
  "timeline.work.meta": "Location-based commercial work · End-to-end",
  "timeline.work.body":
    "<p>I direct and shoot small commercial sets (portrait, fashion, product, food) with a Fujifilm XT5 system, owning concept through delivery. That means casting fits, location scouting, lighting design, directing talent, and grading to one look.</p>",
  "timeline.work.b1": "<strong>Contribution:</strong> solo direction on the 30-frame Commercial Campaign (mood board, styling logic, lighting tests, edit system) and the 12-frame TAOS narrative (four stages, colour as dramaturgy). Both are documented as books — art direction, not just out-of-camera files.",
  "timeline.work.b2": "<strong>Learning loop:</strong> Early edits lost skin texture to heavy contrast; glass bottles blew out. I now test with a feedback loop: shoot → grade → print-check → revise light/props before re-shooting. Analytical iteration replaced trial-and-error.",
  "timeline.work.b3": "<strong>Next as AD:</strong> move from solo execution to leading a 3–4 person crew (stylist, MUA, assistant, retoucher) with a one-page visual system and clear call sheet — using ER learnings to keep roles, credit and pay transparent.",
  "timeline.reflect.k": "Reflection (STAR + What/So what/Now what)",
  "timeline.reflect.title": "From shooter to director",
  "timeline.reflect.body":
    "<p><strong>S/T:</strong> I was a strong shooter but a thin director — images looked good individually, not as a campaign.</p><p><strong>A:</strong> I rebuilt my process around systems: Commercial Campaign’s chapter structure, TAOS’s four-stage colour script, and business/people frameworks to read context before I lift the camera.</p><p><strong>R:</strong> Both books now read as one voice. Teacher feedback shifted from “nice images” to a request for deeper analysis — which this portfolio now answers by making the thinking visible.</p><p><strong>Now what:</strong> As Art Director I will pair every future shoot with a one-page analytical brief (objective, audience, market tension, visual rules, team needs) and a post-shoot retro — so taste becomes a repeatable method.</p>",
  "timeline.skills.k": "Graduate capabilities — evidence map",
  "timeline.skills.title": "Skills tied to proof",
  "timeline.skills.intro":
    "Each capability is anchored to an artefact you can audit in Projects.",
  "timeline.skills.s1k": "Critical & analytical thinking",
  "timeline.skills.s1v": "Gucci PESTLE/SWOT & Vinamilk value chain → diagnosed market pressures and built recommendations; visible in commercial lighting/grading choices as intentional, not stylistic drift.",
  "timeline.skills.s2k": "Teamwork & leadership",
  "timeline.skills.s2v": "PESTLE group report peer review & L’Oréal qualitative team analysis (27 Glassdoor reviews, IMPACT) → learned to listen for career-block and leadership signals; maps to directing talent and crew on set.",
  "timeline.skills.s3k": "Digital & visual literacy",
  "timeline.skills.s3v": "Fujifilm XT5 system, consistent grade across 42 frames, A4 book layout — craft as a reproducible system.",
  "timeline.skills.s4k": "Ethical & inclusive practice",
  "timeline.skills.s4v": "AIA AI-recruitment ethics, CBA DEI & Telstra bargaining → informs fair casting, transparent agreements and human-in-the-loop decisions with AI tools on set.",
  "timeline.skills.s5k": "Global & cross-cultural agility",
  "timeline.skills.s5v": "Work in Global Society — ILO/OECD labour lens + Vietnam context; positioning for regional brand work.",
  "timeline.future.k": "Next 12 months",
  "timeline.future.title": "Becoming Art Director",
  "timeline.future.b1": "Lead one assisted campaign with credited team (stylist/MUA/retouch) and an analytical brief + retro — publish as Case 03.",
  "timeline.future.b2": "Short course: advanced colour management + studio flash system to complement location natural-light strength.",
  "timeline.future.b3": "Build an AD contact tier: hospitality + fashion SMEs in HCMC who need system-level visual identity, not one-off shoots.",

  "gal.num": "04 — Projects",
  "gal.h2": "Selected projects <em>as evidence</em>",
  "gal.intro":
    "Six projects curated as an Art Director — two campaign books that show direction and two research clusters that show why the images earn commercial and human sense. Each project page unpacks <em>What → So what → Now what</em>.",
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
  "projects.hint": "Analytical depth inside — each paper opens with What / So what / Now what for Art Direction.",

  "contact.num": "05 — Contact",
  "contact.h2": "Got a shoot,<br>a new idea,<br><em>or just want to talk?</em>",
  "contact.lede": "Currently taking on Art Direction–led shoots (concept → shooting direction → edit). Lean teams, location-first, one coherent grade.",

  "footer.copy": "All photographs shot & directed by Thinh Do.",
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
  "meta.title": "Thinh Do — Do Duy Thinh · Art Director",
  "meta.desc":
    "Thinh Do (Do Duy Thinh) — Art Director & nhiếp ảnh gia. Từ concept đến khung hình cuối: thời trang, chân dung, sản phẩm và ẩm thực.",

  "nav.about": "Giới thiệu",
  "nav.narrative": "Câu chuyện",
  "nav.craft": "Năng lực",
  "nav.timeline": "Hành trình",
  "nav.projects": "Dự án",
  "nav.contact": "Liên hệ",

  "hero.role1": "Art Director",
  "hero.role2": "Nhiếp ảnh gia",
  "hero.lede":
    "Art Director và nhiếp ảnh gia tại Việt Nam. Tôi dẫn dắt hệ thống thị giác từ concept, casting tới ánh sáng và hậu kỳ — để mỗi chiến dịch đọc như một thể thống nhất, dù là chân dung, thời trang hay tĩnh vật sản phẩm.",
  "hero.cta1": "Xem dự án",
  "hero.cta2": "Về tôi",
  "hero.basedIn": "Đang ở",
  "hero.basedInVal": "Việt Nam",
  "hero.shotOn": "Chụp bằng",
  "hero.scroll": "Cuộn",

  "about.num": "01 — Giới thiệu",
  "about.caption": "Tại hiện trường — chỉ đạo, không chỉ bấm máy.",
  "about.h2": "Chỉ đạo nghệ thuật<br><em>qua ống kính</em> — từ<br>concept đến khung hình.",
  "about.body":
    "<p>Tôi là <strong>Thinh Do</strong> — <strong>Do Duy Thinh</strong> trên mạng — <strong>Art Director (Photographer)</strong> đang rèn để dẫn dắt chiến dịch hình ảnh, không chỉ bấm máy. Nhiếp ảnh là nghề cốt lõi, nhưng chỉ đạo nghệ thuật mới giữ mọi thứ thành một thể: concept, casting, styling, ánh sáng, bối cảnh và hậu kỳ.</p>" +
    "<p>Hầu hết quyết định đều vô hình trong ảnh cuối. Một chân dung tưởng như nhẹ tênh thường trải qua ba lần thử sáng, hai lần đổi đồ và nhiều giờ đi bộ ở công viên công cộng không giấy phép — đúng như hai cuốn sách <em>Commercial Campaign</em> và <em>TAOS</em> ghi lại như các case study, không chỉ là gallery.</p>" +
    "<p>Công việc xoay quanh <strong>chân dung, thời trang, sản phẩm và ẩm thực</strong>, chụp rộng và điện ảnh bằng Fujifilm XT5. Tôi chỉ đạo những buổi chụp gọn, ưu tiên hiện trường và giữ một grade nhất quán để khán giả đọc cả bộ ảnh như một hệ thống thị giác, không phải mười hai khung rời rạc.</p>" +
    "<p>Tôi học tại <strong>RMIT University</strong> (Business), nơi thực hành studio đi cùng phân tích cách doanh nghiệp, con người và thị trường lao động vận hành. Sự kết hợp — <em>môi trường kinh doanh, people analytics và quan hệ lao động</em> — là điều tôi mang lên set: đọc brief một cách thương mại, chỉ đạo con người bằng thấu cảm có phương pháp và giữ sản xuất công bằng, hợp tác.</p>",
  "about.direction.k": "Định hướng nghề nghiệp",
  "about.direction.v":
    "Hướng tới <strong>Art Director</strong> cho nhiếp ảnh thương mại và nội dung thị giác — dẫn dắt nhóm sáng tạo nhỏ và chiến dịch trọn gói (concept → chỉ đạo chụp → hậu kỳ) cho các thương hiệu thời trang, lifestyle và hospitality tại Việt Nam và khu vực.",
  "about.direction.why": "Vì sao chọn hướng này",
  "about.direction.whyV":
    "Tôi thích trách nhiệm nằm giữa ý đồ của khách hàng và cảm xúc của khán giả. AD là người quyết định giữ gì và bỏ gì — và năng lực phán đoán ấy được rèn bằng việc chụp nhiều, học cách thương hiệu kiếm tiền, cách đội ngũ giữ động lực và cách hợp đồng bảo vệ người làm sáng tạo. Portfolio này tuyển chọn mỗi dự án như bằng chứng cho phán đoán đó.",
  "about.analytical.k": "Cách tôi làm việc một cách phân tích",
  "about.analytical.v":
    "Với mỗi artefacts tôi đi theo <strong>What → So what → Now what</strong>: tôi đã làm gì và đóng góp cụ thể, bài học rút ra (kèm framework/bằng chứng), và cách tôi sẽ áp dụng khi làm AD. Các mục Kỹ năng, Hành trình và từng trang Dự án làm điều đó tường minh — để nhà tuyển dụng truy được năng lực, không chỉ gu thẩm mỹ.",

  "narrative.num": "01 — Narrative",
  "narrative.h2": "Sự tò mò<br><em>giữ tôi tiếp tục sáng tạo</em>",
  "narrative.lede":
    "Câu chuyện của tôi — bằng lời của chính tôi. Sự tò mò đã đưa tôi đến nhiếp ảnh như thế nào, RMIT đã dạy tôi điều gì qua quá trình làm, và vì sao tôi hướng tới Art Director.",
  "narrative.mylife.k": "My life",
  "narrative.mylife.p1":
    "Tôi luôn là người thích tạo ra thứ gì đó và tìm nhiều cách khác nhau để thể hiện bản thân. Lớn lên trong một cuộc sống ổn định, nhưng tôi luôn tò mò về những điều ngoài kia. Tôi muốn trải nghiệm nhiều hơn, gặp gỡ người mới và học những điều nằm ngoài những gì mình đã biết. Tôi nghĩ sự tò mò ấy luôn là một phần quan trọng của con người tôi.",
  "narrative.mylife.p2":
    "Nhiếp ảnh trở thành một trong những cách tôi khám phá sự tò mò đó. Lúc đầu, tôi đơn giản thích bấm máy và xem mình tạo ra được gì. Nhưng càng chụp, tôi càng nhận ra mình không chỉ quan tâm đến bức ảnh. Tôi thích quá trình tìm ra một cảm xúc, tạo nên một bầu không khí và biến một ý tưởng trong đầu thành thứ có thể nhìn thấy.",
  "narrative.mylife.p3":
    "Với tôi, nhiếp ảnh đã trở thành cách kể chuyện từ góc nhìn của chính mình. Đôi khi câu chuyện đến từ chủ thể, đôi khi từ môi trường, đôi khi chỉ từ cách tôi chọn khung hình. Nó dạy tôi chậm lại, quan sát khác đi và tìm ra cách nhìn thế giới của riêng mình.",
  "narrative.story.k": "Story — RMIT đã dạy tôi điều gì",
  "narrative.story.p1":
    "Các dự án tại RMIT giúp tôi hiểu mình muốn trở thành kiểu người sáng tạo nào. Nhiếp ảnh chân dung dạy tôi làm việc với con người và cách những thay đổi nhỏ trong biểu cảm, tạo dáng hay ánh sáng có thể thay đổi hoàn toàn cảm xúc của bức ảnh. Các dự án thời trang cho tôi tự do hơn để thử nghiệm styling, bố cục và tâm trạng, và giúp tôi tự tin hơn khi phát triển ý tưởng thị giác của riêng mình.",
  "narrative.story.p2":
    "Các dự án sản phẩm và thương mại là một bước quan trọng khác. Chúng khiến tôi nhận ra tạo ra một hình ảnh đẹp thôi là chưa đủ. Phải có lý do đằng sau cách sản phẩm được trình bày, ánh sáng được dùng và cả những chi tiết nhỏ nhất ở hậu cảnh. Tôi bắt đầu chú ý nhiều hơn đến texture, màu sắc, bóng đổ và tính chân thực vì tôi muốn hình ảnh cuối cùng có chủ ý nhưng vẫn đáng tin.",
  "narrative.story.p3":
    "Tôi cũng học được nhiều từ những dự án không diễn ra đúng như kế hoạch. Đôi khi ý tưởng trong đầu hay hơn ảnh cuối, và đôi khi tôi phải nghĩ lại hoàn toàn sau khi nhận feedback. Thay vì xem đó là thất bại, tôi học cách xem nó là một phần của quá trình. RMIT đã dạy tôi thử nghiệm nhiều hơn, cởi mở với phê bình và không ngại đổi hướng khi tìm thấy hướng tốt hơn.",
  "narrative.future.k": "Future — Art Director",
  "narrative.future.p1":
    "Qua tất cả những trải nghiệm đó, tôi bắt đầu hiểu rằng mình muốn vượt ra ngoài vai trò chỉ là nhiếp ảnh gia. Tôi thích chụp ảnh, nhưng tôi còn hứng thú hơn với quá trình nảy ra ý tưởng và tìm cách để mọi yếu tố thị giác cùng hoạt động với nhau. Đó là lý do tôi muốn trở thành Art Director trong tương lai.",
  "narrative.future.p2":
    "Tôi muốn làm những dự án nơi mình có thể phát triển định hướng thị giác tổng thể, từ ý tưởng đầu tiên đến hình ảnh cuối cùng. Tôi muốn làm việc cùng nhiếp ảnh gia, stylist, designer, người mẫu và những người sáng tạo khác, và gom những ý tưởng khác nhau lại để tạo ra thứ gì đó nhất quán và có ý nghĩa. Kinh nghiệm nhiếp ảnh cho tôi điểm khởi đầu vì tôi hiểu một bức ảnh được tạo ra thế nào, nhưng tôi muốn tiếp tục học về những phần còn lại của quy trình sáng tạo.",
  "narrative.future.p3":
    "Tôi chưa biết chính xác con đường này sẽ đưa mình đi đâu, và tôi nghĩ đó là một phần khiến nó thú vị. Điều tôi biết là tôi muốn tiếp tục sáng tạo, tiếp tục thử nghiệm và tiếp tục tìm những cách mới để kể chuyện bằng hình ảnh. Mọi thứ tôi đã trải qua cho đến nay, từ sự tò mò đầu tiên về nhiếp ảnh đến các dự án tại RMIT, đã giúp tôi tiến gần hơn tới việc hiểu kiểu người sáng tạo mà mình muốn trở thành.",
  "narrative.analytical": "Nhìn lại — chân dung dạy tôi chỉ đạo con người, thời trang dạy tôi xây hệ thống thị giác, sản phẩm dạy tôi sự chủ ý và kiểm soát texture, màu sắc, ánh sáng, và việc học từ feedback cho tôi phương pháp lặp. Chính hành trình đó đưa tôi từ nhiếp ảnh gia sang Art Director.",

  "stats.projects": "Dự án",
  "stats.photos": "Ảnh",
  "stats.papers": "Bài nghiên cứu",
  "stats.ratio": "Tỉ lệ khung hình",
  "stats.golden": "Giờ vàng",

  "about.facts.education": "Học vấn",
  "about.facts.educationV": "RMIT University — Cử nhân Business",
  "about.facts.work": "Kinh nghiệm",
  "about.facts.workV":
    "Freelance Photographer & Visual Content · Hỗ trợ Art Direction · Hậu kỳ (ánh sáng, grading, retouch)",
  "about.facts.skills": "Công cụ chính",
  "about.facts.skillsV":
    "Fujifilm XT5 · Adobe Photoshop / Lightroom / Illustrator · Concept boarding · Ánh sáng hiện trường & studio",
  "about.facts.hobbies": "Khác",
  "about.facts.hobbiesV": "Tennis · Gym · Gaming · Nghiên cứu thị giác",
  "about.facts.email": "Email công việc",
  "about.facts.emailV": "duythinh.dave@gmail.com",

  "craft.num": "02 — Năng lực",
  "craft.h2": "Tôi mang gì<br><em>khi làm Art Director</em>",
  "craft.tag1": "concept → chỉ đạo",
  "craft.card1": "Chỉ đạo thị giác",
  "craft.focus": "AD in practice",
  "craft.note1":
    "Phân tích trước khi bấm máy: biến brief thành hệ thống thị giác (mood board → palette → quy tắc set/đạo cụ → logic shot) để mọi khung hình đọc như một chiến dịch. Bằng chứng: sách Commercial Campaign — bốn nghiên cứu, một hệ thống grading.",
  "craft.tag2": "craft & system",
  "craft.card2": "Chụp & hệ thống hậu kỳ",
  "craft.l1": "Concept boarding & logic shot (Commercial Campaign, TAOS 4 giai đoạn)",
  "craft.l2": "Chỉ đạo hiện trường & chỉ đạo diễn xuất (ánh sáng tự nhiên, ngược sáng, performance)",
  "craft.l3": "Thời trang / chân dung / sản phẩm / ẩm thực — một grade thống nhất",
  "craft.l4": "Quyết định có ý thức thương mại (case Gucci & Vinamilk)",
  "craft.l5": "Lãnh đạo thấu hiểu con người (People Analytics & Employment Relations)",
  "craft.note2":
    "Một pipeline, bốn thể loại. Grade, lựa chọn lens và negative space chính là hệ thống — không phải trang trí.",
  "craft.tag3": "map bằng chứng",
  "craft.card3": "Portfolio chứng minh thế nào",
  "craft.note3":
    "Mỗi dự án được map tới một năng lực AD: Commercial Campaign = chỉ đạo trọn gói; TAOS = kiểm soát narrative; Business Environment = hiểu biết thương mại; People Analytics = lắng nghe đội ngũ; Employment Relations = sản xuất công bằng.",
  "craft.evidence": "Bằng chứng",
  "craft.cap1.ev1": "Sách Commercial Campaign (concept → ánh sáng → ghi chú edit cho từng entry)",
  "craft.cap1.ev2": "TAOS — narrative 4 chặng, màu sắc là kịch tính",
  "craft.cap1.ev3": "Kỷ luật mood board & palette nhất quán qua 30 khung hình",
  "craft.cap2.ev1": "Hệ Fujifilm XT5: M, ISO 100, 1/2000, ƒ1.2 — ưu tiên hiện trường, không studio",
  "craft.cap2.ev2": "Ánh sáng sản phẩm: highlight có kiểm soát, không mất texture kính",
  "craft.cap2.ev3": "Food heritage: ánh sáng ấm định hướng + negative space",
  "craft.cap3.ev1": "Gucci PESTLE/SWOT → bảo vệ brand equity (AD cần)",
  "craft.cap3.ev2": "L’Oréal Glassdoor IMPACT + Val AI → lắng nghe team sáng tạo",
  "craft.cap3.ev3": "CBA/Telstra ER → set công bằng, thoả thuận rõ ràng",
  "craft.analytical": "Góc phân tích: mọi khẳng định trên được bóc tách trong Projects với What/So what/Now what. Nhà tuyển dụng có thể audit tư duy, không chỉ hình ảnh.",

  "timeline.num": "03 — Hành trình",
  "timeline.h2": "Học vấn, việc làm<br><em>& cách tôi học</em>",
  "timeline.intro":
    "Không chỉ đã làm gì — mà đóng góp của tôi là gì, tư duy thay đổi ra sao, và lần sau làm Art Director tôi sẽ làm khác điều gì.",
  "timeline.edu.k": "Học vấn",
  "timeline.edu.title": "RMIT University — Cử nhân Business",
  "timeline.edu.meta": "Business · nền tảng phân tích cho AD",
  "timeline.edu.body":
    "<p>Các học phần <strong>Business Environment, People Analytics, Employment Relations và Work in Global Society</strong> cho tôi lăng kính thương mại và con người mà một Art Director cần: đọc thị trường của thương hiệu, lắng nghe tín hiệu của đội ngũ, và tổ chức công việc một cách công bằng.</p>",
  "timeline.edu.b1": "Nắm PESTLE, SWOT, chuỗi giá trị và phân tích cầu — áp dụng trong case Gucci và Vinamilk. Giờ tôi brief buổi chụp với cùng logic outside-in: bức ảnh đang cố giải toả áp lực thị trường nào?",
  "timeline.edu.b2": "Học phân tích định tính nhóm (IMPACT + Val AI, sentiment Glassdoor, thiết kế Qualtrics) trong nghiên cứu L’Oréal. Với AD, đó là năng lực chỉ đạo: phát hiện sớm tắc nghẽn của team sáng tạo trước khi thành burn-out.",
  "timeline.edu.b3": "Duy trì thực hành phản tư (self-reflection artefacts) — kiểm định quyết định bằng What → So what → Now what, không chỉ trực giác.",
  "timeline.work.k": "Kinh nghiệm",
  "timeline.work.title": "Freelance Photographer → Art Direction (đang rèn)",
  "timeline.work.meta": "Sản xuất thương mại hiện trường · Trọn gói",
  "timeline.work.body":
    "<p>Tôi chỉ đạo và chụp các set thương mại nhỏ (chân dung, thời trang, sản phẩm, ẩm thực) bằng hệ Fujifilm XT5, chịu trách nhiệm từ concept đến bàn giao. Nghĩa là chọn casting, scout hiện trường, thiết kế ánh sáng, chỉ đạo diễn xuất và grading về một look.</p>",
  "timeline.work.b1": "<strong>Đóng góp:</strong> chỉ đạo solo 30 khung Commercial Campaign (mood board, logic styling, test sáng, hệ thống edit) và 12 khung TAOS (bốn chặng, màu như kịch bản). Cả hai được ghi thành sách — là chỉ đạo nghệ thuật, không chỉ file gốc.",
  "timeline.work.b2": "<strong>Vòng học:</strong> bản edit đầu làm mất texture da vì tương phản nặng; chai thuỷ tinh cháy highlight. Giờ tôi kiểm bằng vòng phản hồi: chụp → grade → check in → sửa sáng/đạo cụ rồi chụp lại. Lặp có phân tích thay cho thử-sai.",
  "timeline.work.b3": "<strong>Tiếp theo khi làm AD:</strong> chuyển từ làm solo sang dẫn ê-kíp 3–4 người (stylist, MUA, trợ lý, retoucher) với one-page visual system và call sheet rõ — dùng bài học ER để giữ vai trò, credit và thù lao minh bạch.",
  "timeline.reflect.k": "Phản tư (STAR + What/So what/Now what)",
  "timeline.reflect.title": "Từ shooter thành director",
  "timeline.reflect.body":
    "<p><strong>S/T:</strong> Tôi từng là shooter giỏi nhưng director mỏng — ảnh đẹp lẻ, không thành chiến dịch.</p><p><strong>A:</strong> Tôi xây lại quy trình quanh hệ thống: cấu trúc chương của Commercial Campaign, kịch bản màu 4 chặng của TAOS, và các framework business/people để đọc bối cảnh trước khi nâng máy.</p><p><strong>R:</strong> Cả hai cuốn sách giờ đọc như một giọng. Phản hồi của thầy chuyển từ “ảnh đẹp” sang yêu cầu phân tích sâu hơn — portfolio này trả lời bằng cách làm tư duy thành thứ nhìn thấy được.</p><p><strong>Now what:</strong> Với tư cách Art Director, mỗi buổi chụp sau này sẽ kèm brief phân tích một trang (mục tiêu, khán giả, căng thẳng thị trường, quy tắc thị giác, nhu cầu đội ngũ) và retro sau chụp — để gu thẩm mỹ thành phương pháp lặp lại được.</p>",
  "timeline.skills.k": "Năng lực đầu ra — map bằng chứng",
  "timeline.skills.title": "Kỹ năng gắn với bằng chứng",
  "timeline.skills.intro": "Mỗi năng lực được neo vào một artefacts bạn có thể kiểm trong Projects.",
  "timeline.skills.s1k": "Tư duy phản biện & phân tích",
  "timeline.skills.s1v": "Gucci PESTLE/SWOT & Vinamilk chuỗi giá trị → chẩn đoán áp lực thị trường và đề xuất; thể hiện trong lựa chọn ánh sáng/grading thương mại như quyết định có chủ ý, không phải trôi theo style.",
  "timeline.skills.s2k": "Làm việc nhóm & lãnh đạo",
  "timeline.skills.s2v": "Báo cáo nhóm PESTLE peer review & phân tích team định tính L’Oréal (27 review Glassdoor, IMPACT) → học lắng nghe tín hiệu tắc nghẽn thăng tiến và leadership; map sang chỉ đạo talent và crew trên set.",
  "timeline.skills.s3k": "Năng lực số & thị giác",
  "timeline.skills.s3v": "Hệ Fujifilm XT5, grade nhất quán qua 42 khung hình, dàn trang sách A4 — craft như một hệ thống tái lập được.",
  "timeline.skills.s4k": "Thực hành đạo đức & bao trùm",
  "timeline.skills.s4v": "Đạo đức AI tuyển dụng AIA, DEI CBA & thương lượng Telstra → định hình casting công bằng, thoả thuận minh bạch và quyết định human-in-the-loop khi dùng AI trên set.",
  "timeline.skills.s5k": "Linh hoạt toàn cầu & liên văn hoá",
  "timeline.skills.s5v": "Work in Global Society — lăng kính lao động ILO/OECD + bối cảnh Việt Nam; định vị cho công việc thương hiệu khu vực.",
  "timeline.future.k": "12 tháng tới",
  "timeline.future.title": "Trở thành Art Director",
  "timeline.future.b1": "Dẫn một chiến dịch có hỗ trợ với team có credit (stylist/MUA/retouch) và brief phân tích + retro — xuất bản thành Case 03.",
  "timeline.future.b2": "Khoá ngắn: quản lý màu nâng cao + hệ flash studio để bổ sung cho thế mạnh ánh sáng tự nhiên hiện trường.",
  "timeline.future.b3": "Xây tệp liên hệ AD: SMEs hospitality + thời trang tại HCMC cần bản sắc thị giác ở cấp hệ thống, không chỉ shoot lẻ.",

  "gal.num": "04 — Dự án",
  "gal.h2": "Dự án chọn lọc <em>như bằng chứng</em>",
  "gal.intro":
    "Sáu dự án được tuyển như một Art Director — hai sách ảnh cho thấy năng lực chỉ đạo và hai cụm nghiên cứu cho thấy vì sao hình ảnh có lý về thương mại và con người. Mỗi trang dự án bóc <em>What → So what → Now what</em>.",
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
  "projects.hint": "Độ sâu phân tích bên trong — mỗi paper mở ra What / So what / Now what cho Art Direction.",

  "contact.num": "05 — Liên hệ",
  "contact.h2": "Cần Art Direction,<br>có ý tưởng mới,<br><em>hay chỉ muốn trò chuyện?</em>",
  "contact.lede": "Đang nhận các shoot do Art Director dẫn dắt (concept → chỉ đạo chụp → hậu kỳ). Ê-kíp gọn, ưu tiên hiện trường, một grade thống nhất.",

  "footer.copy": "Toàn bộ ảnh do Thinh Do chỉ đạo & chụp.",
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
