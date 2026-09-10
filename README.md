# 영준 ♥ 은주 모바일 청첩장

GitHub Pages로 배포하는 모바일 청첩장입니다.
저장소: `Egg-ju-seyo/egg-ju-seyo.github.io`
배포 주소: `https://egg-ju-seyo.github.io/`

---

## 1. 폴더 구조

```
├── index.html          ← 메인 페이지 (수정할 일 거의 없음)
├── css/style.css        ← 디자인(색상, 폰트, 레이아웃)
├── js/script.js          ← 기능(캘린더, 갤러리, 계좌복사 등) + 사진 목록
└── assets/
    ├── photos/main.jpg   ← 히어로(맨 위) 대표 사진 1장
    ├── gallery/01~07.jpg ← 사진첩(The Archive)에 들어갈 사진들
    └── bgm/song.mp3      ← 배경음악 파일
```

## 2. GitHub에 올리는 방법

1. 이 폴더 전체를 저장소 `egg-ju-seyo.github.io`에 업로드하세요.
   - GitHub 웹사이트에서: 저장소 페이지 → `Add file` → `Upload files` → 이 폴더 안의 파일/폴더를 통째로 드래그
   - 또는 git 명령어를 쓰신다면:
     ```
     git clone https://github.com/Egg-ju-seyo/egg-ju-seyo.github.io.git
     (다운로드한 파일들을 이 폴더 안에 복사)
     git add .
     git commit -m "청첩장 초안"
     git push
     ```
2. 몇 분 후 `https://egg-ju-seyo.github.io/` 에서 확인할 수 있어요.

## 3. 사진 넣는 방법

- **대표 사진(히어로)**: `assets/photos/main.jpg` 라는 이름으로 사진을 넣어주세요. (세로 사진 추천, 3:4 비율)
- **사진첩(갤러리)**: `assets/gallery/` 폴더에 `01.jpg`, `02.jpg` … 이름으로 넣어주세요.
  - 사진 개수를 늘리거나 줄이려면 `js/script.js` 맨 위 `photos` 배열에 파일명을 추가/삭제하면 돼요.
  - 사진을 아직 안 넣었다면 자동으로 "Preview" 표시가 나와서 레이아웃만 미리 볼 수 있어요.

## 4. 배경음악

`assets/bgm/song.mp3`에 이미 반영되어 있어요. 화면 오른쪽 아래 동그란 버튼을 누르면 재생/정지돼요.
브라우저 정책상 자동재생은 되지 않고, 방문자가 버튼을 눌러야 재생돼요 (모바일 브라우저 공통 정책).
곡을 바꾸고 싶으시면 같은 파일명(`song.mp3`)으로 덮어써주시면 돼요.

## 5. 계좌번호

양가 계좌번호는 이미 반영되어 있어요. 나중에 바꾸실 일이 있으면 `index.html`에서
`account__list` 부분의 계좌번호와, 그 아래 `data-copy="..."` 값을 함께 수정해주세요
(둘이 다르면 복사 버튼이 잘못된 번호를 복사해요).

## 6. 문구 수정하기

`index.html`의 `<section class="invite" id="invitation">` 안에 있는 인사말 문구를 원하시는 대로 수정하시면 됩니다.

## 7. 오시는 길 확인

- 지하철/주차 안내는 일반적인 정보를 기준으로 작성했어요. 실제 안내 문구(주차 가능 시간, 무료 여부 등)는 예식장 측에 확인 후 `index.html`의 `location__title` 근처 accordion 내용을 수정해주세요.
- 네이버 지도는 실제 인터랙티브 지도로 연동되어 있어요 (Client ID: `r4qdu8v20e`). 만약 지도가 안 뜨면, 네이버클라우드플랫폼 콘솔에서 이 Client ID의 '허용 도메인'에 `https://egg-ju-seyo.github.io`가 정확히 등록되어 있는지 확인해주세요.

## 8. 참고

- 폰트: Playfair Display(영문), Pretendard(한글) — 모두 무료 웹폰트입니다.
- 지도: Google 지도 임베드를 사용했어요 (별도 API 키 필요 없음).
