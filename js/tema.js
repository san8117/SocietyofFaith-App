const root = document.documentElement;
const metaTheme = document.querySelector('meta[name="theme-color"]');
const botao = document.querySelector('[data-theme-toggle]');
const opcoes = [...document.querySelectorAll('[data-theme-option]')];
const ciclos = ['claro', 'escuro', 'auto'];
const aparencias = {
  claro: { label: 'Claro', icone: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>' },
  escuro: { label: 'Escuro', icone: '<path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.6 8.6 0 1 0 11 11z"/>' },
  auto: { label: 'Automático', icone: '<circle cx="12" cy="12" r="9"/><path d="M12 3v18a9 9 0 0 0 0-18z"/>' }
};

function aplicar(preferencia, salvar = true) {
  const escuro = preferencia === 'escuro'
    || (preferencia === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  root.dataset.theme = escuro ? 'dark' : 'light';
  root.dataset.themePref = preferencia;
  if (metaTheme) metaTheme.content = escuro ? '#171412' : '#FAF7F2';
  if (botao) {
    botao.setAttribute('aria-label', `Tema atual: ${aparencias[preferencia].label}. Alterar para ${aparencias[ciclos[(ciclos.indexOf(preferencia) + 1) % ciclos.length]].label}.`);
    botao.title = `Tema: ${aparencias[preferencia].label}`;
    botao.querySelector('svg').innerHTML = aparencias[preferencia].icone;
  }
  opcoes.forEach((opcao) => opcao.setAttribute('aria-pressed', String(opcao.dataset.themeOption === preferencia)));
  if (salvar) {
    try {
      localStorage.setItem('tema', preferencia);
    } catch (erro) {
      console.warn('Não foi possível salvar a preferência de tema.', erro);
    }
  }
  document.dispatchEvent(new CustomEvent('tema:mudou', { detail: { preferencia, tema: root.dataset.theme } }));
}

if (botao) {
  botao.addEventListener('click', () => {
    const atual = root.dataset.themePref || 'claro';
    aplicar(ciclos[(ciclos.indexOf(atual) + 1) % ciclos.length]);
  });
}
opcoes.forEach((opcao) => opcao.addEventListener('click', () => aplicar(opcao.dataset.themeOption)));

const esquemaSistema = window.matchMedia('(prefers-color-scheme: dark)');
esquemaSistema.addEventListener?.('change', () => {
  if (root.dataset.themePref === 'auto') aplicar('auto', false);
});
aplicar(root.dataset.themePref || 'claro', false);
