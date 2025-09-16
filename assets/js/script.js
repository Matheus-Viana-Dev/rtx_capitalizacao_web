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
      nav.classList.toggle('open');
    });
    // start hidden on mobile
    if (window.matchMedia('(max-width: 899px)').matches) {
      nav.classList.add('hidden');
    }
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Scroll behavior for header
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.site-header');
    if (header) {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // Inicializar animações do hero
  initHeroAnimations();
  
  // Inicializar FAQ swiper
  initFaqSwiper();
})();

// Estado do mercado RTX ONE
let heroMarketState = {
  currentPrice: 27883.81,
  priceChange: 0.60,
  candleIndex: 0,
  basePrice: 24000,
  trend: 'bullish'
};

// Gerar dados de candlestick com tendência de alta para RTX ONE
function generateRTXBullishCandle(index) {
  const isBullish = Math.random() > 0.15; // 85% de chance de alta
  
  // Preço base com tendência crescente
  const priceBase = heroMarketState.basePrice + (index * 80) + 
                   Math.sin(index * 0.05) * 1000 + 
                   Math.random() * 500;
  
  const open = priceBase + (Math.random() - 0.5) * 400;
  let close;
  
  if (isBullish) {
    close = open + Math.random() * 600 + 100; // Vela verde
  } else {
    close = open - Math.random() * 300 - 50; // Vela vermelha menor
  }
  
  const high = Math.max(open, close) + Math.random() * 300 + 100;
  const low = Math.min(open, close) - Math.random() * 200 + 50;
  
  return {
    open, close, high, low, isBullish,
    volume: Math.random() * 800 + 300,
    strength: isBullish ? Math.random() * 0.8 + 0.4 : Math.random() * 0.4 + 0.1
  };
}

// Criar candlesticks animados
function createHeroAnimatedCandles() {
  const container = document.getElementById('hero-candlesticks');
  if (!container) return;
  
  // Mover velas existentes para a esquerda
  const existingCandles = Array.from(container.children);
  existingCandles.forEach((candle, index) => {
    const currentTransform = candle.style.transform || '';
    const currentX = parseFloat(currentTransform.match(/translateX\(([^)]+)\)/)?.[1] || 0);
    candle.style.transform = `translateX(${currentX - 12}px)`;
    candle.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Remover velas que saíram da tela
    if (currentX < -50 && existingCandles.length > 80) {
      setTimeout(() => {
        if (candle.parentNode) candle.remove();
      }, 600);
    }
  });

  // Criar nova vela
  const candleData = generateRTXBullishCandle(heroMarketState.candleIndex++);
  const candle = document.createElement('div');
  candle.className = `hero-candle ${candleData.isBullish ? 'bullish' : 'bearish'}`;
  
  // Calcular dimensões
  const bodyHeight = Math.max(8, Math.abs(candleData.close - candleData.open) / 50);
  const wickTopHeight = Math.max(3, (candleData.high - Math.max(candleData.open, candleData.close)) / 50);
  const wickBottomHeight = Math.max(3, (Math.min(candleData.open, candleData.close) - candleData.low) / 50);
  
  // Posicionar baseado no preço
  const pricePosition = ((candleData.close - 20000) / 15000) * 100;
  candle.style.bottom = Math.max(10, Math.min(85, pricePosition)) + '%';
  
  // Intensidade da animação baseada na força
  candle.style.filter = candleData.isBullish ? 
    `drop-shadow(0 0 ${5 + candleData.strength * 10}px rgba(14, 203, 129, ${0.3 + candleData.strength * 0.4}))` :
    `drop-shadow(0 0 ${3 + candleData.strength * 5}px rgba(246, 70, 93, ${0.2 + candleData.strength * 0.3}))`;
  
  candle.innerHTML = `
    <div class="hero-candle-wick-top" style="height: ${wickTopHeight}px;"></div>
    <div class="hero-candle-body" style="height: ${bodyHeight}px;"></div>
    <div class="hero-candle-wick-bottom" style="height: ${wickBottomHeight}px;"></div>
  `;
  
  candle.style.animationDelay = Math.random() * 0.3 + 's';
  container.appendChild(candle);

  // Atualizar preço atual
  heroMarketState.currentPrice = candleData.close;
}

// Criar barras de volume animadas
function createHeroAnimatedVolume() {
  const container = document.getElementById('hero-volume');
  if (!container) return;
  
  // Mover volumes existentes
  const existingBars = Array.from(container.children);
  existingBars.forEach((bar, index) => {
    const currentTransform = bar.style.transform || '';
    const currentX = parseFloat(currentTransform.match(/translateX\(([^)]+)\)/)?.[1] || 0);
    bar.style.transform = `${currentTransform} translateX(${currentX - 12}px)`;
    
    if (currentX < -50 && existingBars.length > 80) {
      setTimeout(() => {
        if (bar.parentNode) bar.remove();
      }, 600);
    }
  });

  // Nova barra de volume
  const volume = Math.random() * 45 + 15;
  const isGreen = Math.random() > 0.2;
  
  const bar = document.createElement('div');
  bar.className = 'hero-volume-bar';
  bar.style.height = volume + 'px';
  bar.style.background = isGreen ? 
    `linear-gradient(180deg, rgba(14, 203, 129, 0.8) 0%, rgba(14, 203, 129, 0.4) 100%)` : 
    `linear-gradient(180deg, rgba(246, 70, 93, 0.6) 0%, rgba(246, 70, 93, 0.3) 100%)`;
  bar.style.animationDelay = Math.random() * 0.2 + 's';
  
  container.appendChild(bar);
}

// Atualizar labels de preço
function updateHeroPriceLabels() {
  const container = document.getElementById('hero-price-sidebar');
  if (!container) return;
  
  container.innerHTML = '';

  const basePrice = Math.floor(heroMarketState.currentPrice / 1000) * 1000;
  const levels = [8, 18, 28, 38, 48, 58, 68, 78, 88];

  levels.forEach((level, index) => {
    const label = document.createElement('div');
    label.className = 'hero-price-tag';
    const price = basePrice + (index - 4) * 2000;
    label.textContent = 'R$ ' + price.toLocaleString('pt-BR', {maximumFractionDigits: 0});
    label.style.top = level + '%';
    
    // Destacar preço atual
    if (Math.abs(price - heroMarketState.currentPrice) < 1000) {
      label.classList.add('current');
    }
    
    container.appendChild(label);
  });
}

// Criar preços flutuantes específicos do RTX ONE
function createHeroFloatingPrices() {
  const container = document.getElementById('hero-floating-data');
  if (!container) return;
  
  const phrases = [
    { text: () => 'R$ ' + Math.floor(heroMarketState.currentPrice + Math.random() * 5000).toLocaleString('pt-BR'), color: 'yellow' },
    { text: () => '+' + (Math.random() * 2 + 0.5).toFixed(1) + '%', color: 'green' },
    { text: () => '🚀 RTX ONE', color: 'green' },
    { text: () => 'SEGURO', color: 'white' },
    { text: () => 'RENTÁVEL!', color: 'yellow' },
    { text: () => '+R$ ' + Math.floor(Math.random() * 1000 + 500), color: 'green' },
    { text: () => ['CAP 500', 'INVESTIMENTO', 'CRESCIMENTO!'][Math.floor(Math.random() * 3)], color: 'white' },
    { text: () => '0,60% a.m.', color: 'green' },
    { text: () => 'SCP LEGAL', color: 'white' },
    { text: () => '💎 PONTUAL', color: 'yellow' }
  ];

  const phrase = phrases[Math.floor(Math.random() * phrases.length)];
  const float = document.createElement('div');
  
  float.className = `hero-price-float ${phrase.color}`;
  float.textContent = phrase.text();
  float.style.left = Math.random() * 85 + 5 + '%';
  float.style.fontSize = Math.random() > 0.6 ? '14px' : '12px';
  float.style.fontWeight = Math.random() > 0.5 ? '800' : '700';
  float.style.animationDuration = (Math.random() * 4 + 8) + 's';
  
  container.appendChild(float);

  setTimeout(() => {
    if (float.parentNode) float.remove();
  }, 12000);
}

// Atualizar ticker do RTX ONE
function updateHeroTicker() {
  const changePercent = Math.random() * 1.5 + 0.3;
  heroMarketState.priceChange = changePercent;
  
  const priceDisplay = document.getElementById('hero-price-display');
  const changeDisplay = document.getElementById('hero-change-display');
  
  if (priceDisplay) {
    priceDisplay.textContent = 
      'R$ ' + Math.floor(heroMarketState.currentPrice).toLocaleString('pt-BR');
  }
  
  if (changeDisplay) {
    changeDisplay.textContent = '+' + changePercent.toFixed(2) + '%';
  }
  
  // Efeito de pulse no ticker quando há grande mudança
  if (changePercent > 1.2 && priceDisplay) {
    priceDisplay.style.animation = 'hero-price-pulse 1s ease-out';
    setTimeout(() => {
      priceDisplay.style.animation = '';
    }, 1000);
  }
}

// Criar partículas de fundo
function createHeroParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;
  
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const particle = document.createElement('div');
      particle.className = 'hero-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      container.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode) particle.remove();
      }, 25000);
    }, i * 1000);
  }
}

// Inicializar todas as animações do hero
function initHeroAnimations() {
  console.log('🚀 RTX ONE Hero Trading Chart inicializando...');
  
  // Aguardar um pouco para garantir que o DOM está carregado
  setTimeout(() => {
    // Criar velas iniciais
    for (let i = 0; i < 60; i++) {
      setTimeout(() => {
        createHeroAnimatedCandles();
        createHeroAnimatedVolume();
      }, i * 80);
    }

    updateHeroPriceLabels();
    createHeroParticles();

    // Loops de animação
    setInterval(createHeroAnimatedCandles, 1200);
    setInterval(createHeroAnimatedVolume, 1200);
    setInterval(updateHeroPriceLabels, 3000);
    setInterval(createHeroFloatingPrices, 800);
    setInterval(updateHeroTicker, 4000);
    setInterval(createHeroParticles, 20000);

    console.log('✅ RTX ONE Trading Chart ativo - Tendência de alta!');
  }, 500);
}

// FAQ Swiper
function initFaqSwiper() {
  const slides = document.querySelectorAll('.faq-slide');
  const prevBtn = document.getElementById('faqPrev');
  const nextBtn = document.getElementById('faqNext');
  const currentSpan = document.querySelector('.faq-current');
  const totalSpan = document.querySelector('.faq-total');
  
  if (!slides.length || !prevBtn || !nextBtn) return;
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  
  // Atualizar total
  if (totalSpan) totalSpan.textContent = totalSlides;
  
  function showSlide(index) {
    // Remover active de todos os slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Adicionar active ao slide atual
    if (slides[index]) {
      slides[index].classList.add('active');
    }
    
    // Atualizar contador
    if (currentSpan) currentSpan.textContent = index + 1;
    
    // Atualizar botões
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === totalSlides - 1;
  }
  
  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      showSlide(currentSlide);
    }
  }
  
  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      showSlide(currentSlide);
    }
  }
  
  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  // Auto-play (opcional)
  let autoPlayInterval;
  
  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      if (currentSlide === totalSlides - 1) {
        currentSlide = 0;
      } else {
        currentSlide++;
      }
      showSlide(currentSlide);
    }, 5000); // Muda a cada 5 segundos
  }
  
  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
  }
  
  // Pausar auto-play quando hover
  const faqContainer = document.querySelector('.faq-swiper-container');
  if (faqContainer) {
    faqContainer.addEventListener('mouseenter', stopAutoPlay);
    faqContainer.addEventListener('mouseleave', startAutoPlay);
  }
  
  // Inicializar
  showSlide(0);
  startAutoPlay();
  
  console.log('✅ FAQ Swiper inicializado com', totalSlides, 'perguntas');
}

// Adicionar efeitos de interação nos botões dos planos
document.addEventListener('DOMContentLoaded', function() {
  // Botões dos planos
  const planoButtons = document.querySelectorAll('.plano-card .btn');
  
  planoButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const planoCard = this.closest('.plano-card');
      const planName = planoCard.querySelector('h3').textContent;
      
      // Efeito visual
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
      
      // Simular ação (substituir por redirecionamento real)
      console.log('Plano selecionado:', planName);
      alert(`Você escolheu o ${planName}! Em breve implementaremos o sistema de cadastro.`);
      
      // Aqui você pode adicionar o redirecionamento para página de cadastro
      // window.location.href = '/cadastro?plano=' + encodeURIComponent(planName);
    });
  });
  
  // Efeitos de hover nos cards dos planos
  const planoCards = document.querySelectorAll('.plano-card');
  
  planoCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      if (this.classList.contains('featured')) {
        this.style.transform = 'scale(1.05)';
      } else {
        this.style.transform = '';
      }
    });
  });
  
  console.log('✅ Interações dos planos inicializadas');
});