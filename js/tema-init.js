(() => {
  let preferencia = 'claro';
  try {
    const salva = localStorage.getItem('tema');
    if (salva === 'claro' || salva === 'escuro' || salva === 'auto') preferencia = salva;
  } catch (erro) {
    console.warn('Não foi possível ler a preferência de tema.', erro);
  }
  const escuro = preferencia === 'escuro'
    || (preferencia === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = escuro ? 'dark' : 'light';
  document.documentElement.dataset.themePref = preferencia;
})();
