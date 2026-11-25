/* ============================================================
   동작 파일 — 건드리지 마세요.
   content 폴더의 내용을 읽어서 화면을 그려 주는 부분입니다.
   ============================================================ */

/* 이미지가 들어 있는 폴더 */
const IMG_DIR = "images/";

/* 섹션(Branding / UI/UX / Campaign)과 내용 파일을 연결합니다.
   content 파일 하나에 오타가 있어도 다른 섹션은 정상적으로 보이도록 안전장치를 걸어 두었습니다. */
const SECTIONS = [
  { id: "branding", name: "Branding", items: typeof BRANDING !== "undefined" ? BRANDING : [] },
  { id: "uiux",     name: "UI/UX",    items: typeof UIUX     !== "undefined" ? UIUX     : [] },
  { id: "campaign", name: "Campaign", items: typeof CAMPAIGN !== "undefined" ? CAMPAIGN : [] }
];
const PROJECTS = SECTIONS.flatMap(s => s.items.map(p => ({ ...p, cat: s.id })));

/* 사이트 기본 정보 (site.js 에 문제가 있어도 사이트가 멈추지 않도록 기본값을 둡니다) */
const S = typeof SITE !== "undefined" ? SITE
  : { name: "PORTFOLIO", role: "", tagline: "", email: "", instagram: "", behance: "", hero: "", heroMobile: "" };

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
document.getElementById("social").innerHTML = [["Instagram", S.instagram], ["Behance", S.behance]]
  .filter(x => x[1])                                   /* 비워두면 메뉴에서 사라집니다 */
  .map(x => '<a href="' + esc(x[1]) + '" target="_blank" rel="noopener">' + x[0] + "</a>").join("");

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
  let h = '<div class="hero">' + heroInner() + "</div>";
  SECTIONS.forEach(s => {
    const list = PROJECTS.filter(p => p.cat === s.id);
    h += '<section id="' + s.id + '"><h2>' + esc(s.name) + '</h2><div class="grid">';
    list.forEach((p, i) => {
      h += '<a class="card' + (i >= 4 ? " x" : "") + '" href="#' + esc(p.id) + '"><div class="t">' +
        (p.thumb ? '<img src="' + esc(src(p.thumb)) + '" alt="' + esc(p.title) + '" onerror="this.remove()">' : "<span>IMAGE</span>") +
        "</div><b>" + esc(p.title) + "</b><em>" + esc(p.year) + "</em></a>";
    });
    h += "</div>" + (list.length > 4 ? '<div class="more"><button type="button">MORE VIEW</button></div>' : "") + "</section>";
  });
  app.innerHTML = h;
  app.querySelectorAll(".more button").forEach(b => b.onclick = () => {
    const sec = b.closest("section"), on = sec.classList.toggle("open");
    b.textContent = on ? "CLOSE" : "MORE VIEW";
  });
}

/* ---------- 작업물 상세 페이지 ---------- */
function detail(p) {
  const same = PROJECTS.filter(x => x.cat === p.cat), i = same.indexOf(p);
  const prev = same[i - 1], next = same[i + 1], ratios = ["4/3", "1/1", "16/9"];
  const sub = p.link
    ? '<a href="' + esc(p.link) + '" target="_blank" rel="noopener">' + esc(p.sub || p.link) + " ↗</a>"
    : esc(p.sub);
  const imgs = (p.images || []).map((f, k) => f
    ? '<div class="ph"><img src="' + esc(src(f)) + '" alt="' + esc(p.title) + '" onerror="this.parentNode.style.aspectRatio=\'4/3\';this.remove()"></div>'
    : '<div class="ph" style="aspect-ratio:' + ratios[k % 3] + '">IMAGE ' + (k + 1) + "</div>").join("");
  app.innerHTML = '<article class="detail"><div class="imgs">' + imgs + '</div><div class="info">' +
    '<a class="back" href="#' + p.cat + '">← ' + esc(SECTIONS.find(s => s.id === p.cat).name) + "</a>" +
    "<h1>" + esc(p.title) + '</h1><p class="sub">' + sub + '</p><p class="desc">' + esc(p.desc) + "</p>" +
    '<div class="nav2"><span>' + (prev ? '<a href="#' + esc(prev.id) + '">← ' + esc(prev.title) + "</a>" : "") + "</span><span>" +
    (next ? '<a href="#' + esc(next.id) + '">' + esc(next.title) + " →</a>" : "") + "</span></div></div></article>";
}

/* ---------- 주소(#...)에 따라 화면 전환 ---------- */
function route() {
  const id = decodeURIComponent(location.hash.slice(1));
  const p = PROJECTS.find(x => x.id === id);
  if (p) { detail(p); view = "detail"; window.scrollTo(0, 0); return; }
  if (view !== "home") { home(); view = "home"; window.scrollTo(0, 0); }
  const el = id && document.getElementById(id);
  if (el) el.scrollIntoView(); else window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);
route();
