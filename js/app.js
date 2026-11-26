/* ============================================================
   동작 파일 — 건드리지 마세요.
   content 폴더의 내용을 읽어서 화면을 그려 주는 부분입니다.
   ============================================================ */

/* 이미지가 들어 있는 폴더 */
const IMG_DIR = "images/";

/* 섹션(Branding / Product / Campaign)과 내용 파일을 연결합니다.
   content 파일 하나에 오타가 있어도 다른 섹션은 정상적으로 보이도록 안전장치를 걸어 두었습니다. */
const SECTIONS = [
  { id: "branding", name: "Branding", items: typeof BRANDING !== "undefined" ? BRANDING : [] },
  { id: "uiux",     name: "Product",  items: typeof UIUX     !== "undefined" ? UIUX     : [] },
  { id: "campaign", name: "Campaign", items: typeof CAMPAIGN !== "undefined" ? CAMPAIGN : [] }
];
const PROJECTS = SECTIONS.flatMap(s => s.items.map(p => ({ ...p, cat: s.id })));

/* 사이트 기본 정보 (site.js 에 문제가 있어도 사이트가 멈추지 않도록 기본값을 둡니다) */
const S = typeof SITE !== "undefined" ? SITE
  : { name: "PORTFOLIO", role: "", tagline: "", email: "", hero: "", heroMobile: "" };
const A = typeof ABOUT !== "undefined" ? ABOUT : { title: "About", sub: "", desc: "", images: [] };
const C = typeof CAREER !== "undefined" ? CAREER : { title: "Career", intro: "", items: [] };

const app = document.getElementById("app");
const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const src = f => IMG_DIR + f;
let view = null;

/* ---------- 상단·하단 글자 채우기 ---------- */
document.title = S.name + " · PORTFOLIO";
document.getElementById("logo").textContent = S.name;
document.getElementById("fname").textContent = S.name;
document.getElementById("frole").innerHTML = esc(S.role) + "<br>" + esc(S.tagline);
document.getElementById("fcopy").textContent = "© " + new Date().getFullYear() + " " + S.name;
const fe = document.getElementById("femail");
fe.textContent = S.email;
fe.href = "mailto:" + S.email;
/* 상단 Contact 버튼: 맨 아래(이메일이 보이는 곳)로 부드럽게 내려감 */
/* 상단 메뉴 높이를 재서 css 에 알려 줌 (섹션 바로가기를 그 아래에 붙이기 위해) */
const setHH = () => document.documentElement.style.setProperty("--hh", document.querySelector("header").offsetHeight + "px");
setHH(); window.addEventListener("resize", setHH);
if (window.ResizeObserver) new ResizeObserver(setHH).observe(document.querySelector("header"));   /* 글꼴이 늦게 떠서 메뉴 높이가 바뀌어도 다시 맞춤 */
if (document.fonts) document.fonts.ready.then(setHH);
document.getElementById("contact").addEventListener("click", e => {
  e.preventDefault();
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
});

/* ---------- 메인 큰 이미지 / 영상 ---------- */
const mq = window.matchMedia("(max-width:760px)");
function heroInner() {
  const f = (mq.matches && S.heroMobile) ? S.heroMobile : S.hero;
  if (!f) return "MAIN IMAGE";
  const u = esc(src(f));
  return /\.(mp4|webm)$/i.test(f)
    ? '<video src="' + u + '" autoplay muted loop playsinline preload="auto" onerror="this.remove()"></video>'
    : '<img src="' + u + '" alt="" onerror="this.remove()">';
}
mq.addEventListener("change", () => { const h = document.querySelector(".hero"); if (h) h.innerHTML = heroInner(); });

/* ---------- 메인 페이지 ---------- */
function home() {
  /* 메인 이미지·영상 파일을 content/site.js 에 적어야 나옵니다. 비어 있으면 아예 나오지 않습니다. */
  let h = (S.hero || S.heroMobile ? '<div class="hero">' + heroInner() + "</div>" : "") +
    '<nav class="jump">' + SECTIONS.map(s => '<a href="#' + s.id + '">' + esc(s.name) + "</a>").join("") + "</nav>";   /* 메인 이미지 아래 섹션 바로가기 */
  h += '<div id="work">';
  SECTIONS.forEach(s => {
    const list = PROJECTS.filter(p => p.cat === s.id);
    h += '<section id="' + s.id + '"><h2>' + esc(s.name) + '</h2><div class="grid">';
    list.forEach(p => {
      h += '<a class="card" href="#' + esc(p.id) + '"><div class="t">' +
        (p.thumb ? '<img src="' + esc(src(p.thumb)) + '" alt="' + esc(p.title) + '" onerror="this.remove()">' : "<span>IMAGE</span>") +
        "</div><b>" + esc(p.title) + "</b>" + (p.sub ? '<span class="s">' + esc(p.sub) + "</span>" : "") + "<em>" + esc(p.year) + "</em></a>";
    });
    h += "</div></section>";
  });
  h += "</div>";
  app.innerHTML = h;
}

/* ---------- 이미지 목록 (상세 페이지·About 공통) ---------- */
function imgsHtml(list, alt) {
  const ratios = ["4/3", "1/1", "16/9"];
  return (list || []).map((f, k) => f
    ? '<div class="ph"><img src="' + esc(src(f)) + '" alt="' + esc(alt) + '" onerror="this.parentNode.style.aspectRatio=\'4/3\';this.remove()"></div>'
    : '<div class="ph" style="aspect-ratio:' + ratios[k % 3] + '">IMAGE ' + (k + 1) + "</div>").join("");
}

/* ---------- About 페이지 (상세 페이지와 같은 구조: 왼쪽 이미지 / 오른쪽 내용) ---------- */
function aboutPage() {
  const hasImg = A.images && A.images.length;   /* 사진이 없으면 글만 한 줄로 */
  app.innerHTML = '<article class="detail' + (hasImg ? "" : " solo") + '">' + (hasImg ? '<div class="imgs">' + imgsHtml(A.images, A.title) + "</div>" : "") + '<div class="info">' +
    "<h1>" + esc(A.title) + '</h1><p class="sub">' + esc(A.sub) + '</p><p class="desc">' + esc(A.desc) + "</p></div></article>";
}

/* ---------- Career 페이지 (선으로 나눈 줄글 흐름) ---------- */
function careerPage() {
  app.innerHTML = '<article class="career"><h1>' + esc(C.title) + "</h1>" +
    (C.intro ? '<p class="desc">' + esc(C.intro) + "</p>" : "") +
    '<div class="rows">' + (C.items || []).map(it =>
      '<div class="row"><span class="when">' + esc(it.period) + '</span><div><b>' + esc(it.title) + '</b><p class="desc">' + esc(it.desc) + "</p></div></div>").join("") +
    "</div></article>";
}

/* ---------- 작업물 상세 페이지 ---------- */
function detail(p) {
  const same = PROJECTS.filter(x => x.cat === p.cat), i = same.indexOf(p);
  const prev = same[i - 1], next = same[i + 1];
  const sub = p.link
    ? '<a href="' + esc(p.link) + '" target="_blank" rel="noopener">' + esc(p.sub || p.link) + " ↗</a>"
    : esc(p.sub);
  const imgs = imgsHtml(p.images, p.title);
  app.innerHTML = '<article class="detail"><div class="imgs">' + imgs + '</div><div class="info">' +
    '<a class="back" href="#' + p.cat + '">← ' + esc(SECTIONS.find(s => s.id === p.cat).name) + "</a>" +
    "<h1>" + esc(p.title) + '</h1><p class="sub">' + sub + '</p><p class="desc">' + esc(p.desc).replace(/\*\*(.+?)\*\*/g, '<b class="hl">$1</b>') + '</p><p class="meta">' + (p.contrib ? "기여도 " + esc(p.contrib) + " · " : "") + esc(p.year) + "</p>" +
    '<div class="nav2"><span>' + (prev ? '<a href="#' + esc(prev.id) + '">← ' + esc(prev.title) + "</a>" : "") + "</span><span>" +
    (next ? '<a href="#' + esc(next.id) + '">' + esc(next.title) + " →</a>" : "") + "</span></div></div></article>";
}

/* ---------- 주소(#...)에 따라 화면 전환 ---------- */
function route() {
  const id = decodeURIComponent(location.hash.slice(1));
  const p = PROJECTS.find(x => x.id === id);
  /* 상단 메뉴에서 지금 보고 있는 곳을 진하게 표시 */
  const cur = id === "about" ? "about" : id === "career" ? "career" : id ? "work" : "";
  document.querySelectorAll("header nav a").forEach(a => a.classList.toggle("on", a.dataset.n === cur));
  if (p) { detail(p); view = "detail"; window.scrollTo(0, 0); return; }
  if (id === "about")  { aboutPage();  view = "about";  window.scrollTo(0, 0); return; }
  if (id === "career") { careerPage(); view = "career"; window.scrollTo(0, 0); return; }
  if (view !== "home") { home(); view = "home"; window.scrollTo(0, 0); }
  const el = id && document.getElementById(id);
  if (el) el.scrollIntoView(); else window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);
route();
