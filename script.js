/* =========================================
   EIDOS OFFICIAL WEBSITE
   SCRIPT.JS

   KARAOKE LYRICS + WAVE ANIMATION
   SCROLLING LYRICS VERSION
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
   04. MUSIC SETTINGS
========================================= */

/*
  기존 가사 싱크 유지

  0 = 원래 시간
  1 = 1초 빠르게
  2 = 2초 빠르게
*/

const LYRIC_SYNC_OFFSET = 1;

/*
  가사 한 줄이 끝나는 시점에서
  마지막 글자가 완전히 하얗게
  채워지도록 설정

  1 = 다음 가사 시작까지 사용
*/

const LYRIC_FILL_SPEED = 1;

/*
  글자가 파도처럼 움직이는 정도

  CSS에서 --wave-strength 값을 사용
*/

const LYRIC_WAVE_STRENGTH = 5;

/*
  글자별 물결 간격
  숫자가 작을수록 물결이 촘촘함
*/

const LYRIC_WAVE_DELAY = 0.055;

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

const lyricsDisplay = document.getElementById('lyricsDisplay');

const lyricsViewport = document.getElementById('lyricsViewport');

const lyricsTrack = document.getElementById('lyricsTrack');

const introVisualizer = document.getElementById('introVisualizer');

const currentTimeElement = document.getElementById('currentTime');

const durationElement = document.getElementById('duration');

const progressFill = document.getElementById('progressFill');

/* =========================================
   07. UTILITY FUNCTIONS
========================================= */

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

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
   09. LYRIC DURATION
========================================= */

/*
  현재 가사 시작 시간부터
  다음 가사 시작 시간까지를
  한 줄의 재생 구간으로 사용

  마지막 가사는 4초를 기본값으로 사용
*/

function getLyricDuration(index) {
  const current = lyrics[index];

  if (!current) return 1;

  const next = lyrics[index + 1];

  if (next) {
    return Math.max(0.1, next[0] - current[0]);
  }

  if (
    bgMusic &&
    Number.isFinite(bgMusic.duration) &&
    bgMusic.duration > current[0]
  ) {
    return Math.max(0.1, Math.min(4, bgMusic.duration - current[0]));
  }

  return 4;
}

/* =========================================
   10. CREATE KARAOKE CHARACTERS
========================================= */

/*
  가사를 한 글자씩 분리해서 생성

  각 글자는 다음 구조를 가짐

  span.lyric-char
    span.lyric-char-inner
      실제 글자

  CSS에서
  lyric-char-inner에 물결 애니메이션 적용

  JS에서는 각 글자의 진행률을
  --char-progress 변수로 전달
*/

let lyricItems = [];

let lyricCharacters = [];

function createLyricCharacters(text, index) {
  const fragment = document.createDocumentFragment();

  const characters = [];

  const chars = Array.from(text);

  chars.forEach((character, charIndex) => {
    const outer = document.createElement('span');

    outer.className = 'lyric-char';

    outer.style.setProperty('--char-index', charIndex);

    outer.style.setProperty('--wave-strength', `${LYRIC_WAVE_STRENGTH}px`);

    outer.style.setProperty('--wave-delay', `${charIndex * LYRIC_WAVE_DELAY}s`);

    const inner = document.createElement('span');

    inner.className = 'lyric-char-inner';

    inner.textContent = character === ' ' ? '\u00A0' : character;

    outer.appendChild(inner);

    fragment.appendChild(outer);

    characters.push(outer);
  });

  lyricCharacters[index] = characters;

  return fragment;
}

/* =========================================
   11. CREATE ALL LYRICS
========================================= */

function createLyricElements() {
  if (!lyricsTrack) return;

  lyricsTrack.innerHTML = '';

  lyricItems = [];
  lyricCharacters = [];

  lyrics.forEach((lyric, index) => {
    const item = document.createElement('p');

    item.className = 'lyric-item upcoming';

    item.dataset.index = index;
    item.dataset.time = lyric[0];

    item.setAttribute('aria-label', lyric[1]);

    const fragment = createLyricCharacters(lyric[1], index);

    item.appendChild(fragment);

    lyricsTrack.appendChild(item);

    lyricItems.push(item);
  });
}

createLyricElements();

/* =========================================
   12. KARAOKE PROGRESS
========================================= */

/*
  음악 시간에 따라
  현재 가사가 얼마나 진행되었는지 계산

  0 = 시작
  1 = 끝

  글자별로 진행률을 나누어
  순서대로 흰색으로 변경
*/

function getLyricProgress(index, time) {
  if (index < 0 || !lyrics[index]) {
    return 0;
  }

  const startTime = lyrics[index][0];

  const duration = getLyricDuration(index);

  const adjustedTime = time + LYRIC_SYNC_OFFSET;

  const elapsed = adjustedTime - startTime;

  return clamp((elapsed / duration) * LYRIC_FILL_SPEED, 0, 1);
}

/* =========================================
   13. UPDATE CHARACTER FILL
========================================= */

/*
  예시

  가사: 은근히 푸석한 날

  진행률 0%
  모든 글자 회색

  진행률 50%
  앞부분 글자 흰색

  진행률 100%
  모든 글자 흰색

  글자별로 --char-progress 전달
*/

function updateCharacterFill(index, progress) {
  const characters = lyricCharacters[index];

  if (!characters || characters.length === 0) {
    return;
  }

  const count = characters.length;

  characters.forEach((character, charIndex) => {
    /*
      각 글자가 차지하는 진행 구간

      첫 글자:
      0 ~ 1/count

      두 번째 글자:
      1/count ~ 2/count
    */

    const charStart = charIndex / count;
    const charEnd = (charIndex + 1) / count;

    const charProgress = clamp(
      (progress - charStart) / (charEnd - charStart),
      0,
      1,
    );

    character.style.setProperty('--char-progress', charProgress.toFixed(4));

    character.classList.toggle('is-filled', charProgress >= 1);

    character.classList.toggle(
      'is-filling',
      charProgress > 0 && charProgress < 1,
    );

    /*
      파도 애니메이션은
      해당 글자의 색이 채워지기 시작하면 실행
    */

    character.classList.toggle(
      'is-waving',
      charProgress > 0 && charProgress < 1,
    );
  });
}

/* =========================================
   14. RESET CHARACTER FILL
========================================= */

function resetCharacterFill(index) {
  const characters = lyricCharacters[index];

  if (!characters) return;

  characters.forEach((character) => {
    character.style.setProperty('--char-progress', '0');

    character.classList.remove('is-filled', 'is-filling', 'is-waving');
  });
}

/* =========================================
   15. COMPLETE CHARACTER FILL
========================================= */

function completeCharacterFill(index) {
  const characters = lyricCharacters[index];

  if (!characters) return;

  characters.forEach((character) => {
    character.style.setProperty('--char-progress', '1');

    character.classList.add('is-filled');

    character.classList.remove('is-filling', 'is-waving');
  });
}

/* =========================================
   16. SOUND BAR CONTROL
========================================= */

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
   17. SCROLL CURRENT LYRIC
========================================= */

/*
  현재 가사를 화면 중앙으로 이동

  글자별 색 변화와는 별개로
  가사 줄 전체가 부드럽게 스크롤됨
*/

function scrollToLyric(index, instant = false) {
  if (!lyricsViewport || !lyricsTrack || !lyricItems[index]) {
    return;
  }

  const activeItem = lyricItems[index];

  const viewportHeight = lyricsViewport.clientHeight;

  const itemCenter = activeItem.offsetTop + activeItem.offsetHeight / 2;

  const targetY = viewportHeight / 2 - itemCenter;

  if (instant) {
    lyricsTrack.style.transition = 'none';
  } else {
    lyricsTrack.style.transition =
      'transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)';
  }

  lyricsTrack.style.transform = `translate3d(0, ${targetY}px, 0)`;

  if (instant) {
    void lyricsTrack.offsetHeight;

    lyricsTrack.style.transition =
      'transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)';
  }
}

/* =========================================
   18. UPDATE LYRIC APPEARANCE
========================================= */

function updateLyricAppearance(index) {
  lyricItems.forEach((item, i) => {
    item.classList.remove('active', 'passed', 'upcoming');

    if (i === index) {
      item.classList.add('active');

      item.setAttribute('aria-current', 'true');
    } else if (i < index) {
      item.classList.add('passed');

      item.removeAttribute('aria-current');
    } else {
      item.classList.add('upcoming');

      item.removeAttribute('aria-current');
    }
  });
}

/* =========================================
   19. UPDATE ALL LYRIC STATES
========================================= */

let lastLyricIndex = -2;

let forceInstantScroll = false;

function updateLyricStates(index) {
  lyricItems.forEach((item, i) => {
    if (i < index) {
      completeCharacterFill(i);
    } else if (i > index) {
      resetCharacterFill(i);
    } else if (index === -1) {
      resetCharacterFill(i);
    }
  });
}

/* =========================================
   20. UPDATE LYRICS
========================================= */

function updateLyrics() {
  if (!bgMusic || !lyricsTrack) return;

  const time = bgMusic.currentTime;

  const index = findCurrentLyricIndex(time);

  const isIntro = index === -1;

  updateIntroVisualizer(isIntro);

  /*
    가사 줄이 변경된 경우
  */

  if (index !== lastLyricIndex) {
    const previousIndex = lastLyricIndex;

    lastLyricIndex = index;

    updateLyricAppearance(index);

    updateLyricStates(index);

    if (isIntro) {
      lyricsTrack.style.transition = 'none';

      lyricsTrack.style.transform = 'translate3d(0, 0, 0)';

      forceInstantScroll = false;
    } else {
      const isLargeJump =
        previousIndex >= 0 && Math.abs(index - previousIndex) > 1;

      scrollToLyric(index, forceInstantScroll || isLargeJump);

      forceInstantScroll = false;
    }
  }

  /*
    현재 가사의 진행률을
    매 프레임 계산
  */

  if (index >= 0) {
    const progress = getLyricProgress(index, time);

    updateCharacterFill(index, progress);
  }
}

/* =========================================
   21. MUSIC PROGRESS
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

    progressFill.style.width = `${clamp(percent, 0, 100)}%`;
  }
}

/* =========================================
   22. HIGH PRECISION MUSIC LOOP
========================================= */

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
  if (lyricAnimationFrame !== null) {
    return;
  }

  lyricAnimationFrame = requestAnimationFrame(runLyricLoop);
}

function stopLyricLoop() {
  if (lyricAnimationFrame !== null) {
    cancelAnimationFrame(lyricAnimationFrame);

    lyricAnimationFrame = null;
  }
}

/* =========================================
   23. MUSIC PLAYER
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
    forceInstantScroll = true;

    updateLyrics();
    updateMusicProgress();
  });

  /* LOOP / RESTART */

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
      lyricsDisplay.classList.add('is-intro');
    }

    if (lyricsTrack) {
      lyricsTrack.textContent = '음원 파일을 확인해 주세요.';
    }
  });

  /* INITIAL STATE */

  updateMusicProgress();
  updateLyrics();
}

/* =========================================
   24. RESIZE SUPPORT
========================================= */

let resizeFrame = null;

window.addEventListener('resize', () => {
  if (resizeFrame !== null) {
    cancelAnimationFrame(resizeFrame);
  }

  resizeFrame = requestAnimationFrame(() => {
    resizeFrame = null;

    if (!bgMusic) return;

    const index = findCurrentLyricIndex(bgMusic.currentTime);

    if (index >= 0) {
      scrollToLyric(index, true);
    }
  });
});

/* =========================================
   EIDOS SCRIPT END
========================================= */
