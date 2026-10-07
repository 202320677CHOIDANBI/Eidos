/* =========================================
   EIDOS
   MEMBER INFORMATION
========================================= */

const members = [
  /* DAYEON */

  {
    number: '01',
    name: 'Dayeon',
    position: 'Producer & Main Vocalist',
    info: 'Producer<br>Main Vocalist',
  },

  /* ION */

  {
    number: '02',
    name: 'Ion',
    position: 'Main Dancer',
    info: 'Main Dancer',
  },

  /* LINA */

  {
    number: '03',
    name: 'Lina',
    position: 'Main Vocalist',
    info: 'Main Vocalist',
  },
];

/* =========================================
   OPEN MEMBER
========================================= */

function openMember(index) {
  const membersElements = document.querySelectorAll('.member');

  const clickedMember = membersElements[index];

  /* 이미 열려 있는 멤버를 다시 클릭하면 닫기 */

  if (clickedMember.classList.contains('active')) {
    clickedMember.classList.remove('active');

    return;
  }

  /* 다른 멤버가 열려 있다면 닫기 */

  membersElements.forEach(function (member) {
    member.classList.remove('active');
  });

  /* 클릭한 멤버 열기 */

  clickedMember.classList.add('active');
}

/* CONCEPT PHOTO */

const conceptPhotos = [
  // CONCEPT 01
  [
    'images/concept1_01.jpg',
    'images/concept1_02.jpg',
    'images/concept1_03.jpg',
    'images/concept1_04.jpg',
  ],

  // CONCEPT 02
  [
    'images/concept2_01.jpg',
    'images/concept2_02.jpg',
    'images/concept2_03.jpg',
    'images/concept2_04.jpg',
  ],

  // CONCEPT 03
  [
    'images/concept3_01.jpg',
    'images/concept3_02.jpg',
    'images/concept3_03.jpg',
    'images/concept3_04.jpg',
  ],
];

const conceptTabs = document.querySelectorAll('.concept-tab');
const conceptTrack = document.getElementById('conceptTrack');

function changeConcept(index) {
  if (!conceptTrack) return;

  conceptTabs.forEach((tab, i) => {
    tab.classList.toggle('active', i === index);
  });

  conceptTrack.innerHTML = '';

  conceptPhotos[index].forEach((src) => {
    const photo = document.createElement('div');
    photo.className = 'concept-photo';

    const img = document.createElement('img');
    img.src = src;
    img.alt = `Concept ${index + 1} Photo`;
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

// 첫 번째 콘셉트 기본 표시
changeConcept(0);

/* ========================================
   BACKGROUND MUSIC
======================================== */

const bgMusic = document.getElementById('eidosMusic');

if (bgMusic) {
  // 음악 볼륨
  bgMusic.volume = 0.5;

  // 홈페이지 로딩 시 자동재생 시도
  window.addEventListener('load', () => {
    bgMusic.play().catch(() => {
      console.log('Autoplay blocked by browser.');
    });
  });

  // 자동재생이 차단된 경우
  // 홈페이지를 처음 클릭하면 음악 재생
  document.addEventListener(
    'click',
    () => {
      if (bgMusic.paused) {
        bgMusic.play();
      }
    },
    { once: true },
  );
}
