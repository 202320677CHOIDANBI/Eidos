/* =========================================
   EIDOS OFFICIAL WEBSITE
   FULL SCRIPT.JS
   CONCEPT PHOTOS + CHARACTER LYRICS
========================================= */

/* 1. MEMBERS */

function openMember(index) {
  const members = [...document.querySelectorAll('.member')];
  const selected = members[index];

  if (!selected) return;

  const wasActive = selected.classList.contains('active');

  members.forEach((member) => member.classList.remove('active'));

  if (!wasActive) selected.classList.add('active');
}

/* =========================================
   2. CONCEPT PHOTOS
   새 이미지 9장 추가
========================================= */

const conceptPhotos = [
  // CONCEPT 1 - 총 7장
  [
    'images/concept1_1.png',
    'images/concept1_2.jpeg',
    'images/concept1_3.png',
    'images/concept1_5.png',
    'images/concept1_6.jpeg',
    'images/concept1_7.png',
    'images/concept1_8.png',
  ],

  // CONCEPT 2 - 총 6장
  [
    'images/concept2_1.png',
    'images/concept2_2.png',
    'images/concept2_3.png',
    'images/concept2_4.png',
    'images/concept2_5.png',
    'images/concept2_6.jpeg',
  ],

  // CONCEPT 3 - 총 5장
  [
    'images/concept3_1.png',
    'images/concept3_2.png',
    'images/concept3_3.png',
    'images/concept3_4.png',
    'images/concept3_5.png',
  ],
];

function changeConcept(index) {
  const gallery = document.getElementById('conceptTrack');
  const tabs = [...document.querySelectorAll('.concept-tab')];

  if (!gallery || !conceptPhotos[index]) return;

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
    <button class="lightbox-close" type="button"
      aria-label="사진 닫기">×</button>
    <button class="lightbox-prev" type="button"
      aria-label="이전 사진">‹</button>
    <img class="lightbox-image" alt="EIDOS Concept Photo">
    <button class="lightbox-next" type="button"
      aria-label="다음 사진">›</button>
    <span class="lightbox-counter" aria-live="polite"></span>
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
    if (event.target === modal) closeConceptLightbox();
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

  if (!modal || !modal.classList.contains('active')) return;

  modal.classList.remove('active');
  document.body.classList.remove('concept-lightbox-open');
  document.body.style.overflow = lightboxOldOverflow;

  if (lightboxLastFocus?.isConnected) {
    lightboxLastFocus.focus({ preventScroll: true });
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

const INSTRUMENTAL_SECTIONS = [{ start: 0, end: 38.2, label: 'SKIP INTRO →' }];

/*
  글자별 싱크 기록
  각 번호는 lyrics 배열의 인덱스
  각 배열은 공백 제외 글자별 [시작, 종료] 시간
*/

const wordTimingOverrides = {
  0: [
    [38.236, 38.604],
    [38.604, 38.828],
    [38.828, 39.02],
    [39.02, 39.202],
    [39.202, 39.446],
    [39.446, 40.274],
    [40.274, 40.66],
  ],
  1: [
    [40.6, 40.833],
    [40.833, 41.076],
    [41.076, 41.321],
    [41.321, 41.568],
    [41.568, 41.839],
    [41.839, 42.553],
    [42.553, 43.3],
  ],
  2: [
    [42.913, 43.13],
    [43.13, 43.32],
    [43.32, 43.484],
    [43.484, 43.635],
    [43.635, 43.797],
    [43.797, 43.96],
    [43.96, 44.103],
    [44.103, 44.266],
    [44.266, 44.579],
    [44.579, 44.952],
    [44.952, 45.22],
    [45.22, 45.463],
    [45.463, 45.753],
    [45.753, 46.843],
    [46.843, 47.07],
  ],
  3: [
    [47.068, 47.276],
    [47.276, 47.455],
    [47.455, 47.644],
    [47.644, 47.814],
    [47.814, 48.017],
    [48.017, 48.242],
    [48.242, 48.575],
    [48.575, 48.973],
    [48.973, 49.248],
    [49.248, 49.482],
    [49.482, 49.772],
    [49.772, 50.365],
    [50.365, 51.168],
    [51.168, 51.83],
  ],
  4: [
    [52.116, 52.34],
    [52.34, 52.648],
    [52.648, 52.837],
    [52.837, 53.016],
    [53.016, 53.457],
    [53.457, 53.98],
  ],
  5: [
    [54.008, 54.159],
    [54.159, 54.322],
    [54.322, 54.465],
    [54.465, 54.647],
    [54.647, 56.108],
    [56.108, 57.2],
  ],
  6: [
    [56.313, 56.483],
    [56.483, 56.684],
    [56.684, 56.951],
    [56.951, 57.205],
    [57.205, 57.449],
    [57.449, 57.719],
    [57.719, 58.054],
    [58.054, 60.46],
    [60.46, 60.63],
  ],
  7: [
    [60.665, 60.828],
    [60.828, 61.009],
    [61.009, 61.218],
    [61.218, 61.423],
    [61.423, 61.677],
    [61.677, 61.963],
    [61.963, 63.238],
    [63.238, 64.225],
    [64.225, 64.33],
  ],
  8: [
    [64.415, 64.615],
    [64.615, 64.885],
    [64.885, 65.11],
    [65.11, 65.334],
    [65.334, 66.389],
    [66.389, 66.616],
    [66.616, 67.092],
    [67.092, 67.29],
    [67.29, 67.46],
    [67.46, 67.668],
    [67.668, 68.957],
    [68.957, 69.33],
  ],
  9: [
    [69.438, 69.662],
    [69.662, 69.867],
    [69.867, 70.076],
    [70.076, 70.262],
    [70.262, 70.454],
    [70.454, 70.733],
    [70.733, 70.976],
    [70.976, 71.51],
  ],
  10: [
    [71.328, 71.46],
    [71.46, 71.584],
    [71.584, 71.712],
    [71.712, 71.828],
    [71.828, 71.936],
    [71.936, 72.06],
    [72.06, 72.18],
    [72.18, 72.323],
    [72.323, 72.451],
    [72.451, 72.575],
    [72.575, 73.02],
  ],
  11: [
    [72.699, 72.838],
    [72.838, 72.948],
    [72.948, 73.072],
    [73.072, 73.192],
    [73.192, 73.297],
    [73.297, 73.405],
    [73.405, 73.54],
    [73.54, 73.649],
    [73.649, 73.772],
    [73.772, 73.892],
    [73.892, 74.016],
    [74.016, 74.124],
    [74.124, 74.241],
    [74.241, 74.37],
    [74.37, 74.514],
    [74.514, 74.657],
    [74.657, 74.786],
    [74.786, 74.92],
    [74.92, 74.93],
  ],
  12: [
    [75.044, 75.172],
    [75.172, 75.295],
    [75.295, 75.415],
    [75.415, 75.539],
    [75.539, 75.667],
    [75.667, 75.783],
    [75.783, 75.912],
    [75.912, 76.017],
    [76.017, 76.137],
    [76.137, 76.261],
    [76.261, 76.369],
    [76.369, 76.489],
    [76.489, 76.632],
    [76.632, 76.776],
    [76.776, 76.9],
    [76.9, 77.046],
    [77.046, 77.17],
    [77.17, 77.313],
    [77.313, 77.323],
  ],
  14: [
    [78.561, 78.736],
    [78.736, 78.886],
    [78.886, 79.036],
    [79.036, 79.18],
    [79.18, 79.323],
    [79.323, 79.466],
    [79.466, 79.648],
    [79.648, 79.956],
    [79.956, 80.257],
    [80.257, 80.622],
    [80.622, 80.919],
    [80.919, 81.4],
  ],
  15: [
    [81.363, 81.525],
    [81.525, 81.649],
    [81.649, 81.768],
    [81.768, 81.893],
    [81.893, 82.137],
    [82.137, 82.264],
    [82.264, 82.369],
    [82.369, 82.488],
    [82.488, 82.597],
    [82.597, 82.713],
    [82.713, 82.841],
    [82.841, 82.966],
    [82.966, 83.077],
    [83.077, 83.211],
    [83.211, 83.334],
    [83.334, 83.461],
    [83.461, 83.605],
    [83.605, 83.768],
    [83.768, 83.95],
  ],
  16: [
    [84.224, 84.376],
    [84.376, 84.516],
    [84.516, 84.66],
    [84.66, 84.803],
    [84.803, 84.946],
    [84.946, 85.128],
    [85.128, 85.523],
    [85.523, 86.86],
    [86.86, 87.02],
  ],
  17: [
    [87.045, 87.227],
    [87.227, 87.438],
    [87.438, 87.768],
    [87.768, 87.969],
    [87.969, 88.174],
    [88.174, 88.363],
    [88.363, 88.555],
    [88.555, 88.75],
    [88.75, 88.978],
    [88.978, 89.31],
    [89.31, 89.534],
    [89.534, 89.544],
  ],
  18: [
    [89.743, 89.914],
    [89.914, 90.138],
    [90.138, 90.354],
    [90.354, 90.545],
    [90.545, 90.752],
    [90.752, 90.933],
    [90.933, 91.103],
    [91.103, 91.266],
    [91.266, 91.276],
  ],
  19: [
    [91.436, 91.599],
    [91.599, 91.761],
    [91.761, 91.949],
    [91.949, 92.15],
    [92.15, 92.421],
    [92.421, 92.645],
    [92.645, 93.14],
    [93.14, 94.2],
  ],
  20: [
    [93.346, 93.572],
    [93.572, 93.781],
    [93.781, 94.006],
    [94.006, 94.211],
    [94.211, 94.439],
    [94.439, 94.745],
    [94.745, 95.366],
    [95.366, 96.1],
  ],
  21: [
    [95.548, 95.754],
    [95.754, 95.962],
    [95.962, 96.148],
    [96.148, 96.357],
    [96.357, 96.54],
    [96.54, 96.707],
    [96.707, 96.889],
    [96.889, 97.322],
    [97.322, 97.655],
    [97.655, 98.32],
  ],
  23: [
    [99.815, 100.02],
    [100.02, 100.202],
    [100.202, 100.413],
    [100.413, 100.599],
    [100.599, 100.781],
    [100.781, 100.986],
    [100.986, 101.156],
    [101.156, 101.338],
    [101.338, 101.527],
    [101.527, 102.33],
    [102.33, 102.744],
    [102.744, 103.023],
    [103.023, 104.058],
    [104.058, 104.068],
  ],
  24: [
    [104.348, 104.573],
    [104.573, 104.744],
    [104.744, 104.962],
    [104.962, 105.17],
    [105.17, 105.395],
    [105.395, 105.771],
    [105.771, 106.382],
    [106.382, 106.41],
  ],
  25: [
    [106.547, 106.736],
    [106.736, 106.926],
    [106.926, 107.15],
    [107.15, 107.349],
    [107.349, 108.321],
    [108.321, 108.549],
    [108.549, 108.754],
    [108.754, 108.998],
    [108.998, 109.23],
    [109.23, 109.557],
    [109.557, 109.802],
    [109.802, 110.134],
    [110.134, 111.208],
    [111.208, 112.755],
    [112.755, 112.765],
  ],
  26: [
    [112.998, 113.223],
    [113.223, 113.467],
    [113.467, 113.686],
    [113.686, 113.928],
    [113.928, 114.191],
    [114.191, 114.54],
    [114.54, 115.494],
    [115.494, 116.506],
    [116.506, 116.74],
  ],
  27: [
    [116.729, 116.945],
    [116.945, 117.326],
    [117.326, 117.586],
    [117.586, 117.857],
    [117.857, 118.641],
    [118.641, 118.884],
    [118.884, 119.341],
    [119.341, 119.53],
    [119.53, 119.748],
    [119.748, 119.985],
    [119.985, 121.706],
    [121.706, 121.716],
  ],
  28: [
    [121.907, 122.127],
    [122.127, 122.371],
    [122.371, 122.576],
    [122.576, 122.785],
    [122.785, 123.012],
    [123.012, 123.255],
    [123.255, 123.643],
    [123.643, 123.88],
  ],
  29: [
    [123.832, 123.994],
    [123.994, 124.138],
    [124.138, 124.262],
    [124.262, 124.389],
    [124.389, 124.513],
    [124.513, 124.798],
    [124.798, 125.049],
    [125.049, 125.211],
    [125.211, 125.364],
    [125.364, 125.587],
    [125.587, 125.597],
  ],
  33: [
    [130.982, 131.145],
    [131.145, 131.288],
    [131.288, 131.412],
    [131.412, 131.575],
    [131.575, 131.784],
    [131.784, 131.984],
    [131.984, 132.173],
    [132.173, 132.362],
    [132.362, 132.541],
    [132.541, 132.785],
    [132.785, 133.225],
    [133.225, 133.235],
  ],
  35: [
    [136.229, 136.392],
    [136.392, 136.583],
    [136.583, 136.827],
    [136.827, 137.14],
    [137.14, 137.493],
    [137.493, 137.799],
    [137.799, 138.493],
    [138.493, 139.197],
    [139.197, 139.43],
  ],
  36: [
    [139.412, 139.629],
    [139.629, 139.961],
    [139.961, 140.151],
    [140.151, 140.356],
    [140.356, 140.6],
    [140.6, 140.825],
    [140.825, 141.071],
    [141.071, 141.546],
    [141.546, 141.899],
    [141.899, 142.15],
    [142.15, 143.151],
    [143.151, 150.544],
  ],
};

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
   8. CHARACTER TIMING
========================================= */

function getWordTimings(index) {
  const [start, text] = lyrics[index];

  const end =
    lyrics[index + 1]?.[0] ?? Math.min(audio?.duration || start + 5, start + 5);

  const characters = Array.from(text);
  const visibleCharacters = characters.filter((char) => !/\s/.test(char));

  const override = wordTimingOverrides[index];

  // 기록된 글자별 시간이 있으면 사용
  if (
    override &&
    override.length === visibleCharacters.length &&
    override.every(
      (timing) =>
        Array.isArray(timing) &&
        timing.length === 2 &&
        Number.isFinite(timing[0]) &&
        Number.isFinite(timing[1]) &&
        timing[1] > timing[0],
    )
  ) {
    let n = 0;

    return characters.map((char) => {
      if (/\s/.test(char)) {
        return { text: char, space: true };
      }

      const timing = override[n++];

      return {
        text: char,
        start: timing[0],
        end: timing[1],
      };
    });
  }

  // 미기록 구간은 균등 분배
  const duration = Math.max(0.01, end - start);
  const characterDuration = duration / Math.max(1, visibleCharacters.length);

  let cursor = start;

  return characters.map((char) => {
    if (/\s/.test(char)) {
      return { text: char, space: true };
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

    line.addEventListener('click', () => {
      seekToLyric(index);
    });

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
  if (!audio || !lyrics[index]) return;

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

  if (!line || !audio) return;

  const characters = line.querySelectorAll('.lyric-character');

  characters.forEach((character) => {
    const start = Number(character.dataset.start);
    const end = Number(character.dataset.end);

    const duration = Math.max(0.01, end - start);

    const progress = Math.max(0, Math.min(1, (time - start) / duration));

    character.style.setProperty(
      '--word-progress',
      `${(progress * 100).toFixed(2)}%`,
    );

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

  if (lyricsDisplay) {
    lyricsDisplay.classList.toggle('is-intro', isIntro);
  }

  if (introVisualizer) {
    introVisualizer.classList.toggle('is-visible', isIntro && musicStarted);

    introVisualizer.classList.toggle(
      'is-playing',
      isIntro && musicStarted && !audio.paused,
    );
  }

  if (viewport) {
    viewport.style.opacity = isIntro ? '0' : '1';
    viewport.style.visibility = isIntro ? 'hidden' : 'visible';
    viewport.style.pointerEvents = isIntro ? 'none' : 'auto';
  }

  updateSkipButton(time);

  if (index !== activeIndex || force) {
    activeIndex = index;

    lyricElements.forEach((line, i) => {
      line.classList.toggle('active', i === index);
      line.classList.toggle('passed', i < index);
      line.classList.toggle('upcoming', i > index);

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

  if (index >= 0) {
    updateCharacters(index, time);
  }
}

/* =========================================
   17. MUSIC BUTTON
========================================= */

function updateButton() {
  if (!musicButton || !audio) return;

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

    if (!Number.isFinite(target)) return;

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
  // CONCEPT TABS

  document.querySelectorAll('.concept-tab').forEach((tab, i) => {
    tab.addEventListener('click', () => {
      changeConcept(Number(tab.dataset.concept ?? i));
    });
  });

  changeConcept(0);

  // MUSIC ELEMENTS

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

  // CREATE LYRICS

  createLyricUI();
  createSkipButton();

  // MUSIC BUTTON CLICK

  musicButton?.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch((error) => {
        console.warn('Music playback blocked:', error);
      });
    } else {
      audio.pause();
    }
  });

  // AUDIO PLAY

  audio.addEventListener('play', () => {
    showMusicContent();
    updateButton();
    updateLyrics(true);
    startAnimation();
  });

  // AUDIO PAUSE

  audio.addEventListener('pause', () => {
    updateButton();
    updateLyrics();
    stopAnimation();
  });

  // AUDIO SEEK

  audio.addEventListener('seeked', () => {
    updateLyrics(true);
  });

  // AUDIO TIME UPDATE

  audio.addEventListener('timeupdate', () => {
    updateLyrics();
  });

  // AUDIO METADATA

  audio.addEventListener('loadedmetadata', () => {
    updateLyrics(true);
  });

  // AUDIO ENDED

  audio.addEventListener('ended', () => {
    updateButton();
    stopAnimation();
  });

  // WINDOW RESIZE

  window.addEventListener('resize', () => {
    centerLine(activeIndex);
  });

  // INITIAL STATE

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
