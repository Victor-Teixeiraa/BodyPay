/* ============================================
   BodyPay - JAVASCRIPT
   Script otimizado para o design da BodyPay
   ============================================ */

// Barra de carregamento
const loadingBar = document.getElementById('loading-bar');
if (loadingBar) {
    loadingBar.style.width = '30%';

    window.addEventListener('load', () => {
        loadingBar.style.width = '100%';
        setTimeout(() => {
            loadingBar.style.opacity = '0';
            setTimeout(() => loadingBar.remove(), 300);
        }, 200);
    });

    // Progresso simulado
    setTimeout(() => { if (loadingBar) loadingBar.style.width = '50%'; }, 300);
    setTimeout(() => { if (loadingBar) loadingBar.style.width = '70%'; }, 600);
}

document.addEventListener('DOMContentLoaded', function () {

    /* ============================================
       MENU MOBILE
       Abre e fecha o menu em dispositivos móveis
       ============================================ */
    /* ============================================
       MENU MOBILE (Dual Architecture Refactor)
       ============================================ */
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileClose = document.getElementById('mobile-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    // Função para abrir menu
    function openMenu(e) {
        if (e && e.cancelable) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (mobileMenu) {
            mobileMenu.classList.add('show');
            document.body.style.overflow = 'hidden';

            if (mobileOverlay) {
                mobileOverlay.classList.add('show');
            }

            // ESCONDER O BOTÃO TOGGLE ENQUANTO O MENU ESTÁ ABERTO
            if (navToggle) {
                navToggle.style.opacity = '0';
                navToggle.style.visibility = 'hidden';
            }
        }
    }

    // Função para fechar menu
    function closeMenu(e) {
        if (mobileMenu) {
            mobileMenu.classList.remove('show');
            document.body.style.overflow = '';

            if (mobileOverlay) {
                mobileOverlay.classList.remove('show');
            }

            // MOSTRAR O BOTÃO TOGGLE NOVAMENTE
            if (navToggle) {
                navToggle.style.opacity = '1';
                navToggle.style.visibility = 'visible';
            }
        }
    }

    // Handler para botão fechar
    function handleCloseButton(e) {
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
    }

    // Abre o menu
    if (navToggle) {
        navToggle.addEventListener('click', openMenu);
        navToggle.addEventListener('touchstart', openMenu, { passive: false });
    }

    // Fecha o menu (Botão X)
    if (mobileClose) {
        mobileClose.addEventListener('click', handleCloseButton);
        mobileClose.addEventListener('touchstart', handleCloseButton, { passive: false });
    }

    // Fecha o menu (Overlay)
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', handleCloseButton);
        mobileOverlay.addEventListener('touchstart', handleCloseButton, { passive: false });
    }

    // Fecha o menu ao clicar em um link (Permite navegação)
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    /* ============================================
       SCROLL ATIVO
       Destaca o link do menu da seção visível
       ============================================ */
    function scrollActive() {
        const scrollY = window.pageYOffset;
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const sectionLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (sectionLink) {
                    sectionLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', scrollActive);

    /* ============================================
       SMOOTH SCROLL APRIMORADO
       Rolagem suave com easing customizado
       ============================================ */

    // Função de easing customizada
    // Remover smoothScrollTo e listeners manuais pois usaremos CSS scroll-behavior: smooth
    // Isso garante que o navegador gerencie a navegação nativamente sem conflitos

    /* ============================================
       BOTÃO "VER COMO FUNCIONA"
       Pode ser customizado para abrir modal/vídeo
       ============================================ */
    const btnComoFunciona = document.getElementById('btn-como-funciona');

    if (btnComoFunciona) {
        btnComoFunciona.addEventListener('click', function () {
            // Rola para a seção de soluções
            const solucoes = document.getElementById('solucoes');
            if (solucoes) {
                const headerHeight = 80;
                const targetPosition = solucoes.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }

            // Alternativa: Abrir modal com vídeo
            // showVideoModal('https://www.youtube.com/embed/...');
        });
    }

    /* ============================================
       SCROLL REVEAL ANIMATIONS APRIMORADO
       Animações suaves quando elementos entram na viewport
       DESABILITADO NO MOBILE
       ============================================ */

    // Configuração otimizada do Intersection Observer
    const isMobile = window.innerWidth <= 768;

    // Apenas ativa animações em desktop
    if (!isMobile) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animação imediata
                    entry.target.classList.add('animate-in');

                    // Remove will-change após animação completar (economia de GPU)
                    setTimeout(() => {
                        entry.target.style.willChange = 'auto';
                    }, 450);

                    // Desativa observação após animar (melhor performance)
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Elementos a serem animados
        const animatedElements = document.querySelectorAll(`
            .section__header,
            .solution-card,
            .feature,
            .benefit,
            .management__visual,
            .management__content,
            .financing-hero__content,
            .financing-hero__visual,
            .financing-ideal,
            .financing-why__card,
            .cta__content,
            .stat
        `);

        // Observar cada elemento com delay escalonado
        animatedElements.forEach((el, index) => {
            const cardDelay = 0.08;
            const itemDelay = 0.1;

            // Adicionar delay escalonado para cards em grid
            if (el.classList.contains('solution-card') ||
                el.classList.contains('benefit') ||
                el.classList.contains('financing-why__card')) {
                // Encontrar índice dentro do container pai
                const parent = el.parentElement;
                const siblings = Array.from(parent.children).filter(child =>
                    child.classList.contains('solution-card') ||
                    child.classList.contains('benefit') ||
                    child.classList.contains('financing-why__card')
                );
                const siblingIndex = siblings.indexOf(el);
                el.style.transitionDelay = `${siblingIndex * cardDelay}s`;
            } else if (el.classList.contains('feature') || el.classList.contains('stat')) {
                const parent = el.parentElement;
                const siblings = Array.from(parent.children).filter(child =>
                    child.classList.contains('feature') || child.classList.contains('stat')
                );
                const siblingIndex = siblings.indexOf(el);
                el.style.transitionDelay = `${siblingIndex * itemDelay}s`;
            }

            observer.observe(el);
        });
    } else {
        // No mobile, adiciona animate-in imediatamente para todos os elementos
        const animatedElements = document.querySelectorAll(`
            .section__header,
            .solution-card,
            .feature,
            .benefit,
            .management__visual,
            .management__content,
            .financing-hero__content,
            .financing-hero__visual,
            .financing-ideal,
            .financing-why__card,
            .cta__content,
            .stat
        `);

        animatedElements.forEach(el => {
            el.classList.add('animate-in');
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    /* ============================================
       ANIMAÇÃO PROGRESSIVA AO ROLAR
       Suaviza ainda mais a experiência de scroll
       DESABILITADO NO MOBILE
       ============================================ */
    let ticking = false;

    function updateAnimations() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;

        // Efeito parallax suave apenas em desktop (desabilitado no mobile)
        if (window.innerWidth > 768) {
            const parallaxElements = document.querySelectorAll('.hero__visual, .management__image');

            parallaxElements.forEach(el => {
                const elementTop = el.getBoundingClientRect().top;
                const elementVisible = elementTop < windowHeight;

                if (elementVisible && elementTop > -el.offsetHeight) {
                    const scrollPercent = (windowHeight - elementTop) / (windowHeight + el.offsetHeight);
                    const translateY = scrollPercent * 30;

                    el.style.transform = `translateY(${translateY}px)`;
                }
            });
        } else {
            // No mobile, remove qualquer transform aplicado
            const parallaxElements = document.querySelectorAll('.hero__visual, .management__image');
            parallaxElements.forEach(el => {
                el.style.transform = 'none';
            });
        }

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }

    // Apenas adiciona o listener de scroll em desktop
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', requestTick, { passive: true });
    }

    /* ============================================
       FIX PARA IMAGENS NO SAFARI
       Garante carregamento correto das imagens
       ============================================ */
    function fixSafariImages() {
        const criticalImages = document.querySelectorAll('.card__image, .management__image, .financing-hero__image, .partners-carousel__item img');

        criticalImages.forEach(img => {
            // Força exibição imediata
            img.style.opacity = '1';
            img.style.visibility = 'visible';
            img.style.display = 'block';

            // Se a imagem já carregou
            if (img.complete && img.naturalHeight !== 0) {
                img.style.opacity = '1';
            } else {
                // Listener de load
                img.addEventListener('load', function () {
                    this.style.opacity = '1';
                    this.style.visibility = 'visible';
                    this.style.display = 'block';
                });

                // Listener de erro com retry
                img.addEventListener('error', function () {
                    console.warn('Erro ao carregar imagem:', this.src);
                    const src = this.src;
                    this.src = '';
                    setTimeout(() => {
                        this.src = src;
                    }, 100);
                });
            }
        });
    }

    // Executa imediatamente
    fixSafariImages();

    // Executa novamente no DOMContentLoaded
    document.addEventListener('DOMContentLoaded', fixSafariImages);

    // Executa no load completo
    window.addEventListener('load', fixSafariImages);

    // Força renderização múltiplas vezes (fallback agressivo)
    [100, 300, 500, 1000].forEach(delay => {
        setTimeout(() => {
            const allImages = document.querySelectorAll('img');
            allImages.forEach(img => {
                img.style.opacity = '1';
                img.style.visibility = 'visible';
                img.style.display = 'block';
            });
        }, delay);
    });

    /* ============================================
       FIX ADICIONAL PARA SAFARI iOS
       Previne bugs de rendering e overflow
       ============================================ */
    function fixSafariIOS() {
        // Detecta Safari iOS
        const isSafariIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        if (isSafariIOS) {
            // Fix para viewport height
            const setVH = () => {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            };

            setVH();
            window.addEventListener('resize', setVH);
            window.addEventListener('orientationchange', setVH);

            // Force repaint para prevenir bugs de rendering
            setTimeout(() => {
                document.body.style.display = 'none';
                document.body.offsetHeight;
                document.body.style.display = '';
            }, 100);
        }
    }

    fixSafariIOS();

    /* ============================================
       CARROSSEL INFINITO
       Implementa scroll infinito nos carrosséis mobile
       ============================================ */
    function setupInfiniteCarousel() {
        const carousels = document.querySelectorAll('[data-carousel="infinite"]');

        carousels.forEach(carousel => {
            let isScrolling;
            let scrollDirection = null;
            let lastScrollLeft = 0;

            carousel.addEventListener('scroll', function() {
                const currentScrollLeft = this.scrollLeft;
                const maxScroll = this.scrollWidth - this.clientWidth;
                const cards = Array.from(this.children).filter(child => !child.hasAttribute('aria-hidden'));
                const cardWidth = cards[0]?.offsetWidth || 0;
                const gap = parseInt(window.getComputedStyle(this).gap) || 0;
                const totalCardWidth = cardWidth + gap;

                // Detecta direção do scroll
                if (currentScrollLeft > lastScrollLeft) {
                    scrollDirection = 'right';
                } else if (currentScrollLeft < lastScrollLeft) {
                    scrollDirection = 'left';
                }
                lastScrollLeft = currentScrollLeft;

                // Limpa timeout anterior
                clearTimeout(isScrolling);

                // Define novo timeout para detectar fim do scroll
                isScrolling = setTimeout(() => {
                    // Scrollando para a direita - chegou no final
                    if (scrollDirection === 'right' && currentScrollLeft >= maxScroll - 50) {
                        // Volta para o início (considerando os cards duplicados)
                        this.scrollTo({
                            left: totalCardWidth * 3,
                            behavior: 'auto'
                        });
                    }
                    // Scrollando para a esquerda - chegou no início
                    else if (scrollDirection === 'left' && currentScrollLeft <= 50) {
                        // Vai para o final (antes dos cards duplicados)
                        this.scrollTo({
                            left: maxScroll - (totalCardWidth * 3),
                            behavior: 'auto'
                        });
                    }
                }, 50);
            });
        });
    }

    // Apenas ativa em mobile
    if (window.innerWidth <= 1024) {
        setupInfiniteCarousel();
    }

    // Reativa ao redimensionar para mobile
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 1024) {
            setupInfiniteCarousel();
        }
    });

    /* ============================================
       CONSOLE LOG
       Easter egg para desenvolvedores
       ============================================ */
    console.log(
        '%c🚀 BodyPay',
        'font-size: 24px; font-weight: bold; color: #5B4FE6;'
    );
    console.log(
        '%c💼 Plataforma Completa de Pagamentos',
        'font-size: 14px; color: #6B7280;'
    );
});

