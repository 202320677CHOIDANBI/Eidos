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
