document.addEventListener('DOMContentLoaded', function() {
    
    // --- MENU MOBILE ---
    const navSlide = () => {
        const burger = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        if(burger) {
            burger.addEventListener('click', () => {
                nav.classList.toggle('nav-active');
                burger.classList.toggle('toggle');
            });
        }
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
            });
        });
    }
    navSlide();

    // --- SCROLL SUAVE ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target){
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- CARROSSEL ---
    const track = document.getElementById('track');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    let autoSlideInterval;

    function updateCarousel() {
        if(!track) return;
        const width = track.offsetWidth; 
        track.style.transform = `translateX(-${currentIndex * width}px)`;

        indicators.forEach((ind, index) => {
            if(index === currentIndex) {
                ind.classList.add('active');
            } else {
                ind.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        if(!track) return;
        if (currentIndex < indicators.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }

    function prevSlide() {
        if(!track) return;
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = indicators.length - 1;
        }
        updateCarousel();
    }

    // Configura o Automático (5 segundos)
    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    // Reseta o timer se o usuário clicar manualmente
    function resetTimer() {
        startAutoSlide();
    }

    if(nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });
    }

    // Iniciar
    updateCarousel();
    startAutoSlide();
    window.addEventListener('resize', updateCarousel);


    // --- CALCULADORA ---
    // Torna as funções acessíveis globalmente (fora do DOMContentLoaded) para os onclick do HTML
    window.mudarQtd = function(valor) {
        const input = document.getElementById('qtdPaginas');
        let novaQtd = parseInt(input.value) + valor;
        if (novaQtd < 0) novaQtd = 0;
        input.value = novaQtd;
        calcularTotal();
    };

    window.calcularTotal = function() {
        const precoBase = 300;
        const precoPorPagina = 100;
        let total = precoBase;

        // 1. Soma Páginas
        const inputPaginas = document.getElementById('qtdPaginas');
        if(inputPaginas) {
            const qtdPaginas = parseInt(inputPaginas.value);
            total += (qtdPaginas * precoPorPagina);
        }

        // 2. Soma Catálogo
        const catalogo = document.getElementById('selectCatalogo');
        if(catalogo) {
            total += parseInt(catalogo.value);
        }

        // 3. Soma Extras
        const extras = document.querySelectorAll('.extra-check:checked');
        extras.forEach(check => {
            total += parseInt(check.value);
        });

        // Atualiza na tela
        const displayTotal = document.getElementById('valorTotal');
        if(displayTotal) {
            displayTotal.innerText = `R$ ${total}`;
        }
    };

    // Funções de Envio WhatsApp
    const SEU_TELEFONE = "5519991650812"; 

    window.enviarFixo = function(nomePlano, valor) {
        const texto = `Olá Guilherme! \nTenho interesse no *Plano ${nomePlano}* de R$ ${valor}.\nComo funciona para iniciarmos?`;
        abrirWhats(texto);
    };

    window.enviarPersonalizado = function() {
        const totalElement = document.getElementById('valorTotal');
        const total = totalElement ? totalElement.innerText : "R$ 0";
        
        const inputPaginas = document.getElementById('qtdPaginas');
        const qtdPaginas = inputPaginas ? inputPaginas.value : 0;
        
        const catalogoSelect = document.getElementById('selectCatalogo');
        const nomeCatalogo = catalogoSelect ? catalogoSelect.options[catalogoSelect.selectedIndex].text : "Padrão";

        let listaExtras = [];
        document.querySelectorAll('.extra-check:checked').forEach(check => {
            listaExtras.push(check.getAttribute('data-name'));
        });

        let texto = `Olá Guilherme! \nMontei um orçamento personalizado no site:\n\n`;
        texto += ` *Base:* Estrutura Inicial\n`;
        texto += ` *Páginas Extras:* ${qtdPaginas}\n`;
        texto += ` *Catálogo:* ${nomeCatalogo}\n`;
        
        if (listaExtras.length > 0) {
            texto += ` *Adicionais:* ${listaExtras.join(', ')}\n`;
        }

        texto += `\n *Valor Estimado:* ${total}`;
        texto += `\n\nPodemos fechar?`;

        abrirWhats(texto);
    };

    function abrirWhats(mensagem) {
        const url = `https://wa.me/${19991650812}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank');
    }
});