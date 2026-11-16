const sectionIds = ['citar', 'ibge', 'textos', 'reportagens', 'leis', 'creditos', 'avisos'];

const formatDate = (date = new Date()) => new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
}).format(date);

const updateCitation = () => {
  const output = document.querySelector('[data-citation-output]');
  if (!output) return;

  const pageTitle = document.title.replace(/\s*[—-].*$/, '').trim();
  const url = location.href;
  const date = formatDate();
  output.textContent = `SOCIETY OF FAITH. ${pageTitle}. Disponível em: ${url}. Acesso em: ${date}.`;
};

const syncConferirBadges = () => {
  const devMode = new URLSearchParams(location.search).get('dev') === '1';

  document.querySelectorAll('[data-conferir]').forEach((item) => {
    item.classList.toggle('is-conferir', Boolean(devMode));
  });
};

const setupScrollSpy = () => {
  const chipLinks = [...document.querySelectorAll('.chip-nav a[href^="#"]')];
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!chipLinks.length || !sections.length) return;

  const setActiveChip = (activeId) => {
    chipLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${activeId}`;
      link.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  };

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible?.target?.id) {
      setActiveChip(visible.target.id);
    }
  }, {
    rootMargin: '-35% 0px -45% 0px',
    threshold: [0.2, 0.5, 0.75]
  });

  sections.forEach((section) => observer.observe(section));
};

const copyCitation = async () => {
  const output = document.querySelector('[data-citation-output]');
  const toast = document.querySelector('[data-copy-toast]');
  if (!output || !toast) return;

  const text = output.textContent.trim();

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', 'true');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }

    toast.textContent = 'Citação copiada';
    toast.hidden = false;
    window.setTimeout(() => {
      toast.hidden = true;
    }, 1800);
  } catch (error) {
    toast.textContent = 'Não foi possível copiar a citação';
    toast.hidden = false;
    window.setTimeout(() => {
      toast.hidden = true;
    }, 2200);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  updateCitation();
  syncConferirBadges();
  setupScrollSpy();

  const button = document.querySelector('[data-copy-citation]');
  const toast = document.querySelector('[data-copy-toast]');

  if (button) {
    button.addEventListener('click', copyCitation);
  }

  if (toast) {
    toast.hidden = true;
  }
});
