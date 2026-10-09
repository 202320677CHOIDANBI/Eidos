/* =========================================
   EIDOS OFFICIAL WEBSITE
   SCRIPT.JS
========================================= */

/* =========================================
   01 MEMBER INFORMATION
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

/* =========================================
   02 OPEN MEMBER
========================================= */

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
   03 CONCEPT PHOTO DATA

   실제 이미지 파일명 적용
========================================= */

const conceptPhotos = [
  /* CONCEPT 01 - 6 PHOTOS */
  [
    'images/concept1_1.png',
    'images/concept1_2.jpeg',
    'images/concept1_3.png',
    'images/concept1_5.png',
    'images/concept1_6.jpeg',
    'images/concept1_7.png',
  ],

  /* CONCEPT 02 - 2 PHOTOS */
  ['images/concept2_1.png', 'images/concept2_2.png'],

  /* CONCEPT 03 - 1 PHOTO */
  ['images/concept3_1.png'],
];

/* =========================================
   04 CONCEPT PHOTO SYSTEM
========================================= */

const conceptTabs = document.querySelectorAll('.concept-tab');
const conceptTrack = document.getElementById('conceptTrack');

function changeConcept(index) {
  if (!conceptTrack || !conceptPhotos[index]) return;

  /* 선택한 콘셉트 버튼 활성화 */

  conceptTabs.forEach((tab, i) => {
    tab.classList.toggle('active', i === index);
  });

  /* 기존 사진 삭제 */

  conceptTrack.innerHTML = '';

  /* 선택한 콘셉트 사진 표시 */

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

  /* 갤러리 스크롤 초기화 */

  conceptTrack.scrollLeft = 0;
}

/* =========================================
   05 CONCEPT BUTTON EVENT
========================================= */

conceptTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const index = Number(tab.dataset.concept);
    changeConcept(index);
  });
});

/* 첫 번째 콘셉트 기본 표시 */

changeConcept(0);

/* =========================================
   06 REAL-TIME LYRICS DATA

   [시작 시간(초), 가사]

   아래 시간은 임시 싱크입니다.
   괄호 속 MV 연출 설명은 제외했습니다.
========================================= */

const lyrics = [
  /* VERSE 1 */

  [0, ''],
  [4, '은근히 푸석한날'],
  [9, '어제로 돌아갔나 내 지난 새벽은 그렇게도 반짝이던가'],
  [15, '오늘은 나아가겠다고 다짐했던 말'],
  [20, '또 헤매어 혼자'],

  /* PRE-CHORUS 1 */

  [25, '그때부터였나 특별하게 다가왔지만'],
  [30, '애써 난 모른척했지 다'],
  [35, '내가 이상할까 전부 비슷한가'],
  [39, '전부 알고싶지만'],

  /* HOOK 1 */

  [43, 'how can i know'],
  [46, '워우워우워우워워우워우워'],
  [49, '워우워우워우워워우워우워'],
  [52, '워우워우워우워워우워우워'],
  [55, '스쳐 지나간 기억을 되돌려서'],
  [60, '워우워우워우워워우워우워'],
  [64, '불행히 평범했던 날을'],
  [68, '따라간 너의 두얼굴속 내모습'],

  /* VERSE 2 */

  [74, '먼발치 넘어 매일옆에'],
  [78, '웃었던 모습 기억해 근데 그 모습 넘어에'],
  [84, 'We need to run and run away'],
  [89, '잠겨있는 새장 안속에 있었던 모두 그건 내 착각인걸까'],

  /* PRE-CHORUS 2 */

  [97, '그때부터였나 특별하게 다가왔지 만'],
  [102, '애써 난 모른척했지 다'],
  [107, '내가 이상할까 전부 비슷한가 전부 알고싶지만'],

  /* HOOK 2 */

  [114, 'how can i know'],
  [117, '워우워우워우워워우워우워'],
  [120, '워우워우워우워워우워우워'],
  [123, '워우워우워우워워우워우워'],
  [126, '스쳐 지나간 기억을 되돌려서'],
  [132, '워우워우워우워워우워우워'],
  [137, '불행히 평범했던 날을'],
  [142, '따라간 너의 두얼굴속 내모습'],
];

/* =========================================
   07 MUSIC PLAYER ELEMENTS
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
   08 FORMAT MUSIC TIME
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
   09 FIND CURRENT LYRIC
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
   10 UPDATE LYRICS
========================================= */

let lastLyricIndex = -2;

function updateLyrics() {
  if (!bgMusic || !lyricCurrent) return;

  const index = findCurrentLyricIndex(bgMusic.currentTime);

  if (index === lastLyricIndex) return;

  lastLyricIndex = index;

  /* 첫 가사 시작 전 */

  if (index < 0 || !lyrics[index][1]) {
    if (lyricPrev) {
      lyricPrev.textContent = '';
    }

    lyricCurrent.textContent = bgMusic.paused ? 'LISTEN NOW →' : 'EIDOS';

    if (lyricNext) {
      lyricNext.textContent = lyrics[1]?.[1] || '';
    }

    return;
  }

  /* 이전 가사 */

  if (lyricPrev) {
    lyricPrev.textContent = lyrics[index - 1]?.[1] || '';
  }

  /* 현재 가사 */

  lyricCurrent.textContent = lyrics[index][1];

  /* 다음 가사 */

  if (lyricNext) {
    lyricNext.textContent = lyrics[index + 1]?.[1] || '';
  }
}

/* =========================================
   11 UPDATE MUSIC PROGRESS
========================================= */

function updateMusicProgress() {
  if (!bgMusic) return;

  const current = bgMusic.currentTime;
  const duration = bgMusic.duration;

  /* 현재 재생 시간 */

  if (currentTimeElement) {
    currentTimeElement.textContent = formatMusicTime(current);
  }

  /* 전체 재생 시간 */

  if (durationElement) {
    durationElement.textContent = formatMusicTime(duration);
  }

  /* 진행 바 */

  if (progressFill) {
    const percent =
      Number.isFinite(duration) && duration > 0
        ? (current / duration) * 100
        : 0;

    progressFill.style.width = `${Math.max(0, Math.min(100, percent))}%`;
  }
}

/* =========================================
   12 EIDOS MUSIC PLAYER
========================================= */

if (bgMusic && musicButton) {
  /* MUSIC SETTINGS */

  bgMusic.volume = 0.7;
  bgMusic.autoplay = false;
  bgMusic.loop = true;

  /* PLAY / PAUSE BUTTON */

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

  /* MUSIC PLAY EVENT */

  bgMusic.addEventListener('play', () => {
    musicButton.textContent = 'PAUSE MUSIC ❚❚';
    musicButton.setAttribute('aria-pressed', 'true');

    lastLyricIndex = -2;

    updateLyrics();
    updateMusicProgress();
  });

  /* MUSIC PAUSE EVENT */

  bgMusic.addEventListener('pause', () => {
    musicButton.textContent = 'LISTEN NOW →';
    musicButton.setAttribute('aria-pressed', 'false');

    updateMusicProgress();
  });

  /* MUSIC METADATA */

  bgMusic.addEventListener('loadedmetadata', () => {
    updateMusicProgress();
  });

  /* MUSIC TIME UPDATE */

  bgMusic.addEventListener('timeupdate', () => {
    updateLyrics();
    updateMusicProgress();
  });

  /* MUSIC SEEK EVENT */

  bgMusic.addEventListener('seeked', () => {
    lastLyricIndex = -2;

    updateLyrics();
    updateMusicProgress();
  });

  /* MUSIC END EVENT */

  bgMusic.addEventListener('ended', () => {
    musicButton.textContent = 'LISTEN NOW →';
    musicButton.setAttribute('aria-pressed', 'false');

    lastLyricIndex = -2;

    updateLyrics();
    updateMusicProgress();
  });

  /* MUSIC ERROR EVENT */

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
