/* =========================================
   EIDOS OFFICIAL WEBSITE
   SCRIPT.JS

   LYRIC SYNC: 1 SECOND EARLIER
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
   04. LYRIC SYNC SETTINGS
========================================= */

/*
  전체 가사 싱크 보정값

  0 = 원래 시간
  1 = 1초 빠르게 표시
  2 = 2초 빠르게 표시
  3 = 3초 빠르게 표시

  현재 설정: 1초 보정

  이전 2초 보정에서 가사가
  약 1초 빨랐으므로 1로 변경.
*/

const LYRIC_SYNC_OFFSET = 1;

/* =========================================
   05. EIDOS LYRICS
   HOW CAN I KNOW
========================================= */

const lyrics = [
  /* VERSE 1 */

  [38.2, '은근히 푸석한 날'],
  [40.66, '어제로 돌아갔나'],
  [43.3, '내 지난 새벽은 그렇게도 반짝이던가'],
  [47.07, '오늘은 나아가겠다고 다짐했던 말'],
  [51.83, '또 헤매어 혼자'],

  /* PRE-CHORUS 1 */

  [53.98, '그때부터였나'],
  [57.2, '특별하게 다가왔지만'],
  [60.63, '애써 난 모른 척했지 다'],
  [64.33, '내가 이상할까 전부 비슷한가'],
  [69.33, '전부 난 알고 싶지만'],

  /* CHORUS 1 */

  [71.51, 'HOW CAN I KNOW'],
  [73.02, 'Whoa-oh-oh-oh-oh-oh'],
  [74.5, 'Whoa-oh-oh-oh-oh-oh'],
  [76.56, 'Whoa-oh-oh-oh-oh-oh'],
  [78.62, '스쳐 지나간 기억을 되돌려서'],
  [81.4, 'Whoa-oh-oh-oh-oh-oh'],
  [83.95, '불행히 평범했던 날을'],
  [87.02, '따라간 너의 두 얼굴 속 내 모습'],

  /* VERSE 2 */

  [89.29, '먼발치 넘어 매일 옆에'],
  [91.22, '웃었던 모습 기억해'],
  [94.2, '근데 그 노을 너머에'],
  [96.1, '(넘어간 노을 너머에)'],
  [98.32, 'We need to run and run away'],
  [99.85, '잠겨있는 새장 안 속에 있었던 모두'],
  [103.2, '그건 내 착각인걸까'],

  /* PRE-CHORUS 2 */

  [106.41, '그때부터였나 특별하게 다가왔지만'],
  [112.76, '애써 난 모른 척했지 다'],
  [116.74, '내가 이상할까 전부 비슷한가'],
  [120.3, '전부 난 알고 싶지만'],

  /* CHORUS 2 */

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
   06. MUSIC ELEMENTS
========================================= */

const bgMusic = document.getElementById('eidosMusic');
const musicButton = document.getElementById('musicButton');

const lyricPrev = document.getElementById('lyricPrev');
const lyricCurrent = document.getElementById('lyricCurrent');
const lyricNext = document.getElementById('lyricNext');

const lyricsDisplay = document.getElementById('lyricsDisplay');
const introVisualizer = document.getElementById('introVisualizer');

const currentTimeElement = document.getElementById('currentTime');
const durationElement = document.getElementById('duration');
const progressFill = document.getElementById('progressFill');

/* =========================================
   07. FORMAT MUSIC TIME
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
   08. FIND CURRENT LYRIC
========================================= */

function findCurrentLyricIndex(time) {
  let index = -1;

  /* 가사를 1초 빠르게 표시 */

  const adjustedTime = time + LYRIC_SYNC_OFFSET;

  for (let i = 0; i < lyrics.length; i++) {
    if (adjustedTime >= lyrics[i][0]) {
      index = i;
    } else {
      break;
    }
  }

  return index;
}

/* =========================================
   09. SOUND BAR CONTROL
========================================= */

/*
  재생 전: 숨김
  전주 재생 중: 표시
  일시정지: 숨김
  첫 가사 시작: 숨김
*/

function updateIntroVisualizer(isIntro) {
  if (!bgMusic) return;

  const isPlaying = !bgMusic.paused && !bgMusic.ended;
  const showSoundBar = isIntro && isPlaying;

  if (introVisualizer) {
    introVisualizer.classList.toggle('is-visible', showSoundBar);

    introVisualizer.classList.toggle('is-playing', showSoundBar);
  }

  if (lyricsDisplay) {
    lyricsDisplay.classList.toggle('is-intro', isIntro);
  }
}

/* =========================================
   10. UPDATE LYRICS
========================================= */

let lastLyricIndex = -2;

function updateLyrics() {
  if (!bgMusic || !lyricCurrent) return;

  const index = findCurrentLyricIndex(bgMusic.currentTime);
  const isIntro = index === -1;

  updateIntroVisualizer(isIntro);

  if (index === lastLyricIndex) return;

  lastLyricIndex = index;

  /* INTRO */

  if (isIntro) {
    if (lyricPrev) lyricPrev.textContent = '';
    lyricCurrent.textContent = '';
    if (lyricNext) lyricNext.textContent = '';
    return;
  }

  /* PREVIOUS LYRIC */

  if (lyricPrev) {
    lyricPrev.textContent = index > 0 ? lyrics[index - 1][1] : '';
  }

  /* CURRENT LYRIC */

  lyricCurrent.textContent = lyrics[index][1];

  /* NEXT LYRIC */

  if (lyricNext) {
    lyricNext.textContent =
      index < lyrics.length - 1 ? lyrics[index + 1][1] : '';
  }
}

/* =========================================
   11. MUSIC PROGRESS
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
   12. HIGH PRECISION LYRIC LOOP
========================================= */

/*
  음악 재생 중 가사 시간을 자주 확인하여
  가사 전환 지연을 줄이는 기능
*/

let lyricAnimationFrame = null;

function runLyricLoop() {
  if (!bgMusic || bgMusic.paused || bgMusic.ended) {
    lyricAnimationFrame = null;
    return;
  }

  updateLyrics();
  updateMusicProgress();

  lyricAnimationFrame = requestAnimationFrame(runLyricLoop);
}

function startLyricLoop() {
  if (lyricAnimationFrame !== null) return;

  lyricAnimationFrame = requestAnimationFrame(runLyricLoop);
}

function stopLyricLoop() {
  if (lyricAnimationFrame !== null) {
    cancelAnimationFrame(lyricAnimationFrame);
    lyricAnimationFrame = null;
  }
}

/* =========================================
   13. MUSIC PLAYER
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

  /* PLAY */

  bgMusic.addEventListener('play', () => {
    musicButton.textContent = 'PAUSE MUSIC ❚❚';
    musicButton.setAttribute('aria-pressed', 'true');

    lastLyricIndex = -2;

    updateLyrics();
    updateMusicProgress();
    startLyricLoop();
  });

  /* PAUSE */

  bgMusic.addEventListener('pause', () => {
    musicButton.textContent = 'LISTEN NOW →';
    musicButton.setAttribute('aria-pressed', 'false');

    stopLyricLoop();

    updateLyrics();
    updateMusicProgress();
  });

  /* METADATA */

  bgMusic.addEventListener('loadedmetadata', () => {
    updateMusicProgress();
  });

  /* TIME UPDATE */

  bgMusic.addEventListener('timeupdate', () => {
    updateLyrics();
    updateMusicProgress();
  });

  /* SEEK */

  bgMusic.addEventListener('seeked', () => {
    lastLyricIndex = -2;

    updateLyrics();
    updateMusicProgress();
  });

  /* ENDED */

  bgMusic.addEventListener('ended', () => {
    stopLyricLoop();

    musicButton.textContent = 'LISTEN NOW →';
    musicButton.setAttribute('aria-pressed', 'false');

    lastLyricIndex = -2;

    updateLyrics();
    updateMusicProgress();
  });

  /* ERROR */

  bgMusic.addEventListener('error', () => {
    stopLyricLoop();

    console.error('EIDOS music file could not be loaded.');

    musicButton.textContent = 'LISTEN NOW →';
    musicButton.setAttribute('aria-pressed', 'false');

    if (introVisualizer) {
      introVisualizer.classList.remove('is-visible', 'is-playing');
    }

    if (lyricsDisplay) {
      lyricsDisplay.classList.remove('is-intro');
    }

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
