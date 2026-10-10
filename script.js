/* =========================================
   EIDOS OFFICIAL WEBSITE
   SCRIPT.JS
========================================= */

/* =========================================
   01. MEMBERS
========================================= */

const members = [
  {
    number: '01',
    name: 'Dayeon',
    position: 'Producer & Main Vocalist',
    info: 'Producer<br>Main Vocalist',
  },
  {
    number: '02',
    name: 'Ion',
    position: 'Main Dancer',
    info: 'Main Dancer',
  },
  {
    number: '03',
    name: 'Lina',
    position: 'Main Vocalist',
    info: 'Main Vocalist',
  },
];

function openMember(index) {
  const elements = document.querySelectorAll('.member');
  const clicked = elements[index];

  if (!clicked) return;

  const alreadyOpen = clicked.classList.contains('active');

  elements.forEach((member) => {
    member.classList.remove('active');
  });

  if (!alreadyOpen) {
    clicked.classList.add('active');
  }
}

/* =========================================
   02. CONCEPT PHOTO DATA
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

/* =========================================
   03. CONCEPT PHOTO SYSTEM
========================================= */

const conceptTabs = document.querySelectorAll('.concept-tab');
const conceptTrack = document.getElementById('conceptTrack');

function changeConcept(index) {
  if (!conceptTrack || !conceptPhotos[index]) return;

  conceptTabs.forEach((tab, i) => {
    tab.classList.toggle('active', i === index);
  });

  conceptTrack.innerHTML = '';

  conceptPhotos[index].forEach((src, photoIndex) => {
    const photo = document.createElement('div');
    photo.className = 'concept-photo';

    const img = document.createElement('img');
    img.src = src;
    img.alt = `Concept ${index + 1} Photo ${photoIndex + 1}`;
    img.loading = 'lazy';

    photo.appendChild(img);
    conceptTrack.appendChild(photo);
  });

  conceptTrack.scrollLeft = 0;
}

conceptTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    changeConcept(Number(tab.dataset.concept));
  });
});

changeConcept(0);

/* =========================================
   04. EIDOS LYRICS

   AI LRC 파일 기준 가사 시간

   첫 가사 시작 전:
   HOW CAN I KNOW 표시

   추가 시간 보정 없음
========================================= */

const lyrics = [
  [38.2, '은근히 푸석한날'],
  [40.66, '어제로 돌아갔나 내 지난 새벽은 그렇게도 반짝이던가'],
  [47.07, '오늘은 나아가겠다고 다짐했던 말'],
  [51.83, '또 헤매어 혼자'],

  [53.98, '그때부터였나 특별하게 다가왔지만'],
  [60.63, '애써 난 모른척했지 다'],
  [64.33, '내가 이상할까 전부 비슷한가'],
  [69.33, '전부 알고싶지만'],

  [71.51, 'how can i know'],
  [73.02, '워우워우워우워워우워우워'],
  [74.5, '워우워우워우워워우워우워'],
  [76.56, '워우워우워우워워우워우워'],
  [78.62, '스쳐 지나간 기억을 되돌려서'],
  [81.4, '워우워우워우워워우워우워'],
  [83.95, '불행히 평범했던 날을'],
  [87.02, '따라간 너의 두얼굴속 내모습'],

  [89.29, '먼발치 넘어 매일옆에'],
  [91.22, '웃었던 모습 기억해 근데 그 모습 넘어에'],
  [98.32, 'We need to run and run away'],
  [99.85, '잠겨있는 새장 안속에 있었던 모두 그건 내 착각인걸까'],

  [106.41, '그때부터였나 특별하게 다가왔지 만'],
  [112.76, '애써 난 모른척했지 다'],
  [116.74, '내가 이상할까 전부 비슷한가 전부 알고싶지만'],

  [123.88, 'how can i know'],
  [125.14, '워우워우워우워워우워우워'],
  [126.74, '워우워우워우워워우워우워'],
  [128.81, '워우워우워우워워우워우워'],
  [130.97, '스쳐 지나간 기억을 되돌려서'],
  [133.23, '워우워우워우워워우워우워'],
  [136.28, '불행히 평범했던 날을'],
  [139.43, '따라간 너의 두얼굴속 내모습'],
];

/* =========================================
   05. MUSIC ELEMENTS
========================================= */

const bgMusic = document.getElementById('eidosMusic');
const musicButton = document.getElementById('musicButton');

const lyricPrev = document.getElementById('lyricPrev');
const lyricCurrent = document.getElementById('lyricCurrent');
const lyricNext = document.getElementById('lyricNext');

const currentTimeElement = document.getElementById('currentTime');
const durationElement = document.getElementById('duration');
const progressFill = document.getElementById('progressFill');

/* =========================================
   06. FORMAT MUSIC TIME
========================================= */

function formatMusicTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00';
  }

  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);

  return `${minutes}:${String(remaining).padStart(2, '0')}`;
}

/* =========================================
   07. FIND CURRENT LYRIC
========================================= */

function findCurrentLyricIndex(time) {
  let index = -1;

  for (let i = 0; i < lyrics.length; i++) {
    if (time >= lyrics[i][0]) {
      index = i;
    } else {
      break;
    }
  }

  return index;
}

/* =========================================
   08. UPDATE LYRICS

   첫 가사 시작 전:
   HOW CAN I KNOW

   첫 가사 시작 후:
   현재 가사 자동 표시
========================================= */

let lastLyricIndex = -2;

function updateLyrics() {
  if (!bgMusic || !lyricCurrent) return;

  const currentTime = bgMusic.currentTime;
  const index = findCurrentLyricIndex(currentTime);

  if (index === lastLyricIndex) return;

  lastLyricIndex = index;

  /* 첫 가사 시작 전 */

  if (index === -1) {
    if (lyricPrev) {
      lyricPrev.textContent = '';
    }

    lyricCurrent.textContent = 'HOW CAN I KNOW';

    if (lyricNext) {
      lyricNext.textContent = '';
    }

    return;
  }

  /* 이전 가사 */

  if (lyricPrev) {
    lyricPrev.textContent = index > 0 ? lyrics[index - 1][1] : '';
  }

  /* 현재 가사 */

  lyricCurrent.textContent = lyrics[index][1];

  /* 다음 가사 */

  if (lyricNext) {
    lyricNext.textContent =
      index < lyrics.length - 1 ? lyrics[index + 1][1] : '';
  }
}

/* =========================================
   09. MUSIC PROGRESS
========================================= */

function updateMusicProgress() {
  if (!bgMusic) return;

  const current = bgMusic.currentTime;
  const duration = bgMusic.duration;

  if (currentTimeElement) {
    currentTimeElement.textContent = formatMusicTime(current);
  }

  if (durationElement) {
    durationElement.textContent = formatMusicTime(duration);
  }

  if (progressFill) {
    const percent =
      Number.isFinite(duration) && duration > 0
        ? (current / duration) * 100
        : 0;

    progressFill.style.width = `${Math.max(0, Math.min(100, percent))}%`;
  }
}

/* =========================================
   10. MUSIC PLAYER
========================================= */

if (bgMusic && musicButton) {
  bgMusic.volume = 0.7;
  bgMusic.autoplay = false;
  bgMusic.loop = true;

  /* PLAY / PAUSE */

  musicButton.addEventListener('click', async () => {
    if (bgMusic.paused) {
      try {
        await bgMusic.play();
      } catch (error) {
        console.error('Music playback failed:', error);
      }
    } else {
      bgMusic.pause();
    }
  });

  /* PLAY EVENT */

  bgMusic.addEventListener('play', () => {
    musicButton.textContent = 'PAUSE MUSIC ❚❚';
    musicButton.setAttribute('aria-pressed', 'true');

    lastLyricIndex = -2;

    updateLyrics();
    updateMusicProgress();
  });

  /* PAUSE EVENT */

  bgMusic.addEventListener('pause', () => {
    musicButton.textContent = 'LISTEN NOW →';
    musicButton.setAttribute('aria-pressed', 'false');

    updateMusicProgress();
  });

  /* AUDIO METADATA */

  bgMusic.addEventListener('loadedmetadata', () => {
    updateMusicProgress();
  });

  /* AUDIO TIME UPDATE */

  bgMusic.addEventListener('timeupdate', () => {
    updateLyrics();
    updateMusicProgress();
  });

  /* AUDIO SEEK */

  bgMusic.addEventListener('seeked', () => {
    lastLyricIndex = -2;

    updateLyrics();
    updateMusicProgress();
  });

  /* LOOP RESTART */

  bgMusic.addEventListener('timeupdate', () => {
    if (bgMusic.currentTime < 0.5 && lastLyricIndex >= 0) {
      lastLyricIndex = -2;
      updateLyrics();
    }
  });

  /* AUDIO ENDED */

  bgMusic.addEventListener('ended', () => {
    musicButton.textContent = 'LISTEN NOW →';
    musicButton.setAttribute('aria-pressed', 'false');

    lastLyricIndex = -2;

    updateLyrics();
    updateMusicProgress();
  });

  /* AUDIO ERROR */

  bgMusic.addEventListener('error', () => {
    console.error('Eidos music file could not be loaded.');

    musicButton.textContent = 'LISTEN NOW →';
    musicButton.setAttribute('aria-pressed', 'false');

    if (lyricCurrent) {
      lyricCurrent.textContent = '음원 파일을 확인해 주세요.';
    }
  });

  /* INITIAL DISPLAY */

  updateMusicProgress();
  updateLyrics();
}

/* =========================================
   EIDOS SCRIPT END
========================================= */
