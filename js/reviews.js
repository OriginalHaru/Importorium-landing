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
}
