// Menu hambúrguer responsivo
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Scroll suave para as seções
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

// Adicionar classe ativa ao link da seção atual
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Animação progressiva do mapa mental baseada no scroll
    const mapaContainer = document.querySelector('.mapa-container');
    if (mapaContainer) {
        const rect = mapaContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const isMobile = window.innerWidth <= 768;
        
        // Calcular progresso do scroll (0 a 1)
        let progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
        // Só começa a animar depois de 10% do scroll
        const start = 0.1;
        if (progress < start) progress = 0;
        else progress = (progress - start) / (1 - start);
        progress = Math.max(0, Math.min(1, progress));
        
        // Aplicar transformações progressivas baseadas no progresso
        const mapaItems = document.querySelectorAll('.mapa-item');
        const imagemCentral = document.querySelector('.imagem-central img');
        
        mapaItems.forEach((item) => {
            const img = item.querySelector('img');
            if (progress === 0) {
                // Estado inicial exato
                if (img) {
                    img.style.transform = '';
                    img.style.opacity = 1;
                }
            } else if (progress === 1) {
                // Estado final exato (tudo no centro e invisível)
                if (img) {
                    img.style.transform = 'scale(0.2)';
                    img.style.opacity = 0;
                }
            } else {
                // Estado intermediário
                const scale = isMobile ? (1 - (progress * 0.9)) : (1 - (progress * 0.8));
                const opacity = 1 - progress;
                if (img) {
                    img.style.transform = `scale(${scale})`;
                    img.style.opacity = opacity;
                }
            }
        });
        
        // Animar imagem central (ajustada para mobile)
        if (imagemCentral) {
            if (progress === 0) {
                imagemCentral.style.transform = '';
            } else {
                const centralScale = isMobile ? (1 + (progress * 0.3)) : (1 + (progress * 0.5));
                imagemCentral.style.transform = `scale(${centralScale})`;
            }
        }
    }
});

// Função para animação suave do mapa mental
function animateMapaMental() {
    const mapaContainer = document.querySelector('.mapa-container');
    if (!mapaContainer) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adicionar animação quando a seção estiver visível
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    observer.observe(mapaContainer);
}

// Armazenar posições originais dos itens
let originalPositions = [];

// Função para recalcular posições originais
function recalculateOriginalPositions() {
    originalPositions = [];
    const mapaItems = document.querySelectorAll('.mapa-item');
    const containerRect = document.querySelector('.mapa-container').getBoundingClientRect();
    
    mapaItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        originalPositions.push({
            top: ((rect.top - containerRect.top) / containerRect.height) * 100,
            left: ((rect.left - containerRect.left) / containerRect.width) * 100
        });
    });
}

// Inicializar animações
document.addEventListener('DOMContentLoaded', () => {
    animateMapaMental();
    // Pequeno delay para garantir que o layout esteja pronto, especialmente no mobile
    setTimeout(recalculateOriginalPositions, 200);
});

// Recalcular posições quando a tela for redimensionada
window.addEventListener('resize', () => {
    setTimeout(recalculateOriginalPositions, 100);
});

// Recalcular posições quando a orientação do dispositivo mudar
window.addEventListener('orientationchange', () => {
    setTimeout(recalculateOriginalPositions, 300);
});

// Formulário de contato para WhatsApp
const contatoForm = document.getElementById('contatoForm');
if (contatoForm) {
    contatoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nome = document.getElementById('nome').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        const numero = '94984046320';
        const texto = `Olá, me chamo ${nome}. ${mensagem}`;
        const url = `https://wa.me/55${numero}?text=${encodeURIComponent(texto)}`;
        window.open(url, '_blank');
    });
} 