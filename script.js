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
  const member = members[index];

  const popup = document.getElementById('memberPopup');

  const number = document.getElementById('popupNumber');

  const name = document.getElementById('popupName');

  const position = document.getElementById('popupPosition');

  const info = document.getElementById('popupInfo');

  /* 멤버 정보 변경 */

  number.textContent = member.number;

  name.textContent = member.name;

  position.textContent = member.position;

  info.innerHTML = member.info;

  /* 팝업 열기 */

  popup.classList.add('active');

  /* 배경 스크롤 방지 */

  document.body.style.overflow = 'hidden';
}

/* =========================================
   CLOSE MEMBER
========================================= */

function closeMember() {
  const popup = document.getElementById('memberPopup');

  popup.classList.remove('active');

  /* 스크롤 다시 활성화 */

  document.body.style.overflow = '';
}

/* =========================================
   ESC KEY
========================================= */

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeMember();
  }
});
