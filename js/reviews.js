const aqTrack = document.getElementById('aq-track');

if (aqTrack) {
  const getStep = () => {
    const card = aqTrack.querySelector('.aq-card');
    if (!card) return aqTrack.clientWidth;
    const gap = parseFloat(getComputedStyle(aqTrack).columnGap || 0);
    return card.getBoundingClientRect().width + gap;
  };

  document.querySelector('.aq-prev')?.addEventListener('click', () => {
    aqTrack.scrollBy({ left: -getStep(), behavior: 'smooth' });
  });

  document.querySelector('.aq-next')?.addEventListener('click', () => {
    aqTrack.scrollBy({ left: getStep(), behavior: 'smooth' });
  });

  aqTrack.querySelectorAll('.aq-card').forEach((card) => {
    const video = card.querySelector('.aq-video');
    if (!video) return;

    const toggle = () => {
      if (video.paused) {
        aqTrack.querySelectorAll('.aq-card.is-playing').forEach((other) => {
          if (other !== card) {
            other.querySelector('.aq-video')?.pause();
            other.classList.remove('is-playing');
          }
        });
        video.play();
        card.classList.add('is-playing');
      } else {
        video.pause();
        card.classList.remove('is-playing');
      }
    };

    card.addEventListener('click', toggle);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
    video.addEventListener('ended', () => card.classList.remove('is-playing'));
  });
}
