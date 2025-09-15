(function() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('hidden');
    });
    // start hidden on mobile
    if (window.matchMedia('(max-width: 899px)').matches) {
      nav.classList.add('hidden');
    }
  }

  // Form validation + fake submit
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const data = new FormData(form);
      const nome = String(data.get('nome') || '').trim();
      const email = String(data.get('email') || '').trim();
      const telefone = String(data.get('telefone') || '').trim();
      if (!nome || !email || !telefone) {
        alert('Por favor, preencha nome, e-mail e telefone.');
        return;
      }
      // Placeholder de tracking de evento
      try { window.gtag && window.gtag('event', 'lead_submit', { method: 'landing_form' }); } catch (_) {}
      // Simulação de envio (pode ser trocado por fetch para backend ou serviço de forms)
      alert('Recebemos sua solicitação! Em breve entraremos em contato.');
      form.reset();
    });
  }
})();


