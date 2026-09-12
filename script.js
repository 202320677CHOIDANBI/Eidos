// =========================
// EIDOS — SCRIPT
// =========================

// 페이지가 로드되면 실행
document.addEventListener('DOMContentLoaded', () => {
  // -------------------------
  // 스크롤 애니메이션
  // -------------------------

  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  // -------------------------
  // 네비게이션 부드러운 이동
  // -------------------------

  const navLinks = document.querySelectorAll('.nav a');

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');

      if (targetId.startsWith('#')) {
        event.preventDefault();

        const target = document.querySelector(targetId);

        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
          });
        }
      }
    });
  });

  // -------------------------
  // 이미지 로딩 확인
  // -------------------------

  const images = document.querySelectorAll('img');

  images.forEach((image) => {
    image.addEventListener('error', () => {
      console.log('이미지를 찾을 수 없습니다:', image.getAttribute('src'));
    });
  });
});
