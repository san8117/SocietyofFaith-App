const alvos = [...document.querySelectorAll('[data-reveal]')];
const movimentoReduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (alvos.length && !movimentoReduzido && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('has-reveal');
  const observador = new IntersectionObserver((entradas, observer) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add('is-revealed');
      observer.unobserve(entrada.target);
    });
  }, { threshold: 0.12 });
  alvos.forEach((alvo) => observador.observe(alvo));
} else {
  alvos.forEach((alvo) => alvo.classList.add('is-revealed'));
}
