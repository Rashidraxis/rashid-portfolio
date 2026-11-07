(() => {
  let saved = null;
  try {
    saved = localStorage.getItem('portfolio-theme');
  } catch {}
  const theme = saved === 'light' || saved === 'dark'
    ? saved
    : window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
})();