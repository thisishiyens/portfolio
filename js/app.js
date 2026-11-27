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
    const shown = list.length > 3 && list.length % 3 ? list.length - list.length % 3 : list.length;   /* 줄이 덜 찬 나머지는 more 로 숨김 */
    list.forEach((p, k) => {
      h += '<a class="card' + (k >= shown ? " extra" : "") + '" href="#' + esc(p.id) + '"><div class="t">' +
        (p.thumb ? '<img src="' + esc(src(p.thumb)) + '" alt="' + esc(p.title) + '" onerror="this.remove()">' : "<span>IMAGE</span>") +
        "</div><b>" + esc(p.title) + "</b>" + (p.sub ? '<span class="s">' + esc(p.sub) + "</span>" : "") + "</a>";
    });
    h += "</div>" + (shown < list.length ? '<button type="button" class="more">more</button>' : "") + "</section>";
  });
  h += "</div>";
  app.innerHTML = h;
  app.querySelectorAll(".more").forEach(m => m.onclick = () => { m.closest("section").classList.add("open"); m.remove(); });
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
  /* 이름 아래 한 줄: Resume(PDF) 링크(about.js 의 resume 가 있을 때) + 이메일 */
  const lk = [];
  if (A.resume) lk.push('<a class="lnk" href="' + esc(A.resume) + '" target="_blank" rel="noopener">Resume (PDF) ↗</a>');
  if (S.email) lk.push('<a class="lnk" href="mailto:' + esc(S.email) + '">' + esc(S.email) + "</a>");
  const links = lk.length ? '<p class="sub links">' + lk.join(" &nbsp;·&nbsp; ") + "</p>" : "";
  app.innerHTML = '<article class="detail' + (hasImg ? " about" : " solo") + '">' + (hasImg ? '<div class="imgs">' + imgsHtml(A.images, A.title) + "</div>" : "") + '<div class="info">' +
    "<h1>" + esc(A.title) + '</h1><p class="sub has-links">' + esc(A.sub) + "</p>" + links + '<p class="desc">' + esc(A.desc).replace(/__(.+?)__/g, '<b class="lb">$1</b>') + "</p></div></article>";
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
  /* 제목 아래 부제목 자리에는 연도를 보여 준다. 링크가 있으면 Role/Scope/Output 표 맨 아래에 LINK 줄로 나온다 */
  const sub = esc(String(p.year));
  const linkRow = p.link ? '<div class="fact"><b>LINK</b><div><a class="lnk" href="' + esc(p.link) + '" target="_blank" rel="noopener">사이트 바로가기 ↗</a></div></div>' : "";
  /* 내용은 sections(줄 단위)로 받는다. 한 줄 = 왼쪽 이미지 / 오른쪽 글. sections 가 없으면 예전 방식(desc + images)을 한 줄로 본다 */
  const secs = (p.sections && p.sections.length) ? p.sections : [{ images: p.images, desc: p.desc }];
  const hasTags = p.tags && p.tags.length;
  const facts = (p.facts && p.facts.length)
    ? '<div class="facts">' + p.facts.map(f => '<div class="fact"><b>' + esc(f[0]) + "</b><div>" +
        (Array.isArray(f[1]) ? f[1].map(t => "<span>" + esc(t) + "</span>").join("") : esc(f[1])) + "</div></div>").join("") + linkRow + "</div>" : "";
  const head = '<div class="dhead"><a class="back" href="#' + p.cat + '">← ' + esc(SECTIONS.find(s => s.id === p.cat).name) + "</a>" +
    "<h1>" + esc(p.title) + '</h1><p class="sub' + (hasTags ? " has-tags" : "") + '">' + sub + "</p>" +
    (hasTags ? '<div class="tags">' + p.tags.map(t => "<span>" + esc(t) + "</span>").join("") + "</div>" : "") + facts + "</div>";
  /* 맨 아래: 기여도·연도. 부분마다 기여도가 다르면 credits 로 줄마다 보여 준다(이미지 속 숫자와 같게) */
  const metas = (p.credits && p.credits.length)
    ? p.credits.map(c => '<p class="meta">' + esc(c[0]) + " · 기여도 " + esc(c[1]) + " · " + esc(c[2]) + "</p>").join("")
    : (p.contrib ? '<p class="meta">기여도 ' + esc(p.contrib) + "</p>" : "");
  const foot = '<div class="foot">' + metas +
    '<div class="nav2"><span>' + (prev ? '<a href="#' + esc(prev.id) + '">← ' + esc(prev.title) + "</a>" : "") + "</span><span>" +
    (next ? '<a href="#' + esc(next.id) + '">' + esc(next.title) + " →</a>" : "") + "</span></div></div>";
  app.innerHTML = '<article class="detail rows">' + secs.map((s, k) =>
    '<div class="drow">' + gallery(s.images, p.title) + '<div class="info">' +
    (k === 0 ? head : "") + secText(s.desc) + (k === secs.length - 1 ? foot : "") + "</div></div>").join("") + "</article>";
  document.querySelectorAll(".drow .track").forEach(syncSlide);
  keepFirstSlide();
}

/* 이미지가 2장 이상인 줄은 항상 첫 번째 이미지부터 보이게 한다(모바일에서 이미지가 늦게 뜰 때 2번째로 밀리는 것 방지).
   사용자가 직접 밀거나 화살표를 누른 뒤에는 건드리지 않는다. */
function keepFirstSlide() {
  document.querySelectorAll(".drow .track").forEach(tr => {
    if (tr.children.length < 2) return;
    let touched = false;
    ["touchstart", "pointerdown", "wheel", "keydown"].forEach(ev => tr.addEventListener(ev, () => { touched = true; }, { passive: true }));
    const reset = () => { if (!touched && tr.scrollLeft !== 0) tr.scrollLeft = 0; };
    reset();
    tr.querySelectorAll("img").forEach(im => { if (!im.complete) im.addEventListener("load", reset, { once: true }); });
    window.addEventListener("load", reset, { once: true });
    setTimeout(reset, 300); setTimeout(reset, 1000);
    const row = tr.closest(".drow"); row && row.querySelectorAll(".arr").forEach(a => a.addEventListener("click", () => { touched = true; }));
  });
}

/* 한 줄의 이미지 영역: 큰 이미지(.view). 옆으로 넘길 수 있다(밀기·화살표) */
const ARR_L = '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd"/></svg>';
const ARR_R = '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/></svg>';
function gallery(list, alt) {
  const files = (list || []).filter(Boolean);
  const slides = files.map(f => '<img src="' + esc(src(f)) + '" alt="' + esc(alt) + '">').join("");
  const arrows = files.length > 1
    ? '<button type="button" class="arr prev" aria-label="이전 이미지">' + ARR_L + '</button><button type="button" class="arr next" aria-label="다음 이미지">' + ARR_R + "</button>" : "";
  return '<div class="view"><div class="track">' + slides + "</div>" + arrows + "</div>";
}
function goSlide(row, i) {
  const tr = row.querySelector(".track"), n = tr.children.length;
  i = Math.max(0, Math.min(n - 1, i));
  tr.scrollTo({ left: i * tr.clientWidth, behavior: "smooth" });
}
function curSlide(row) { const tr = row.querySelector(".track"); return Math.round(tr.scrollLeft / (tr.clientWidth || 1)); }

/* 글 한 덩어리 -> 문단(<p>)과 소제목(<h3>). 줄 맨 앞의 ## 는 소제목, **굵게** 는 형광펜 */
function secText(t) {
  return String(t || "").split("\n").map(l => l.trim()).filter(Boolean).map(l =>
    l.startsWith("## ") ? '<h3 class="st">' + esc(l.slice(3)) + "</h3>"
      : '<p class="desc">' + esc(l).replace(/\*\*(.+?)\*\*/g, '<b class="bd">$1</b>').replace(/==(.+?)==/g, '<b class="hl">$1</b>').replace(/\s*\/\/\s*/g, "<br>") + "</p>").join("");
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

/* ---------- 상세 이미지: 옆으로 넘기기(밀기·화살표), 큰 이미지를 누르면 확대(다시 누르거나 Esc 로 닫기, 좌우 방향키로 넘기기) ---------- */
let lb = null, lbList = [], lbIdx = 0;
function lbClose() { if (lb) { lb.remove(); lb = null; document.body.style.overflow = ""; } }
function lbShow(i) { lbIdx = (i + lbList.length) % lbList.length; lb.querySelector("img").src = lbList[lbIdx]; }
document.addEventListener("click", e => {
  if (lb) { lbClose(); return; }
  const ar = e.target.closest(".drow .arr");
  if (ar) { const row = ar.closest(".drow"); goSlide(row, curSlide(row) + (ar.classList.contains("next") ? 1 : -1)); return; }
  const im = e.target.closest(".drow .track img");
  if (!im) return;
  const row = im.closest(".drow"), imgs = Array.from(row.querySelectorAll(".track img"));
  lbList = imgs.map(x => x.getAttribute("src"));
  lb = document.createElement("div"); lb.className = "lightbox"; lb.innerHTML = "<img alt=''>";
  document.body.appendChild(lb); document.body.style.overflow = "hidden";
  lbShow(imgs.indexOf(im));
});
/* 처음/끝에서는 화살표를 숨긴다 */
function syncSlide(tr) {
  const row = tr.closest(".drow"), i = Math.round(tr.scrollLeft / (tr.clientWidth || 1)), n = tr.children.length;
  const pv = row.querySelector(".arr.prev"), nx = row.querySelector(".arr.next");
  if (pv) pv.hidden = i <= 0; if (nx) nx.hidden = i >= n - 1;
}
document.addEventListener("scroll", e => { if (e.target.classList && e.target.classList.contains("track")) syncSlide(e.target); }, true);
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
