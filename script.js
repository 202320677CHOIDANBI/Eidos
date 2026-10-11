/* =========================================
   EIDOS OFFICIAL WEBSITE
   APPLE MUSIC STYLE
   CHARACTER BY CHARACTER LYRICS
========================================= */

/* =========================================
   1. MEMBERS
========================================= */

function openMember(index) {
  const members = [...document.querySelectorAll('.member')];

  const selected = members[index];

  if (!selected) return;

  const wasActive = selected.classList.contains('active');

  members.forEach((member) => {
    member.classList.remove('active');
  });

  if (!wasActive) {
    selected.classList.add('active');
  }
}

/* =========================================
   2. CONCEPT PHOTOS
========================================= */

const conceptPhotos = [
  [
    'images/concept1_1.png',
    'images/concept1_2.jpeg',
    'images/concept1_3.png',
    'images/concept1_5.png',
    'images/concept1_6.jpeg',
    'images/concept1_7.png',
  ],
  ['images/concept2_1.png', 'images/concept2_2.png'],
  ['images/concept3_1.png'],
];

function changeConcept(index) {
  const gallery = document.getElementById('conceptTrack');

  const tabs = [...document.querySelectorAll('.concept-tab')];

  if (!gallery || !conceptPhotos[index]) {
    return;
  }

  closeConceptLightbox();

  gallery.replaceChildren();

  conceptPhotos[index].forEach((src, i) => {
    const photo = document.createElement('div');

    photo.className = 'concept-photo';
    photo.tabIndex = 0;

    photo.setAttribute('role', 'button');

    photo.setAttribute('aria-label', `콘셉트 사진 ${i + 1} 확대`);

    const image = document.createElement('img');

    image.src = src;

    image.alt = `EIDOS Concept ${index + 1} Photo ${i + 1}`;

    image.loading = 'lazy';

    photo.appendChild(image);
    gallery.appendChild(photo);
  });

  tabs.forEach((tab, i) => {
    tab.classList.toggle('active', i === index);

    tab.setAttribute('aria-selected', String(i === index));
  });

  gallery.scrollLeft = 0;
}

/* =========================================
   3. CONCEPT LIGHTBOX
========================================= */

let lightboxIndex = 0;
let lightboxImages = [];

let lightboxLastFocus = null;
let lightboxOldOverflow = '';

function getConceptLightbox() {
  let modal = document.getElementById('conceptLightbox');

  if (modal) return modal;

  modal = document.createElement('div');

  modal.id = 'conceptLightbox';
  modal.className = 'concept-lightbox';

  modal.setAttribute('role', 'dialog');

  modal.setAttribute('aria-modal', 'true');

  modal.setAttribute('aria-label', '콘셉트 사진 확대 보기');

  modal.innerHTML = `
    <button
      class="lightbox-close"
      type="button"
      aria-label="사진 닫기"
    >×</button>

    <button
      class="lightbox-prev"
      type="button"
      aria-label="이전 사진"
    >‹</button>

    <img
      class="lightbox-image"
      alt="EIDOS Concept Photo"
    >

    <button
      class="lightbox-next"
      type="button"
      aria-label="다음 사진"
    >›</button>

    <span
      class="lightbox-counter"
      aria-live="polite"
    ></span>
  `;

  document.body.appendChild(modal);

  modal
    .querySelector('.lightbox-close')
    .addEventListener('click', closeConceptLightbox);

  modal
    .querySelector('.lightbox-prev')
    .addEventListener('click', () => moveConceptLightbox(-1));

  modal
    .querySelector('.lightbox-next')
    .addEventListener('click', () => moveConceptLightbox(1));

  modal
    .querySelector('.lightbox-image')
    .addEventListener('click', closeConceptLightbox);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeConceptLightbox();
    }
  });

  return modal;
}

function showConceptLightboxPhoto() {
  const modal = getConceptLightbox();

  const source = lightboxImages[lightboxIndex];

  if (!source) return;

  const image = modal.querySelector('.lightbox-image');

  image.src = source.currentSrc || source.src;

  image.alt = source.alt || 'EIDOS Concept Photo';

  modal.querySelector('.lightbox-counter').textContent =
    `${lightboxIndex + 1} / ${lightboxImages.length}`;
}

function openConceptLightbox(index) {
  lightboxImages = [
    ...document.querySelectorAll('#conceptTrack .concept-photo img'),
  ];

  if (!lightboxImages[index]) return;

  lightboxIndex = index;

  lightboxLastFocus = document.activeElement;

  lightboxOldOverflow = document.body.style.overflow;

  const modal = getConceptLightbox();

  showConceptLightboxPhoto();

  modal.classList.add('active');

  document.body.classList.add('concept-lightbox-open');

  document.body.style.overflow = 'hidden';

  modal.querySelector('.lightbox-close').focus();
}

function moveConceptLightbox(direction) {
  if (!lightboxImages.length) return;

  lightboxIndex =
    (lightboxIndex + direction + lightboxImages.length) % lightboxImages.length;

  showConceptLightboxPhoto();
}

function closeConceptLightbox() {
  const modal = document.getElementById('conceptLightbox');

  if (!modal || !modal.classList.contains('active')) {
    return;
  }

  modal.classList.remove('active');

  document.body.classList.remove('concept-lightbox-open');

  document.body.style.overflow = lightboxOldOverflow;

  if (lightboxLastFocus?.isConnected) {
    lightboxLastFocus.focus({
      preventScroll: true,
    });
  }
}

document.addEventListener('click', (event) => {
  const photo = event.target.closest('#conceptTrack .concept-photo');

  if (!photo) return;

  const photos = [...document.querySelectorAll('#conceptTrack .concept-photo')];

  openConceptLightbox(photos.indexOf(photo));
});

document.addEventListener('keydown', (event) => {
  const modal = document.getElementById('conceptLightbox');

  if (modal?.classList.contains('active')) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeConceptLightbox();
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveConceptLightbox(-1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveConceptLightbox(1);
    }

    if (event.key === 'Tab') {
      const buttons = [...modal.querySelectorAll('button')];

      const first = buttons[0];
      const last = buttons[buttons.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    return;
  }

  const photo = event.target.closest('#conceptTrack .concept-photo');

  if (photo && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();

    const photos = [
      ...document.querySelectorAll('#conceptTrack .concept-photo'),
    ];

    openConceptLightbox(photos.indexOf(photo));
  }
});

/* =========================================
   4. HOW CAN I KNOW LYRICS
========================================= */

const lyrics = [
  [38.2, '은근히 푸석한 날'],
  [40.66, '어제로 돌아갔나'],
  [43.3, '내 지난 새벽은 그렇게도 반짝이던가'],
  [47.07, '오늘은 나아가겠다고 다짐했던 말'],
  [51.83, '또 헤매어 혼자'],
  [53.98, '그때부터였나'],
  [57.2, '특별하게 다가왔지만'],
  [60.63, '애써 난 모른 척했지 다'],
  [64.33, '내가 이상할까 전부 비슷한가'],
  [69.33, '전부 난 알고 싶지만'],
  [71.51, 'HOW CAN I KNOW'],
  [73.02, 'Whoa-oh-oh-oh-oh-oh'],
  [74.5, 'Whoa-oh-oh-oh-oh-oh'],
  [76.56, 'Whoa-oh-oh-oh-oh-oh'],
  [78.62, '스쳐 지나간 기억을 되돌려서'],
  [81.4, 'Whoa-oh-oh-oh-oh-oh'],
  [83.95, '불행히 평범했던 날을'],
  [87.02, '따라간 너의 두 얼굴 속 내 모습'],
  [89.29, '먼발치 넘어 매일 옆에'],
  [91.22, '웃었던 모습 기억해'],
  [94.2, '근데 그 노을 너머에'],
  [96.1, '(넘어간 노을 너머에)'],
  [98.32, 'We need to run and run away'],
  [99.85, '잠겨있는 새장 안 속에 있었던 모두'],
  [103.2, '그건 내 착각인걸까'],
  [106.41, '그때부터였나 특별하게 다가왔지만'],
  [112.76, '애써 난 모른 척했지 다'],
  [116.74, '내가 이상할까 전부 비슷한가'],
  [120.3, '전부 난 알고 싶지만'],
  [123.88, 'HOW CAN I KNOW'],
  [125.14, 'Whoa-oh-oh-oh-oh-oh'],
  [126.74, 'Whoa-oh-oh-oh-oh-oh'],
  [128.81, 'Whoa-oh-oh-oh-oh-oh'],
  [130.97, '스쳐 지나간 기억을 되돌려서'],
  [133.23, 'Whoa-oh-oh-oh-oh-oh'],
  [136.28, '불행히 평범했던 날을'],
  [139.43, '따라간 너의 두 얼굴 속 내 모습'],
];

/* =========================================
   5. MUSIC SETTINGS
========================================= */

const LYRIC_SYNC_OFFSET = 0;

const INSTRUMENTAL_SECTIONS = [
  {
    start: 0,
    end: 38.2,
    label: 'SKIP INTRO →',
  },
];

/*
  글자별 시간 수동 보정

  기본적으로 한 줄의 시간을
  글자 수에 맞춰 나누지만,

  실제 보컬 타이밍을 알면
  아래에 직접 입력할 수 있어.

  예시:

  10: [
    [71.51, 71.65],
    [71.65, 71.78],
    ...
  ]

  공백을 제외한 모든 글자의
  시작 시간과 종료 시간을 순서대로 입력.
*/

const wordTimingOverrides = {};

/* =========================================
   6. MUSIC VARIABLES
========================================= */

let audio = null;
let musicButton = null;

let lyricsContainer = null;
let lyricsDisplay = null;

let introVisualizer = null;

let viewport = null;
let lyricsTrack = null;
let skipButton = null;

let lyricElements = [];

let activeIndex = -2;

let frame = null;

let musicStarted = false;

/* =========================================
   7. CURRENT LYRIC INDEX
========================================= */

function currentLyricIndex(time) {
  let result = -1;

  for (let i = 0; i < lyrics.length; i++) {
    if (time >= lyrics[i][0]) {
      result = i;
    } else {
      break;
    }
  }

  return result;
}

/* =========================================
   8. CHARACTER BY CHARACTER TIMING
========================================= */

function getWordTimings(index) {
  const [start, text] = lyrics[index];

  const end =
    lyrics[index + 1]?.[0] ?? Math.min(audio?.duration || start + 5, start + 5);

  const characters = Array.from(text);

  const visibleCharacters = characters.filter((char) => !/\s/.test(char));

  const override = wordTimingOverrides[index];

  /*
    수동으로 입력한 글자별 타이밍이
    있으면 해당 시간을 사용.
  */

  if (override && override.length === visibleCharacters.length) {
    let n = 0;

    return characters.map((char) => {
      if (/\s/.test(char)) {
        return {
          text: char,
          space: true,
        };
      }

      const timing = override[n++];

      return {
        text: char,
        start: timing[0],
        end: timing[1],
      };
    });
  }

  /*
    수동 타이밍이 없으면
    한 글자씩 균등하게 시간 배분.
  */

  const duration = Math.max(0.01, end - start);

  const characterDuration = duration / Math.max(1, visibleCharacters.length);

  let cursor = start;

  return characters.map((char) => {
    if (/\s/.test(char)) {
      return {
        text: char,
        space: true,
      };
    }

    const result = {
      text: char,
      start: cursor,
      end: cursor + characterDuration,
    };

    cursor += characterDuration;

    return result;
  });
}

/* =========================================
   9. CREATE CHARACTER ELEMENTS
========================================= */

function makeCharacters(text, index) {
  const fragment = document.createDocumentFragment();

  const timings = getWordTimings(index);

  timings.forEach((character) => {
    if (character.space) {
      fragment.appendChild(document.createTextNode(character.text));

      return;
    }

    const span = document.createElement('span');

    span.className = 'lyric-word lyric-character';

    span.dataset.start = String(character.start);

    span.dataset.end = String(character.end);

    span.style.setProperty('--word-progress', '0%');

    span.textContent = character.text;

    fragment.appendChild(span);
  });

  return fragment;
}

/* =========================================
   10. CREATE LYRICS UI
========================================= */

function createLyricUI() {
  if (!lyricsDisplay) return;

  viewport = document.getElementById('lyricsViewport');

  lyricsTrack = document.getElementById('lyricsTrack');

  if (!viewport) {
    viewport = document.createElement('div');

    viewport.id = 'lyricsViewport';

    viewport.className = 'lyrics-viewport';

    lyricsDisplay.appendChild(viewport);
  }

  if (!lyricsTrack) {
    lyricsTrack = document.createElement('div');

    lyricsTrack.id = 'lyricsTrack';

    lyricsTrack.className = 'lyrics-track';

    viewport.appendChild(lyricsTrack);
  }

  lyricsTrack.replaceChildren();

  lyricElements = lyrics.map(([time, text], index) => {
    const line = document.createElement('p');

    line.className = 'lyric-item upcoming';

    line.tabIndex = 0;

    line.setAttribute('role', 'button');

    line.setAttribute('aria-label', `${text}, 해당 가사부터 재생`);

    line.appendChild(makeCharacters(text, index));

    line.addEventListener('click', () => seekToLyric(index));

    line.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();

        seekToLyric(index);
      }
    });

    lyricsTrack.appendChild(line);

    return line;
  });
}

/* =========================================
   11. SEEK TO LYRIC
========================================= */

function seekToLyric(index) {
  if (!audio || !lyrics[index]) {
    return;
  }

  audio.currentTime = Math.max(0, lyrics[index][0] - LYRIC_SYNC_OFFSET);

  showMusicContent();

  updateLyrics(true);

  audio.play().catch((error) => {
    console.warn('Music playback blocked:', error);
  });
}

/* =========================================
   12. CENTER ACTIVE LYRIC
========================================= */

function centerLine(index) {
  if (!viewport || !lyricsTrack || index < 0 || !lyricElements[index]) {
    return;
  }

  const line = lyricElements[index];

  const lineCenter = line.offsetTop + line.offsetHeight / 2;

  const translateY = viewport.clientHeight / 2 - lineCenter;

  lyricsTrack.style.transform = `translateY(${translateY}px)`;
}

/* =========================================
   13. UPDATE CHARACTER ANIMATION
========================================= */

function updateCharacters(index, time) {
  const line = lyricElements[index];

  if (!line || !audio) {
    return;
  }

  const characters = line.querySelectorAll('.lyric-character');

  characters.forEach((character) => {
    const start = Number(character.dataset.start);

    const end = Number(character.dataset.end);

    const duration = Math.max(0.01, end - start);

    /*
      현재 음악 시간에 맞춰
      각 글자의 진행률 계산.
    */

    const progress = Math.max(0, Math.min(1, (time - start) / duration));

    /*
      글자별로 0% → 100% 채우기.
    */

    character.style.setProperty(
      '--word-progress',
      `${(progress * 100).toFixed(2)}%`,
    );

    /*
      현재 발음 중인 글자에만
      부드러운 움직임 적용.
    */

    const isActive = progress > 0 && progress < 1 && !audio.paused;

    character.classList.toggle('is-active', isActive);
  });
}

/* =========================================
   14. SHOW MUSIC CONTENT
========================================= */

function showMusicContent() {
  musicStarted = true;

  if (lyricsContainer) {
    lyricsContainer.classList.add('music-started');
  }
}

/* =========================================
   15. SKIP INTRO
========================================= */

function updateSkipButton(time) {
  if (!skipButton) return;

  const section = INSTRUMENTAL_SECTIONS.find(
    (item) => time >= item.start && time < item.end - 0.3,
  );

  const visible = musicStarted && Boolean(section);

  skipButton.hidden = !visible;

  skipButton.style.display = visible ? 'inline-block' : 'none';

  if (section && visible) {
    skipButton.textContent = section.label;

    skipButton.dataset.target = String(section.end);
  } else {
    delete skipButton.dataset.target;
  }
}

/* =========================================
   16. UPDATE ALL LYRICS
========================================= */

function updateLyrics(force = false) {
  if (!audio) return;

  const time = audio.currentTime + LYRIC_SYNC_OFFSET;

  const index = currentLyricIndex(time);

  const isIntro = index < 0;

  /*
    INTRO 상태
  */

  if (lyricsDisplay) {
    lyricsDisplay.classList.toggle('is-intro', isIntro);
  }

  /*
    INTRO VISUALIZER
  */

  if (introVisualizer) {
    introVisualizer.classList.toggle('is-visible', isIntro && musicStarted);

    introVisualizer.classList.toggle(
      'is-playing',
      isIntro && musicStarted && !audio.paused,
    );
  }

  /*
    가사 영역 표시
  */

  if (viewport) {
    viewport.style.opacity = isIntro ? '0' : '1';

    viewport.style.visibility = isIntro ? 'hidden' : 'visible';

    viewport.style.pointerEvents = isIntro ? 'none' : 'auto';
  }

  updateSkipButton(time);

  /*
    현재 가사가 바뀌면
    중앙 스크롤 및 상태 갱신.
  */

  if (index !== activeIndex || force) {
    activeIndex = index;

    lyricElements.forEach((line, i) => {
      line.classList.toggle('active', i === index);

      line.classList.toggle('passed', i < index);

      line.classList.toggle('upcoming', i > index);

      /*
          이전 가사 글자는 100%,
          다음 가사는 0%로 설정.
        */

      line.querySelectorAll('.lyric-character').forEach((character) => {
        character.style.setProperty(
          '--word-progress',
          i < index ? '100%' : '0%',
        );

        character.classList.remove('is-active');
      });
    });

    centerLine(index);
  }

  /*
    현재 줄은
    한 글자씩 실시간 업데이트.
  */

  if (index >= 0) {
    updateCharacters(index, time);
  }
}

/* =========================================
   17. MUSIC BUTTON
========================================= */

function updateButton() {
  if (!musicButton || !audio) {
    return;
  }

  musicButton.textContent = audio.paused ? 'LISTEN NOW →' : 'PAUSE MUSIC ❚❚';

  musicButton.setAttribute('aria-pressed', String(!audio.paused));
}

/* =========================================
   18. ANIMATION LOOP
========================================= */

function animate() {
  updateLyrics();

  if (audio && !audio.paused && !audio.ended) {
    frame = requestAnimationFrame(animate);
  } else {
    frame = null;
  }
}

function startAnimation() {
  if (frame === null) {
    frame = requestAnimationFrame(animate);
  }
}

function stopAnimation() {
  if (frame !== null) {
    cancelAnimationFrame(frame);
  }

  frame = null;
}

/* =========================================
   19. CREATE SKIP BUTTON
========================================= */

function createSkipButton() {
  if (!lyricsDisplay) return;

  skipButton =
    document.getElementById('skipInstrumentalButton') ||
    document.createElement('button');

  skipButton.id = 'skipInstrumentalButton';

  skipButton.type = 'button';

  skipButton.textContent = 'SKIP INTRO →';

  skipButton.hidden = true;

  skipButton.addEventListener('click', () => {
    if (!audio || !skipButton.dataset.target) {
      return;
    }

    const target = Number(skipButton.dataset.target);

    if (!Number.isFinite(target)) {
      return;
    }

    audio.currentTime = Math.max(0, target - LYRIC_SYNC_OFFSET);

    showMusicContent();

    updateLyrics(true);

    audio.play().catch((error) => {
      console.warn('Music playback blocked:', error);
    });
  });

  lyricsDisplay.appendChild(skipButton);
}

/* =========================================
   20. INITIALIZE EIDOS
========================================= */

function initializeEidos() {
  /*
    CONCEPT TABS
  */

  document.querySelectorAll('.concept-tab').forEach((tab, i) => {
    tab.addEventListener('click', () => {
      changeConcept(Number(tab.dataset.concept ?? i));
    });
  });

  changeConcept(0);

  /*
    MUSIC ELEMENTS
  */

  audio = document.getElementById('eidosMusic');

  musicButton = document.getElementById('musicButton');

  lyricsContainer = document.getElementById('lyricsContainer');

  lyricsDisplay = document.getElementById('lyricsDisplay');

  introVisualizer = document.getElementById('introVisualizer');

  if (!audio) {
    console.warn('EIDOS music audio element not found.');

    return;
  }

  audio.volume = 0.7;

  /*
    CREATE LYRICS
  */

  createLyricUI();

  createSkipButton();

  /*
    MUSIC BUTTON CLICK
  */

  musicButton?.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch((error) => {
        console.warn('Music playback blocked:', error);
      });
    } else {
      audio.pause();
    }
  });

  /*
    AUDIO PLAY
  */

  audio.addEventListener('play', () => {
    showMusicContent();

    updateButton();

    updateLyrics(true);

    startAnimation();
  });

  /*
    AUDIO PAUSE
  */

  audio.addEventListener('pause', () => {
    updateButton();

    updateLyrics();

    stopAnimation();
  });

  /*
    AUDIO SEEK
  */

  audio.addEventListener('seeked', () => {
    updateLyrics(true);
  });

  /*
    AUDIO TIME UPDATE
  */

  audio.addEventListener('timeupdate', () => {
    updateLyrics();
  });

  /*
    AUDIO METADATA
  */

  audio.addEventListener('loadedmetadata', () => {
    updateLyrics(true);
  });

  /*
    AUDIO ENDED
  */

  audio.addEventListener('ended', () => {
    updateButton();

    stopAnimation();
  });

  /*
    WINDOW RESIZE
  */

  window.addEventListener('resize', () => {
    centerLine(activeIndex);
  });

  /*
    INITIAL STATE
  */

  updateButton();

  updateLyrics(true);
}

/* =========================================
   21. DOM READY
========================================= */

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeEidos, {
    once: true,
  });
} else {
  initializeEidos();
}

/* =========================================
   EIDOS SCRIPT.JS END
========================================= */
