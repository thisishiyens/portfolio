/* ============================================================
   ★ Branding 작업물 목록 ★
   작업 하나 = 아래 { } 한 덩어리입니다.
   따옴표 " " 안의 글자만 바꾸세요. 따옴표, 쉼표, 중괄호는 지우지 마세요.

   id      주소에 쓰이는 이름. 영문 소문자·숫자·- 만 쓰고, 다른 작업과 겹치면 안 됩니다.
           images 폴더 안의 폴더 이름과 똑같이 맞추면 헷갈리지 않습니다.
   title   작업 제목 (썸네일 아래 굵은 글씨 / 상세 페이지 제목)
   year    연도 (썸네일 아래 연한 글씨)
   sub     상세 페이지 부제목. 기간 등을 적습니다.      예) "2026.01 – 2026.03"
   link    웹페이지 주소. 있으면 부제목이 클릭되는 링크가 됩니다. 없으면 "" 로 두세요.
   desc    설명. 줄을 바꾸려면 \n 을 쓰세요.
   thumb   썸네일 파일. 1600 x 900 px (16:9)
   images  상세 페이지 이미지들. 위에서부터 차례로 나옵니다. 가로 1600 px, 세로는 자유.

   * 새 작업 추가: 아래 덩어리 하나를 통째로 복사해서 맨 아래에 붙이고,
     앞 덩어리 끝에 쉼표(,)가 있는지 확인한 뒤 id 와 내용을 바꾸세요.
   * 순서 바꾸기: 덩어리를 통째로 위아래로 옮기세요. 위에 있을수록 먼저 보입니다.
   * 4개까지는 바로 보이고, 5번째부터는 MORE VIEW 를 눌러야 보입니다.
   * 파일 이름은 영문 소문자·숫자·-·_ 만 쓰고 .jpg 같은 확장자까지 똑같이 적으세요.
   * 파일이 없거나 이름이 틀려도 사이트는 깨지지 않고 회색 박스로 보입니다.
   ============================================================ */

const BRANDING = [
  {
    id:     "branding-01",
    title:  "Bleron Logo",
    year:   "2025",
    sub:    "",
    link:   "",
    desc:   "로고 브랜드의 가치와 성격을 압축하는 스토리라인 정립 및\n에듀테크 서비스의 핵심인 '성장'과 '연결'을 나타내는\n대문자 'B'를 모티프 설정하였습니다.\n다양한 조형적 시안 검증을 거쳐\n온·오프라인 매체에 최적화된 심볼형 로고 형태를 다듬었습니다.\n\n매체별 시인성 확보를 위해 심볼(Symbol),\n워드마크(Wordmark), 그리고 조합형(Combination)의\n다양한 조형적 밸런스를 검증하였습니다.",
    thumb:  "branding-01/thumb.jpg",
    images: [
      "branding-01/1.jpg",
      "branding-01/2.jpg",
      "branding-01/3.jpg"
    ]
  },
  {
    id:     "branding-02",
    title:  "프로젝트 이름 02",
    year:   "2026",
    sub:    "2026.01 – 2026.03",
    link:   "",
    desc:   "프로젝트 설명이 들어갑니다.",
    thumb:  "branding-02/thumb.jpg",
    images: [
      "branding-02/1.jpg",
      "branding-02/2.jpg",
      "branding-02/3.jpg"
    ]
  },
  {
    id:     "branding-03",
    title:  "프로젝트 이름 03",
    year:   "2025",
    sub:    "2025.06 – 2025.09",
    link:   "",
    desc:   "프로젝트 설명이 들어갑니다.",
    thumb:  "branding-03/thumb.jpg",
    images: [
      "branding-03/1.jpg",
      "branding-03/2.jpg",
      "branding-03/3.jpg"
    ]
  },
  {
    id:     "branding-04",
    title:  "프로젝트 이름 04",
    year:   "2025",
    sub:    "2025.03 – 2025.05",
    link:   "",
    desc:   "프로젝트 설명이 들어갑니다.",
    thumb:  "branding-04/thumb.jpg",
    images: [
      "branding-04/1.jpg",
      "branding-04/2.jpg",
      "branding-04/3.jpg"
    ]
  },
  {
    id:     "branding-05",
    title:  "프로젝트 이름 05",
    year:   "2024",
    sub:    "2024.10 – 2024.12",
    link:   "",
    desc:   "프로젝트 설명이 들어갑니다.",
    thumb:  "branding-05/thumb.jpg",
    images: [
      "branding-05/1.jpg",
      "branding-05/2.jpg",
      "branding-05/3.jpg"
    ]
  }
];
