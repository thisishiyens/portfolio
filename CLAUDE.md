# 포트폴리오 사이트 — Claude 작업 규칙

> 새 대화를 시작하면 이 파일을 가장 먼저 읽고, 아래 규칙을 그대로 따른다.

## 0. 사용자와 대화하는 법 (가장 중요)
- 사용자(예나)는 **디자이너이고 개발 지식이 전혀 없다.** 항상 한국어로, 쉬운 말로 설명한다.
- 전문 용어(commit, push, repo, 브랜치 등)는 쓰지 않거나, 쓰면 바로 쉬운 말로 풀어 준다.
- 질문이 필요하면 선택지를 주고 쉬운 말로 묻는다. 한 번에 하나씩, 꼭 필요한 것만.
- 결과 보고는 짧게: 무엇이 바뀌었는지, 사용자가 해야 할 일이 있는지.

## 1. 작업 위치
- 모든 파일 작업과 명령은 **이 폴더에서만** 한다: `/Users/yena/Documents/Portfolio`
  (device_bash 에서는 `$HOME/mnt/Portfolio`). 이 폴더 밖의 파일은 건드리지 않는다.
- 이 폴더의 사이트는 GitHub Pages 로 공개된다. 저장소: `thisishiyens/portfolio` (branch: `main`)
  (예전 계정 `yess19600-maker` 에서 옮겨졌다. 맥 폴더의 원격 주소는 이미 새 주소로 맞춰 두었다.)

## 2. 폴더 구조 (사용자가 코드 편집기에서 급히 고칠 수 있게 나뉘어 있다)
```
index.html        뼈대
content/          ★ 글 수정 전용: site.js(이름·연락처·메인 영상) / about.js / career.js / branding.js / product.js / campaign.js
images/<작업id>/   ★ 이미지 전용: thumb.jpg, 1.jpg, 2.jpg ...   (hero 파일은 images/ 바로 아래, About 사진은 images/about/)
css/style.css     디자인
js/app.js         동작
fonts/            글꼴
사용설명서.txt     사용자용 설명서
_backup/          예전 버전 (공개하지 않음)
```
- **내용(글·연도·파일 이름) 수정은 `content/` 파일에서만** 한다. 스파게티 코드를 만들지 않는다.
- 파일을 합치지 않는다. 디자인은 css, 동작은 js, 내용은 content 로 계속 분리한다.
- 새 작업을 추가하면: 해당 content 파일에 덩어리를 추가하고 `images/<id>/` 폴더도 같이 만든다.
- 구조나 사용법이 바뀌면 `사용설명서.txt` 도 같이 고친다.

## 3. 디자인 규칙 (사용자가 정한 것 — 임의로 바꾸지 않는다)
- 참고 사이트: https://oyeh.kr/ 의 구조·간격·글자 크기를 비슷하게. 순백 배경.
- 키컬러 `#00674f` 는 **쓰지 않는다.** 호버 효과도 **없다.** (필요하면 검정 정도만. 예외: 메인 이미지 아래 섹션 바로가기 글씨는 사용자 요청으로 회색 → 호버 시 검정)
- 메인 이미지 바로 아래에 Branding / Product / Campaign 바로가기(13px 회색, 누르면 검정+볼드로 유지, **PC는 썸네일 시작선에 맞춰 왼쪽 / 모바일은 가운데**, 클릭하면 해당 섹션으로 이동)를 둔다.
- 글꼴: 영문 Poppins, 한글 Pretendard (둘 다 OFL). 본문 글자 크기는 **12~24px** 안에서만.
- 섹션 3개: Branding / Product / Campaign. (파일·주소 이름도 product 로 통일했다. 예전 이름 uiux 는 더 이상 쓰지 않는다.) 메인 페이지 작업 목록은 웹 그리드 3열, 모바일(760px 이하) 1열이고 개수 제한 없이 전부 보인다(MORE VIEW 없음).
  상세 페이지는 왼쪽 이미지 / 오른쪽 내용 구조 그대로. 패딩 값은 모두 짝수로 쓴다.
- 상단 헤더: 왼쪽 이름 로고, 오른쪽에 **Works / About me** 메뉴만 둔다(Career 는 숨김)(예전 검정 Contact 버튼은 사용자 요청으로 뺐다. 이메일은 맨 아래). 모바일은 위 줄에 로고, 아래 줄에 메뉴. Works = 메인의 작업 목록으로 내려감,
  About = 글 + 정사각형 사진(content/about.js, images/about/1.jpg. PC는 사진이 오른쪽, 모바일은 사진이 위. 비우면 글만), Career = 선으로 나눈 시간순 줄글(content/career.js, 지금은 메뉴에서 숨김). 주소는 #work / #about / #career.
- 고정되는 상단 메뉴와 섹션 바로가기 줄의 배경은 흰색 불투명도 90% + 뒤쪽 흐림 효과 blur 8px(사용자 요청).
- 섹션 제목(Branding / Product / Campaign) 큰 글씨는 **화면에 보이지 않는다**(css `h2 { display:none }`, 사용자 요청). 대신 바로가기 줄로 이동하고, 3개 섹션의 썸네일은 하나의 그리드처럼 이어진다. 웹 썸네일 간격은 가로 `--gx` 24px : 세로 `--gy` 48px (1:2, 사용자 요청, 섹션 사이도 `--gy`). 모바일은 카드 사이 32px. 소개 제목은 모바일에서 쉼표 뒤에서 줄바꿈.
- 썸네일 **16:9**. 글씨는 왼쪽 정렬. 메인 목록의 썸네일 아래 **3줄**: 프로젝트명 **18px** semibold / 서브 설명(sub) **14px** #111(제목과 같은 검정, 사용자 요청) / 연도 **12px** light 회색. 줄 사이 간격은 제목↔서브 `--t1` 6px, 서브↔연도 `--t2` 10px(사용자 요청).
- 상세 페이지 설명 글 규칙: 문장마다 줄을 바꾸지 않고 **문단 단위**로 길게 쓴다(문단 사이만 빈 줄 한 칸). 문장은 "~했습니다"로 끝맺고, 구성은 소개 → 방향·핵심 작업 → 성과 순. 중요한 내용은 `**이렇게**` 감싸 Medium(500) 굵기 + 연한 노랑(#fff4b0) 형광펜(작업당 2~3곳 정도).
- 상세 페이지 제목·부제목 아래 **태그**(content 의 `tags`, 선택): 회색 배경(--ph) + 회색 글씨(#5c5c5c) **11px**(사용자 요청, 12px 규칙의 예외), 모서리 --r1, 간격 8px.
- 상세 페이지 맨 마지막 줄(12px 회색): "기여도 nn% · 연도" (content 의 `contrib` + `year`. contrib 가 없으면 연도만).
- 썸네일 이미지는 슬라이드 전체가 아니라 각 작업의 가장 좋은 비주얼 한 장을 잘라 쓴다(BatCrew 참고). (sub 가 비어 있으면 그 줄은 생략)
- 작업 총 9개 = Branding 3 + Product 3 + Campaign 3 (3열 × 3줄, 모든 줄이 꽉 참). Branding 의 BlerOn 은 로고 + 브랜드 키트 + 행사 부스를 한 작업으로 합친 것. Campaign 은 Haribo Exhibition in Jeju MKT(해피월드+할로윈) / miffy Exhibition in Seoul MKT(미피와 마법 우체통) / Kakao IP Promotion. Product 는 BlerOn Mobile Web / Maystay Mobile Web / ddazua Web (ddazua 내용은 사용자가 추후 교체 예정).
- 합치거나 뺀 작업의 예전 이미지 폴더는 지우지 않고 `_backup/` 으로 옮겨 둔다.
- 개인정보·민감 정보(전화번호, 집행 예산·비용 금액 등)는 사이트 글에 넣지 않는다. 이력서의 예산·비용 수치는 뺀다.
- 모서리 둥글기는 `--r1` 4px(버튼) / `--r2` 8px(썸네일) / `--r3` 12px(About 큰 사진) 세 가지만 쓴다. 작업 상세 페이지의 이미지는 둥글기 없음(사용자 요청). 메인 큰 영상(hero)은 화면 끝까지 꽉 차므로 둥글게 하지 않는다.
- 여백은 css 맨 위 `:root` 의 값만 쓴다: 좌우 `--pad`(웹 32px/모바일 16px), 간격 `--s1` 16 / `--s2` 32 / `--s3` 64. 임의의 px 를 새로 쓰지 않는다(모두 짝수).
- 상세 페이지: 왼쪽 이미지 / 오른쪽 내용. 제목 18px, 부제목 13px(회색), 설명 14px(행간 1.8).
- 맨 위에 **소개 영역**(흰 배경 + 검은 글씨, 글씨는 썸네일 시작점과 맞춤. 바로가기 줄 위에 얇은 선: 썸네일 시작점~오른쪽 끝. 사용자 요청)(content/site.js 의 `intro`: 큰 제목 + 문단 + 단계 버튼)이 있다. 사용자 요청. 제목은 PC 32px · 모바일 24px(예외), 단계 버튼은 둥근 알약(999px, 예외). title 을 비우면 사라진다. 메인 영상이 들어가면 소개 영역 아래에 나온다.
- 맨 위 메인은 영상(mp4/webm)·GIF·이미지 모두 가능. 지금은 비워 둬서 나오지 않음(사용자가 나중에 영상 넣을 예정, content/site.js 의 hero/heroMobile 에 파일 이름을 적으면 나옴). 비어 있을 땐 상단 메뉴와 바로가기 줄 사이를 16px 더 띄움.
- 이미지 규격: 메인 PC 영상 1920×840 · 이미지 2400×1050 / 모바일 영상 1080×1350 · 이미지 1200×1500 /
  썸네일 1600×900 / 상세 가로 1600 (세로 자유).

## 4. 안전 규칙
- 사용자가 요청하지 않은 파일을 지우거나 덮어쓰지 않는다. 사용자가 직접 고친 내용은 보존한다.
  (예: 사용자가 바꾼 제목 "Bleron" 처럼, 작업 전에 현재 파일 내용을 먼저 읽는다.)
- 비밀번호·토큰·개인정보를 파일에 쓰거나 올리지 않는다.
- 강제 덮어쓰기(force push)는 하지 않는다.

## 5. 「웹에 갱신」 사이클
사용자가 **"갱신", "올려줘", "배포", "웹에 반영", "푸시"** 처럼 말하면 아래를 순서대로 알아서 처리한다.
**그 말을 하기 전에는 절대 GitHub 에 올리지 않는다.** (수정 작업만 계속한다.)

1. **무엇이 바뀌었는지 확인** — 폴더의 변경 내용을 보고, 쉬운 말로 3~5줄 요약해 알려 준다.
2. **점검** — 브라우저로 index.html 을 열어 오류가 없는지, 웹(3열)·모바일(1열) 화면이 정상인지 본다.
   content 파일의 문법 오류, 이미지 파일 이름 불일치, 5MB 를 넘는 이미지/GIF, 10MB 를 넘는 영상은 사용자에게 알린다.
3. **저장 기록 만들기(commit)** — 변경 전체를 한 번에 묶어 한국어 한 줄 메시지로 저장한다.
   예) "Branding 작업 3개 추가, 메인 영상 교체". 작성자는 기존 기록의 작성자(yena)를 그대로 쓴다.
4. **GitHub 에 올리기(push)** — 아래 §6 절차로 `main` 에 올린다.
5. **반영 확인** — GitHub Pages 는 올린 뒤 1~2분 걸린다. §6 의 한계 때문에 공개 주소는 직접 못 열어 보므로,
   올라간 내용은 클라우드에서 점검하고 "올라갔어요. 1~2분 뒤 사이트를 새로고침해서 확인해 주세요" 를 쉬운 말로 알려 준다.
- 실패하면 원인을 쉬운 말로 설명하고, 사용자가 해야 할 일이 있으면 단계별로 알려 준다. 같은 시도를 반복하지 않는다.
- `.DS_Store`, `_backup/`, `.deploy.bundle` 은 `.gitignore` 로 제외돼 있다. (정리 완료)

## 6. 올리기(push) 방법 — 확정된 절차 (2026-11-25 첫 갱신에서 성공 확인)
**왜 이렇게 하나:** 사용자 맥에 연결된 작업 공간(device_bash)은 보안 정책상 **push 가 막혀 있다**(내려받기만 가능).
그래서 저장 기록은 맥 폴더에서 만들고, 올리기만 클라우드 쪽에서 한다.

**선행 조건 (이미 완료됨. 실패하면 사용자에게 아래를 쉬운 말로 안내):**
- claude.ai 설정 → 커넥터에서 GitHub(계정 `thisishiyens`) 연결
- Claude GitHub 앱이 `thisishiyens/portfolio` 에 설치됨 (https://github.com/apps/claude/installations/select_target)
- `list_repos` 가 이 저장소를 보여 주고 `can_push: true` 여야 한다.

**세션마다 처음 한 번:**
- `device_request_delete_permission` 으로 이 폴더의 삭제를 허용받는다. (맥 폴더의 git 이 임시 잠금 파일 `.git/index.lock` 을
  지우지 못해 다음 git 명령이 "File exists" 로 막히기 때문. 사용자가 거절하면 잠금 파일을 `.git/stale-index-lock` 로 이름만 바꿔 우회한다.)
- `add_repo`(owner=thisishiyens, repo=portfolio, access=push) 로 클라우드에 저장소를 붙이고
  `git clone --depth 1 https://github.com/thisishiyens/portfolio /home/claude/portfolio` 를 **한 번만**(타임아웃 넉넉히) 한다.
  이미 있으면 다시 받지 말고 `git -C /home/claude/portfolio fetch --depth=1 origin main && git -C /home/claude/portfolio reset --hard origin/main`.

**갱신할 때마다:**
1. (맥, device_bash) `git fetch origin` 으로 GitHub 최신 상태를 먼저 받는다.
2. (맥) `git add -A` 후 커밋한다. 작성자는 `-c user.name=yena -c user.email=yena@yenaui-MacBookPro.local`.
   메시지는 한국어 한 줄 + 시스템이 지정한 Co-Authored-By 줄.
3. (맥) `git bundle create .deploy.bundle origin/main..main` — 새 커밋만 묶음 파일로 만든다. (`.gitignore` 로 제외돼 있음)
4. `device_stage_files` 로 `.deploy.bundle` 을 클라우드로 옮긴다 (`/mnt/user-data/uploads/Portfolio/.deploy.bundle`).
5. (클라우드, `/home/claude/portfolio`) `git fetch <묶음파일> main` → `git merge --ff-only FETCH_HEAD` → `git -c push.negotiate=true push origin main`.
   빨리감기(ff-only)가 안 되면 중단하고 원인을 사용자에게 설명한다. 강제로 올리지 않는다.
6. (맥) 묶음 파일을 지우고 `git fetch origin` 으로 맥 폴더의 기록도 GitHub 와 맞춘다. `git status -sb` 가 `## main...origin/main` 이어야 한다.
7. 올라간 내용(클라우드 clone)을 브라우저로 열어 웹 3열·모바일 1열, 상세 페이지, 오류 없음을 확인한다.

**공개 주소 확인 한계:** 이 환경에서는 `github.io` 와 GitHub 설정(API) 조회가 막혀 있어 사이트가 실제로 반영됐는지 직접 볼 수 없다.
그래서 올린 뒤에는 "1~2분 후 사이트를 새로고침해서 확인해 주세요" 라고 안내한다.
사이트 주소(사용자 확인 완료): https://thisishiyens.github.io/portfolio/
(이 도구로 열면 index.html 뼈대만 보이고, 이름·이메일·작업물은 자바스크립트로 채워져 확인되지 않는다. 그 부분은 사용자에게 새로고침해서 봐 달라고 안내한다.)

## 7. 새 대화를 시작할 때
1. 이 파일을 읽는다. 2. `git status` 로 현재 변경 상태를 본다. 3. 사용자가 요청한 것만 한다.
