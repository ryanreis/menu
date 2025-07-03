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
        
        // Calcular progresso do scroll (0 a 1)
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
        
        // Aplicar transformações progressivas baseadas no progresso
        const mapaItems = document.querySelectorAll('.mapa-item');
        const imagemCentral = document.querySelector('.imagem-central img');
        
        mapaItems.forEach((item, index) => {
            if (originalPositions[index]) {
                const originalTop = originalPositions[index].top;
                const originalLeft = originalPositions[index].left;
                
                // Calcular posição progressiva (do original para o centro)
                const currentTop = progress * 50 + (1 - progress) * originalTop;
                const currentLeft = progress * 50 + (1 - progress) * originalLeft;
                
                // Aplicar transformação progressiva
                item.style.transform = `translate(${currentLeft - 50}%, ${currentTop - 50}%)`;
                
                // Escala progressiva da imagem
                const scale = 1 - (progress * 0.8);
                const opacity = 1 - progress;
                
                const img = item.querySelector('img');
                if (img) {
                    img.style.transform = `scale(${scale})`;
                    img.style.opacity = opacity;
                }
            }
        });
        
        // Animar imagem central
        if (imagemCentral) {
            const centralScale = 1 + (progress * 0.5);
            imagemCentral.style.transform = `scale(${centralScale})`;
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

// Inicializar animações
document.addEventListener('DOMContentLoaded', () => {
    animateMapaMental();
    
    // Armazenar posições originais
    const mapaItems = document.querySelectorAll('.mapa-item');
    mapaItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const containerRect = document.querySelector('.mapa-container').getBoundingClientRect();
        
        originalPositions.push({
            top: ((rect.top - containerRect.top) / containerRect.height) * 100,
            left: ((rect.left - containerRect.left) / containerRect.width) * 100
        });
    });
}); 