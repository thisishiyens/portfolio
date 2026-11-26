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
  { id: "product",  name: "Product",  items: typeof PRODUCT  !== "undefined" ? PRODUCT  : [] },
  { id: "campaign", name: "Campaign", items: typeof CAMPAIGN !== "undefined" ? CAMPAIGN : [] }
];
const PROJECTS = SECTIONS.flatMap(s => s.items.map(p => ({ ...p, cat: s.id })));

/* 사이트 기본 정보 (site.js 에 문제가 있어도 사이트가 멈추지 않도록 기본값을 둡니다) */
const S = typeof SITE !== "undefined" ? SITE
  : { name: "PORTFOLIO", role: "", tagline: "", email: "", hero: "", heroMobile: "", intro: null };
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
/* 상단 메뉴 높이를 재서 css 에 알려 줌 (섹션 바로가기를 그 아래에 붙이기 위해) */
const setHH = () => document.documentElement.style.setProperty("--hh", document.querySelector("header").offsetHeight + "px");
setHH(); window.addEventListener("resize", setHH);
if (window.ResizeObserver) new ResizeObserver(setHH).observe(document.querySelector("header"));   /* 글꼴이 늦게 떠서 메뉴 높이가 바뀌어도 다시 맞춤 */
if (document.fonts) document.fonts.ready.then(setHH);

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

/* ---------- 맨 위 검정 소개 영역 (content/site.js 의 intro) ---------- */
function introHTML() {
  const t = S.intro;
  if (!t || !t.title) return "";
  return '<div class="intro"><h1>' + esc(t.title).replace(", ", ',<br class="mb"> ') + "</h1>" +
    (t.paragraphs || []).map(x => "<p>" + esc(x).replace(/\n/g, "<br>").replace(/\{m\}/g, '<br class="mb">') + "</p>").join("") +
    ((t.steps && t.steps.length) ? '<div class="steps">' + t.steps.map(x => "<span>" + esc(x) + "</span>").join('<i>→</i>') + "</div>" : "") +
    "</div>";
}

/* ---------- 메인 페이지 ---------- */
function home() {
  /* 메인 이미지·영상 파일을 content/site.js 에 적어야 나옵니다. 비어 있으면 아예 나오지 않습니다. */
  let h = introHTML() + (S.hero || S.heroMobile ? '<div class="hero">' + heroInner() + "</div>" : "") +
    '<nav class="jump">' + SECTIONS.map(s => '<a href="#' + s.id + '" data-t="' + esc(s.name) + '">' + esc(s.name) + "</a>").join("") + "</nav>";   /* 메인 이미지 아래 섹션 바로가기 */
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
  app.innerHTML = '<article class="detail' + (hasImg ? " about" : " solo") + '">' + (hasImg ? '<div class="imgs">' + imgsHtml(A.images, A.title) + "</div>" : "") + '<div class="info">' +
    "<h1>" + esc(A.title) + '</h1><p class="sub">' + esc(A.sub) + '</p><p class="desc">' + esc(A.desc).replace(/__(.+?)__/g, '<b class="lb">$1</b>') + "</p></div></article>";
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
  /* 링크 아이콘: Heroicons(MIT) link 16 solid. 링크가 있으면 부제목 오른쪽 옆에 붙는다 */
  const LINK_ICON = '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8.914 6.025a.75.75 0 0 1 1.06 0 3.5 3.5 0 0 1 0 4.95l-2 2a3.5 3.5 0 0 1-5.396-4.402.75.75 0 0 1 1.251.827 2 2 0 0 0 3.085 2.514l2-2a2 2 0 0 0 0-2.828.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.086 9.975a.75.75 0 0 1-1.06 0 3.5 3.5 0 0 1 0-4.95l2-2a3.5 3.5 0 0 1 5.396 4.402.75.75 0 0 1-1.251-.827 2 2 0 0 0-3.085-2.514l-2 2a2 2 0 0 0 0 2.828.75.75 0 0 1 0 1.06Z" clip-rule="evenodd"/></svg>';
  const sub = esc(p.sub) + (p.link
    ? '<a class="ext" href="' + esc(p.link) + '" target="_blank" rel="noopener" aria-label="사이트 바로가기">' + LINK_ICON + "</a>"
    : "");
  const imgs = imgsHtml(p.images, p.title);
  app.innerHTML = '<article class="detail"><div class="imgs">' + imgs + '</div><div class="info">' +
    '<a class="back" href="#' + p.cat + '">← ' + esc(SECTIONS.find(s => s.id === p.cat).name) + "</a>" +
    "<h1>" + esc(p.title) + '</h1><p class="sub' + (p.tags && p.tags.length ? " has-tags" : "") + '">' + sub + "</p>" +
    (p.tags && p.tags.length ? '<div class="tags">' + p.tags.map(t => "<span>" + esc(t) + "</span>").join("") + "</div>" : "") + '<p class="desc">' + esc(p.desc).replace(/\*\*(.+?)\*\*/g, '<b class="hl">$1</b>') + '</p><p class="meta">' + (p.contrib ? "기여도 " + esc(p.contrib) + " · " : "") + esc(p.year) + "</p>" +
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
  /* 누른 섹션명은 진하게(볼드) 유지 */
  document.querySelectorAll(".jump a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + id));
  const el = id && document.getElementById(id);
  if (el) el.scrollIntoView(); else window.scrollTo(0, 0);
}
/* ---------- 이미지 저장 막기(사용자 요청): 우클릭 메뉴·끌어서 저장·모바일 길게 눌러 저장을 막는다. 캡처까지는 막을 수 없다 ---------- */
document.addEventListener("contextmenu", e => { if (e.target.closest("img, video, .ph, .lightbox")) e.preventDefault(); });
document.addEventListener("dragstart", e => { if (e.target.closest("img, video")) e.preventDefault(); });

/* ---------- 상세 이미지 확대 보기: 이미지를 누르면 크게, 다시 누르거나 Esc 로 닫기, 좌우 방향키로 넘기기 ---------- */
let lb = null, lbList = [], lbIdx = 0;
function lbClose() { if (lb) { lb.remove(); lb = null; document.body.style.overflow = ""; } }
function lbShow(i) { lbIdx = (i + lbList.length) % lbList.length; lb.querySelector("img").src = lbList[lbIdx].src; }
document.addEventListener("click", e => {
  if (lb) { lbClose(); return; }
  const im = e.target.closest(".detail:not(.about) .imgs img");
  if (!im) return;
  lbList = Array.from(document.querySelectorAll(".detail:not(.about) .imgs img"));
  lb = document.createElement("div"); lb.className = "lightbox"; lb.innerHTML = "<img alt=''>";
  document.body.appendChild(lb); document.body.style.overflow = "hidden";
  lbShow(lbList.indexOf(im));
});
document.addEventListener("keydown", e => {
  if (!lb) return;
  if (e.key === "Escape") lbClose();
  else if (e.key === "ArrowRight") lbShow(lbIdx + 1);
  else if (e.key === "ArrowLeft") lbShow(lbIdx - 1);
});
window.addEventListener("hashchange", lbClose);

window.addEventListener("hashchange", route);
/* 처음 열거나 새로고침할 때는 항상 맨 위(메인 글귀)부터 보여 줍니다. 섹션명·Works 를 눌렀을 때만 그 위치로 내려갑니다. */
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
{
  const first = decodeURIComponent(location.hash.slice(1));
  if (first === "work" || SECTIONS.some(x => x.id === first)) history.replaceState(null, "", location.pathname + location.search);
}
route();
