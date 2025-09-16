// RTX ONE - Versão Conservadora
// JavaScript simples e acessível para público 40-60 anos

(function() {
    'use strict';
    
    // Aguarda o carregamento completo da página
    document.addEventListener('DOMContentLoaded', function() {
        initializeApp();
    });

    // Inicialização principal
    function initializeApp() {
        console.log('RTX ONE - Versão Conservadora carregada');
        
        // Inicializar componentes
        initMobileNavigation();
        initSmoothScrolling();
        initFAQAccordion();
        initContactForm();
        initHeaderScroll();
        updateCurrentYear();
        
        console.log('Todos os componentes inicializados com sucesso');
    }

    // Navegação mobile
    function initMobileNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const nav = document.querySelector('.site-nav');
        
        if (!navToggle || !nav) return;

        navToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle aria-expanded
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle navigation visibility
            if (isExpanded) {
                nav.style.display = 'none';
            } else {
                nav.style.display = 'flex';
                nav.style.flexDirection = 'column';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.right = '0';
                nav.style.background = 'white';
                nav.style.padding = '1rem';
                nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                nav.style.borderTop = '1px solid #E2E8F0';
            }
        });

        // Fechar menu ao clicar em um link
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                nav.style.display = 'none';
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Fechar menu ao redimensionar para desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) {
                nav.style.display = '';
                nav.style.flexDirection = '';
                nav.style.position = '';
                nav.style.top = '';
                nav.style.left = '';
                nav.style.right = '';
                nav.style.background = '';
                nav.style.padding = '';
                nav.style.boxShadow = '';
                nav.style.borderTop = '';
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        console.log('Navegação mobile inicializada');
    }

    // Scroll suave para âncoras
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Ignorar links vazios
                if (href === '#' || href === '#!') return;
                
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.site-header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        console.log('Scroll suave inicializado para', links.length, 'links');
    }

    // Accordion do FAQ
    function initFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(function(item) {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (!question || !answer) return;

            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Fechar todas as outras perguntas
                faqItems.forEach(function(otherItem) {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0';
                        }
                    }
                });
                
                // Toggle da pergunta atual
                if (isActive) {
                    item.classList.remove('active');
                    answer.style.maxHeight = '0';
                } else {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });

        console.log('FAQ Accordion inicializado com', faqItems.length, 'perguntas');
    }

    // Formulário de contato
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulário
            if (validateContactForm()) {
                submitContactForm();
            }
        });

        // Validação em tempo real
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(function(input) {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });

        console.log('Formulário de contato inicializado');
    }

    // Validar formulário de contato
    function validateContactForm() {
        const form = document.getElementById('contactForm');
        const nome = form.querySelector('#nome');
        const email = form.querySelector('#email');
        const telefone = form.querySelector('#telefone');
        const interesse = form.querySelector('#interesse');
        
        let isValid = true;

        // Validar nome
        if (!nome.value.trim()) {
            showFieldError(nome, 'Por favor, informe seu nome completo');
            isValid = false;
        } else if (nome.value.trim().length < 2) {
            showFieldError(nome, 'Nome deve ter pelo menos 2 caracteres');
            isValid = false;
        }

        // Validar email
        if (!email.value.trim()) {
            showFieldError(email, 'Por favor, informe seu e-mail');
            isValid = false;
        } else if (!isValidEmail(email.value.trim())) {
            showFieldError(email, 'Por favor, informe um e-mail válido');
            isValid = false;
        }

        // Validar telefone
        if (!telefone.value.trim()) {
            showFieldError(telefone, 'Por favor, informe seu telefone');
            isValid = false;
        } else if (!isValidPhone(telefone.value.trim())) {
            showFieldError(telefone, 'Por favor, informe um telefone válido');
            isValid = false;
        }

        // Validar interesse
        if (!interesse.value) {
            showFieldError(interesse, 'Por favor, selecione seu interesse');
            isValid = false;
        }

        return isValid;
    }

    // Validar campo individual
    function validateField(field) {
        const value = field.value.trim();
        
        switch (field.type) {
            case 'email':
                if (value && !isValidEmail(value)) {
                    showFieldError(field, 'Por favor, informe um e-mail válido');
                    return false;
                }
                break;
            case 'tel':
                if (value && !isValidPhone(value)) {
                    showFieldError(field, 'Por favor, informe um telefone válido');
                    return false;
                }
                break;
        }
        
        clearFieldError(field);
        return true;
    }

    // Validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validar telefone
    function isValidPhone(phone) {
        const cleanPhone = phone.replace(/\D/g, '');
        return cleanPhone.length >= 10 && cleanPhone.length <= 11;
    }

    // Mostrar erro no campo
    function showFieldError(field, message) {
        clearFieldError(field);
        
        field.style.borderColor = '#E53E3E';
        field.style.backgroundColor = '#FED7D7';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = '#E53E3E';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }

    // Limpar erro do campo
    function clearFieldError(field) {
        field.style.borderColor = '';
        field.style.backgroundColor = '';
        
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    // Enviar formulário
    function submitContactForm() {
        const form = document.getElementById('contactForm');
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Mostrar loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        // Simular envio (substituir por integração real)
        setTimeout(function() {
            // Sucesso
            showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            form.reset();
            
            // Restaurar botão
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
        }, 2000);
    }

    // Mostrar notificação
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        if (type === 'success') {
            notification.style.background = '#38A169';
        } else {
            notification.style.background = '#E53E3E';
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover após 5 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Efeito de scroll no header
    function initHeaderScroll() {
        const header = document.querySelector('.site-header');
        if (!header) return;

        let lastScrollY = window.scrollY;
        let isScrolled = false;

        function handleScroll() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100 && !isScrolled) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
                isScrolled = true;
            } else if (currentScrollY <= 100 && isScrolled) {
                header.style.background = 'white';
                header.style.backdropFilter = 'none';
                isScrolled = false;
            }
            
            lastScrollY = currentScrollY;
        }

        // Throttle do scroll para performance
        let ticking = false;
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(handleScroll);
                ticking = true;
                setTimeout(() => { ticking = false; }, 10);
            }
        }

        window.addEventListener('scroll', requestTick);
        console.log('Efeito de scroll do header inicializado');
    }

    // Atualizar ano atual
    function updateCurrentYear() {
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // Funcionalidades de acessibilidade
    function initAccessibility() {
        // Melhorar navegação por teclado
        const focusableElements = document.querySelectorAll(
            'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(function(element) {
            element.addEventListener('focus', function() {
                this.style.outline = '3px solid rgba(44, 95, 65, 0.5)';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = '';
                this.style.outlineOffset = '';
            });
        });

        // Skip link para navegação
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Pular para o conteúdo principal';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #2C5F41;
            color: white;
            padding: 8px;
            border-radius: 4px;
            text-decoration: none;
            font-weight: 600;
            z-index: 1000;
            transition: top 0.2s ease;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        console.log('Funcionalidades de acessibilidade inicializadas');
    }

    // Formatação automática de telefone
    function initPhoneFormatting() {
        const phoneInput = document.getElementById('telefone');
        if (!phoneInput) return;

        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length >= 11) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 6) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else if (value.length >= 2) {
                value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            }
            
            e.target.value = value;
        });
    }

    // Lazy loading para imagens (se houver)
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if (images.length === 0) return;

        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(function(img) {
            imageObserver.observe(img);
        });

        console.log('Lazy loading inicializado para', images.length, 'imagens');
    }

    // Função para detectar preferências de movimento reduzido
    function respectMotionPreferences() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Remover animações para usuários que preferem movimento reduzido
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
            console.log('Movimento reduzido aplicado conforme preferência do usuário');
        }
    }

    // Inicializar funcionalidades adicionais quando a página carregar
    window.addEventListener('load', function() {
        initAccessibility();
        initPhoneFormatting();
        initLazyLoading();
        respectMotionPreferences();
    });

    // Função global para debug (apenas em desenvolvimento)
    window.RTXDebug = {
        showInfo: function() {
            console.log('RTX ONE - Versão Conservadora');
            console.log('Desenvolvido para público 40-60 anos');
            console.log('Funcionalidades ativas:', {
                navegacaoMobile: !!document.querySelector('.nav-toggle'),
                faq: document.querySelectorAll('.faq-item').length,
                formulario: !!document.getElementById('contactForm'),
                scrollSuave: document.querySelectorAll('a[href^="#"]').length
            });
        }
    };

})();