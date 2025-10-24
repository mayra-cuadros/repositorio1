const moralesBtn = document.getElementById('moralesBtn');

moralesBtn.addEventListener('mouseenter', () => {
  moralesBtn.style.boxShadow = '0 0 25px 8px white';
  moralesBtn.style.transform = 'scale(1.05)';
});

moralesBtn.addEventListener('mouseleave', () => {
  moralesBtn.style.boxShadow = 'none';
  moralesBtn.style.transform = 'scale(1)';
});
