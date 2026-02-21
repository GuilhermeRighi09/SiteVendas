
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
    });

    
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
        });
    });

    
    calcularTotalSocial();
});


function abrirAba(evt, nomeAba) {
    let i, tabcontent, tablinks;
    
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }
    
    
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    
    document.getElementById(nomeAba).style.display = "block";
    
    
    setTimeout(() => {
        document.getElementById(nomeAba).classList.add("active");
    }, 10);
    
    evt.currentTarget.className += " active";
}


let qtdPaginas = 0;

function mudarQtdSite(valor) {
    qtdPaginas += valor;
    if (qtdPaginas < 0) qtdPaginas = 0; 
    document.getElementById('qtdPaginas').value = qtdPaginas;
    calcularTotalSite();
}

function calcularTotalSite() {
    let total = 300; 

   
    total += (qtdPaginas * 50);
    
   
    let catalogo = parseInt(document.getElementById('selectCatalogo').value);
    total += catalogo;

    
    let extras = document.getElementsByClassName('extra-check-site');
    for (let i = 0; i < extras.length; i++) {
        if (extras[i].checked) {
            total += parseInt(extras[i].value);
        }
    }

    document.getElementById('valorTotalSite').innerText = `R$ ${total},00`;
    return total;
}


let qtdPosts = 0; 
let qtdReels = 0; 

function mudarQtdSocial(tipo, valor) {
    if (tipo === 'posts') {
        qtdPosts += valor;
        if (qtdPosts < 0) qtdPosts = 0;
        document.getElementById('qtdPosts').value = qtdPosts;
    } else if (tipo === 'reels') {
        qtdReels += valor;
        if (qtdReels < 0) qtdReels = 0;
        document.getElementById('qtdReels').value = qtdReels;
    }
    calcularTotalSocial();
}

function calcularTotalSocial() {
    let total = 0;
    
    
    let checkEstrategia = document.getElementById('checkEstrategia');
    if (checkEstrategia && checkEstrategia.checked) {
        total += parseInt(checkEstrategia.value);
    }
    
    
    total += (qtdPosts * 10);
    total += (qtdReels * 15);

    
    let btnSocial = document.querySelector("#aba-social .btn-whatsapp");
    if(btnSocial) {
        btnSocial.innerText = `Solicitar Proposta (Aprox. R$ ${total}/mês)`;
    }
    
    return total;
}


const numeroWhatsApp = "5519991650812";


function enviarFixo(plano, valor) {
    let texto = `Olá Guilherme! Estive no seu site e tenho interesse no plano *${plano}* no valor de R$ ${valor}. Podemos conversar?`;
    let url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
}


function enviarPersonalizadoSite() {
    let total = calcularTotalSite();
    let extrasTxt = [];
    let extras = document.getElementsByClassName('extra-check-site');
    
    for (let i = 0; i < extras.length; i++) {
        if (extras[i].checked) extrasTxt.push(extras[i].getAttribute('data-name'));
    }
    
    let catValue = document.getElementById('selectCatalogo').value;
    let catText = catValue > 0 ? (catValue == 150 ? "Catálogo Pequeno" : "Catálogo Médio") : "Sem Catálogo";

    let texto = `Olá Guilherme! Fiz uma simulação de Site no seu portfólio:\n\n` +
                `- Estrutura Base (R$ 300)\n` +
                `- ${qtdPaginas} Páginas Adicionais\n` +
                `- ${catText}\n`;
    
    if (extrasTxt.length > 0) texto += `- Extras: ${extrasTxt.join(', ')}\n`;
    
    texto += `\n*Investimento Único Estimado: R$ ${total},00*\nPodemos fechar negócio?`;
    
    let url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
}


function enviarPersonalizadoSocial() {
    let total = calcularTotalSocial();
    let est = document.getElementById('checkEstrategia').checked ? "Sim" : "Não";
    
    let texto = `Olá Guilherme! Fiz uma simulação de Social Media Mensal no seu site:\n\n` +
                `- Estratégia e Planejamento: ${est}\n` +
                `- Posts no Feed/Stories: ${qtdPosts}\n` +
                `- Vídeos Curtos (Reels/TikTok): ${qtdReels}\n` +
                `\n*Mensalidade Estimada: R$ ${total},00*\nPodemos conversar sobre essa proposta?`;
    
    let url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
}


const track = document.getElementById('track');
if (track) { 
    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const indicators = Array.from(document.querySelectorAll('.indicator'));
    let currentSlide = 0;

    function updateSlide(index) {
        track.style.transform = 'translateX(-' + (index * 100) + '%)';
        indicators.forEach(ind => ind.classList.remove('active'));
        indicators[index].classList.add('active');
    }

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide(currentSlide);
    });

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide(currentSlide);
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateSlide(currentSlide);
        });
    });
}