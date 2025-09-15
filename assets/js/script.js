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
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const data = new FormData(contactForm);
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
      contactForm.reset();
    });
  }

  // Checkout form behavior
  const checkout = document.getElementById('checkout-form');
  if (checkout) {
    let currentStep = 1;
    const totalSteps = 3;
    const steps = checkout.querySelectorAll('.form-step');
    const prevBtn = document.getElementById('prev-step');
    const nextBtn = document.getElementById('next-step');
    const submitBtn = document.getElementById('submit-form');

    // Navegação entre etapas
    function showStep(step) {
      steps.forEach(function(s) {
        s.classList.toggle('active', parseInt(s.getAttribute('data-step')) === step);
        s.classList.toggle('hidden', parseInt(s.getAttribute('data-step')) !== step);
      });
      
      prevBtn.classList.toggle('hidden', step === 1);
      nextBtn.classList.toggle('hidden', step === totalSteps);
      submitBtn.classList.toggle('hidden', step !== totalSteps);
    }

    nextBtn.addEventListener('click', function() {
      if (validateCurrentStep()) {
        currentStep++;
        showStep(currentStep);
      }
    });

    prevBtn.addEventListener('click', function() {
      currentStep--;
      showStep(currentStep);
    });

    // Validação por etapa
    function validateCurrentStep() {
      const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
      const requiredFields = currentStepEl.querySelectorAll('input[required], select[required]');
      let isValid = true;

      requiredFields.forEach(function(field) {
        if (!field.value.trim()) {
          field.classList.add('error');
          isValid = false;
        } else {
          field.classList.remove('error');
        }
      });

      // Validação específica do CPF na etapa 2
      if (currentStep === 2) {
        const cpfField = document.getElementById('cpf');
        if (cpfField && cpfField.value) {
          const cpf = cpfField.value.replace(/\D/g, '');
          if (!validateCPF(cpf)) {
            cpfField.classList.add('error');
            alert('CPF inválido.');
            isValid = false;
          }
        }
      }

      if (!isValid) {
        alert('Preencha todos os campos obrigatórios desta etapa.');
      }

      return isValid;
    }

    // Controle de campos condicionais
    const formaPagamento = document.getElementById('forma_pagamento');
    const dadosBancarios = document.getElementById('dados-bancarios');
    const dadosCartao = document.getElementById('dados-cartao');

    if (formaPagamento) {
      formaPagamento.addEventListener('change', function() {
        dadosBancarios.classList.add('hidden');
        dadosCartao.classList.add('hidden');
        
        if (this.value === 'debito_conta') {
          dadosBancarios.classList.remove('hidden');
        } else if (this.value === 'cartao') {
          dadosCartao.classList.remove('hidden');
        }
      });
    }

    checkout.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (!validateCurrentStep()) {
        return;
      }

      const fd = new FormData(checkout);
      const plano = fd.get('plano');
      const nome = String(fd.get('nome') || '').trim();
      const email = String(fd.get('email') || '').trim();
      const telefone = String(fd.get('telefone') || '').trim();
      const cpf = String(fd.get('cpf') || '').replace(/\D/g, '');
      const termos = checkout.querySelector('#termos');
      
      if (!termos || !termos.checked) {
        alert('Você precisa aceitar os termos e condições.');
        return;
      }

      // Placeholder Safe2Pay: aqui você chamaria a API/método do SDK
      console.log('[Safe2Pay] Preparando transação...', {
        plano: plano,
        cliente: {
          nome: nome,
          email: email,
          telefone: telefone,
          cpf: cpf
        },
        dados: Object.fromEntries(fd.entries())
      });
      
      alert(`Cadastro recebido para o ${plano === 'cap500' ? 'Plano CAP 500' : 'Plano GN'}! Redirecionando para pagamento (Safe2Pay)...`);
    });
  }

  function validateCPF(cpf) {
    if (cpf.length !== 11 || /^([0-9])\1+$/.test(cpf)) return false;
    var soma = 0, resto;
    for (var i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11; if (resto === 10 || resto === 11) resto = 0; if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0; for (i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11; if (resto === 10 || resto === 11) resto = 0; if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
  }
})();


