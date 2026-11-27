/* ============================================================
   ★ 사이트 기본 정보 (이름, 연락처, 메인 이미지) ★
   따옴표 " " 안의 글자만 바꾸세요. 따옴표와 쉼표는 지우지 마세요.
   ============================================================ */

const SITE = {

  /* 상단 로고와 하단에 나오는 이름 */
  name: "LEE YENA",

  /* 하단에 나오는 직함과 소개 한 줄 */
  role: "Visual Designer",
  tagline: "Branding · Product · Campaign",

  /* 연락처 */
  email: "lyn_biz@naver.com",

  /* 메뉴·섹션·하단의 짧은 글자 이름 (관리자 편집기에서도 바꿀 수 있습니다) */
  labels: {
    works: "Works",          // 위 메뉴
    about: "About me",       // 위 메뉴
    branding: "Branding",    // 섹션 이름 (바로가기, 상세 페이지의 ← 뒤로가기)
    product: "Product",
    campaign: "Campaign",
    contact: "CONTACT",      // 맨 아래 연락처 제목
    tab: "PORTFOLIO"         // 브라우저 탭 제목: 이름 · 이 글자
  },

  /* ---------- 맨 위 검정 소개 영역 ----------
     title 을 비우면("") 이 영역은 나오지 않습니다.
     paragraphs 는 문단 단위(문단 사이가 한 칸 띄워짐), steps 는 아래 둥근 버튼들입니다. */
  intro: {
    title: "Clarity in Brand, Consistency in Experience.",
    /* 줄바꿈: \n = PC·모바일 모두 줄바꿈 / {m} = 모바일에서만 줄바꿈 (앞에 공백을 꼭 두세요) */
    paragraphs: [
      "브랜드의 핵심 기준을 세우고, {m}이를 프로덕트와 캠페인의 모든 접점으로 확장합니다.\n" +
      "복잡한 문제를 직관적인 디자인 시스템과 UX로 풀어내,\n" +
      "사용자에게는 일관된 경험을 제공하고 {m}팀에게는 반복 활용할 수 있는 가이드와 구조를 남깁니다."
    ],
    steps: ["Define", "Structure", "Design", "Operate"]
  },

  /* ---------- 맨 위 큰 이미지 (영상 / GIF / 이미지 모두 가능) ----------
     images 폴더에 파일을 넣고, 파일 이름만 적으세요. 예) "hero.mp4"
     .mp4 .webm 은 영상(소리 없이 자동 반복), .gif .jpg .png .webp 는 이미지로 보입니다.
     비워두면("") 회색 박스가 보입니다.

     크기 가이드
       PC      영상 1920 x 840 px  /  GIF·이미지 2400 x 1050 px   (가로로 긴 16:7)
       모바일  영상 1080 x 1350 px /  GIF·이미지 1200 x 1500 px   (세로 4:5)
     영상은 10MB 이하, GIF는 5MB 이하를 권장합니다. (mp4가 훨씬 가볍습니다) */
  hero: "",                // PC 화면용 (예: "hero.mp4")
  heroMobile: ""           // 모바일용 (비워두면 위 파일을 그대로 씁니다)
};
