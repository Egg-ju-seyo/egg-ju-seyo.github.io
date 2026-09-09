/* =========================================================
   영준 & 은주 모바일 청첩장 — 인터랙션 스크립트
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------------
     0. 사진첩 데이터
     사진을 추가하려면 assets/gallery 폴더에 이미지를 넣고
     아래 배열에 파일명을 추가/수정하세요.
     이미지가 없으면 자동으로 "Preview" placeholder가 표시됩니다.
  ----------------------------------------------------- */
  const photos = [
    { src: './assets/gallery/01.jpg' },
    { src: './assets/gallery/02.jpg' },
    { src: './assets/gallery/03.jpg' },
    { src: './assets/gallery/04.jpg' },
    { src: './assets/gallery/05.jpg' },
    { src: './assets/gallery/06.jpg' },
    { src: './assets/gallery/07.jpg' },
    { src: './assets/gallery/08.jpg' },
    { src: './assets/gallery/09.jpg' },
    { src: './assets/gallery/10.jpg' },
    { src: './assets/gallery/11.jpg' },
    { src: './assets/gallery/12.jpg' },
    { src: './assets/gallery/13.jpg' },
    { src: './assets/gallery/14.jpg' },
    { src: './assets/gallery/15.jpg' },
    { src: './assets/gallery/17.jpg' },
    { src: './assets/gallery/18.jpg' },
    { src: './assets/gallery/19.jpg' },
    { src: './assets/gallery/20.jpg' },
    { src: './assets/gallery/21.jpg' },
    { src: './assets/gallery/22.jpg' },
    { src: './assets/gallery/23.jpg' },
    { src: './assets/gallery/24.jpg' },
    { src: './assets/gallery/25.jpg' },
    { src: './assets/gallery/26.jpg' },
    { src: './assets/gallery/27.jpg' },
    { src: './assets/gallery/28.jpg' },
    { src: './assets/gallery/29.jpg' },
    { src: './assets/gallery/30.jpg' }
  ];

  /* -----------------------------------------------------
     1. 상단 메뉴 오버레이
  ----------------------------------------------------- */
  const menuBtn = document.getElementById('menuBtn');
  const menuCloseBtn = document.getElementById('menuCloseBtn');
  const menuOverlay = document.getElementById('menuOverlay');

  function openMenu() {
    menuOverlay.classList.add('is-open');
    menuOverlay.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    menuOverlay.classList.remove('is-open');
    menuOverlay.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
  menuBtn.addEventListener('click', openMenu);
  menuCloseBtn.addEventListener('click', closeMenu);
  document.querySelectorAll('[data-menu-link]').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* -----------------------------------------------------
     2. 스크롤 리빌 애니메이션
  ----------------------------------------------------- */
  const revealItems = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  revealItems.forEach(item => revealObserver.observe(item));

  /* -----------------------------------------------------
     4. 캘린더 자동 생성 (예식일 하이라이트)
  ----------------------------------------------------- */
  function renderCalendar(year, month, highlightDate) {
    // month: 1~12
    const calendarEl = document.getElementById('calendar');
    const dowNames = ['일', '월', '화', '수', '목', '금', '토'];
    const firstDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();

    let html = `<div class="calendar__grid">`;
    dowNames.forEach((d, i) => {
      const cls = i === 0 ? 'calendar__dow--sun' : (i === 6 ? 'calendar__dow--sat' : '');
      html += `<div class="calendar__dow ${cls}">${d}</div>`;
    });
    for (let i = 0; i < firstDay; i++) {
      html += `<div class="calendar__day"></div>`;
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dow = new Date(year, month - 1, d).getDay();
      let cls = dow === 0 ? 'calendar__day--sun' : (dow === 6 ? 'calendar__day--sat' : '');
      if (d === highlightDate) cls += ' calendar__day--highlight';
      html += `<div class="calendar__day ${cls}">${d}</div>`;
    }
    html += `</div>`;
    calendarEl.innerHTML = html;
  }
  renderCalendar(2026, 12, 26);

  /* -----------------------------------------------------
     5. 갤러리 그리드 렌더링
  ----------------------------------------------------- */
  const galleryGrid = document.getElementById('galleryGrid');
  const MAX_GRID_SLOTS = 6;

  function makeThumb(photo, index) {
    const div = document.createElement('div');
    div.className = 'gallery__item';
    div.dataset.index = index;
    div.innerHTML = `
      <img src="${photo.src}" alt="갤러리 사진 ${index + 1}" loading="lazy"
           onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
      <div class="gallery__item-label" style="display:none">Preview</div>
    `;
    // 이미지가 존재하는 동안엔 placeholder를 기본으로 숨기지 않고,
    // 에러 발생 시(onerror)에만 노출되도록 처리. 이미지가 없을 걸 대비해
    // 로드 실패 시 표시되는 placeholder를 미리 렌더링해 둠.
    const label = div.querySelector('.gallery__item-label');
    const img = div.querySelector('img');
    img.addEventListener('error', () => { label.style.display = 'flex'; });
    return div;
  }

  photos.slice(0, Math.min(photos.length, MAX_GRID_SLOTS)).forEach((photo, i) => {
    if (photos.length > MAX_GRID_SLOTS && i === MAX_GRID_SLOTS - 1) {
      const moreCount = photos.length - (MAX_GRID_SLOTS - 1);
      const moreDiv = document.createElement('div');
      moreDiv.className = 'gallery__item gallery__item--more';
      moreDiv.innerHTML = `<strong>+${moreCount}</strong><span>MORE</span>`;
      moreDiv.addEventListener('click', () => openArchive(0));
      galleryGrid.appendChild(moreDiv);
    } else {
      const thumb = makeThumb(photo, i);
      thumb.addEventListener('click', () => openArchive());
      galleryGrid.appendChild(thumb);
    }
  });

  /* -----------------------------------------------------
     6. 전체 사진첩(Archive) 오버레이
  ----------------------------------------------------- */
  const archive = document.getElementById('archive');
  const archiveGrid = document.getElementById('archiveGrid');
  const archiveBack = document.getElementById('archiveBack');
  const archiveClose = document.getElementById('archiveClose');

  photos.forEach((photo, i) => {
    const thumb = makeThumb(photo, i);
    thumb.addEventListener('click', () => openLightbox(i));
    archiveGrid.appendChild(thumb);
  });

  function openArchive() {
    archive.classList.add('is-open');
    archive.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeArchive() {
    archive.classList.remove('is-open');
    archive.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  archiveBack.addEventListener('click', closeArchive);
  archiveClose.addEventListener('click', closeArchive);

  /* -----------------------------------------------------
     7. 라이트박스 (사진 크게 보기)
  ----------------------------------------------------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxFrame = document.getElementById('lightboxFrame');
  const lightboxPlaceholder = document.getElementById('lightboxPlaceholder');
  const lightboxCount = document.getElementById('lightboxCount');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  let currentIndex = 0;

  function pad(n) { return String(n).padStart(2, '0'); }

  function updateLightbox() {
    const photo = photos[currentIndex];
    lightboxImg.src = photo.src;
    lightboxImg.style.display = 'block';
    lightboxPlaceholder.style.display = 'none';
    lightboxImg.onerror = () => {
      lightboxImg.style.display = 'none';
      lightboxPlaceholder.style.display = 'flex';
    };
    lightboxCount.textContent = `${pad(currentIndex + 1)} / ${pad(photos.length)}`;
  }

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightboxFrame.style.transition = 'none';
    lightboxFrame.style.transform = 'translateX(0)';
    lightboxFrame.style.opacity = '1';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = archive.classList.contains('is-open') ? 'hidden' : '';
  }

  // dir: 1(다음) 또는 -1(이전) — 슬라이드 넘기는 모션과 함께 사진 전환
  let isSliding = false;
  function changeSlide(dir) {
    if (isSliding) return;
    isSliding = true;
    lightboxFrame.style.transition = 'transform 0.28s ease, opacity 0.28s ease';
    lightboxFrame.style.transform = `translateX(${dir * -36}px)`;
    lightboxFrame.style.opacity = '0';
    setTimeout(() => {
      currentIndex = (currentIndex + dir + photos.length) % photos.length;
      updateLightbox();
      lightboxFrame.style.transition = 'none';
      lightboxFrame.style.transform = `translateX(${dir * 36}px)`;
      lightboxFrame.style.opacity = '0';
      void lightboxFrame.offsetWidth; // 강제 리플로우로 트랜지션 재시작
      lightboxFrame.style.transition = 'transform 0.28s ease, opacity 0.28s ease';
      lightboxFrame.style.transform = 'translateX(0)';
      lightboxFrame.style.opacity = '1';
      setTimeout(() => { isSliding = false; }, 280);
    }, 280);
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => changeSlide(-1));
  lightboxNext.addEventListener('click', () => changeSlide(1));
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'ArrowRight') changeSlide(1);
  });

  // 모바일 스와이프로 사진 넘기기
  let touchStartX = 0;
  let touchStartY = 0;
  const lightboxStage = document.querySelector('.lightbox__stage');
  lightboxStage.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  }, { passive: true });
  lightboxStage.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      changeSlide(dx < 0 ? 1 : -1);
    }
  }, { passive: true });

  /* -----------------------------------------------------
     8. 아코디언 (오시는 길 / 계좌번호)
  ----------------------------------------------------- */
  document.querySelectorAll('[data-accordion-trigger]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion__item');
      const panel = item.querySelector('.accordion__panel');
      const isOpen = item.classList.contains('is-open');

      // 같은 그룹 내 다른 항목 닫기
      const group = item.closest('.accordion');
      group.querySelectorAll('.accordion__item').forEach(other => {
        other.classList.remove('is-open');
        other.querySelector('.accordion__panel').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('is-open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* -----------------------------------------------------
     9. 토스트 메시지
  ----------------------------------------------------- */
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 1800);
  }

  /* -----------------------------------------------------
     10. 계좌번호 복사
  ----------------------------------------------------- */
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
        showToast('계좌번호가 복사되었습니다');
      } catch (err) {
        showToast('복사에 실패했어요. 직접 입력해주세요');
      }
    });
  });

  /* -----------------------------------------------------
     11. 공유하기 (Web Share API + 링크 복사)
  ----------------------------------------------------- */
  const shareBtn = document.getElementById('shareBtn');
  const copyLinkBtn = document.getElementById('copyLinkBtn');
  const shareData = {
    title: '영준 ♥ 은주 결혼식에 초대합니다',
    text: '2026.12.26 (토) 오후 2시 · 포스코센터 4층 서관 아트홀',
    url: window.location.href,
  };

  shareBtn.addEventListener('click', async () => {
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) { /* 사용자가 취소한 경우 무시 */ }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        showToast('링크가 복사되었습니다');
      } catch (err) {
        showToast('공유하기가 지원되지 않는 환경이에요');
      }
    }
  });

  copyLinkBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('링크가 복사되었습니다');
    } catch (err) {
      showToast('복사에 실패했어요');
    }
  });

  /* -----------------------------------------------------
     12. 배경음악 토글
     assets/bgm/song.mp3 파일을 넣으면 재생됩니다.
  ----------------------------------------------------- */
  const bgm = document.getElementById('bgm');
  const bgmToggle = document.getElementById('bgmToggle');
  let isPlaying = false;

  bgmToggle.addEventListener('click', async () => {
    if (!isPlaying) {
      try {
        await bgm.play();
        isPlaying = true;
        bgmToggle.classList.add('is-playing');
      } catch (err) {
        showToast('배경음악 파일을 assets/bgm/song.mp3 에 추가해주세요');
      }
    } else {
      bgm.pause();
      isPlaying = false;
      bgmToggle.classList.remove('is-playing');
    }
  });

  // openArchive는 index 인자 없이 항상 처음부터 보여줌 (위에서 호출 시 참조)
  window.openArchive = openArchive;
});
