document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DE NAVEGACIÓN POR PESTAÑAS (TABS) ---
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');

    function showTab(targetId) {
        // Ocultar todos los contenidos de las pestañas
        tabContents.forEach(content => {
            content.classList.remove('active-tab');
        });

        // Mostrar el contenido deseado
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.classList.add('active-tab');
            // Asegura que el scroll esté arriba
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Remover la clase activa de todos los enlaces de navegación
        navLinks.forEach(link => {
            link.classList.remove('active-link');
        });

        // Añadir la clase activa al enlace clicado
        const activeLink = document.querySelector(`a[href="${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active-link');
        }
    }

    // Manejador de clic para los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Evita el comportamiento por defecto del enlace (ir a la ancla)
            const targetId = link.getAttribute('href');
            showTab(targetId);
        });
    });

    // Inicializar la pestaña 'inicio' al cargar la página
    showTab('#inicio'); 

    // --- LÓGICA DE CAMBIO DE IMAGEN EN INICIO (Solicitud 3) ---
    const mainProfilePic = document.getElementById('main-profile-pic');
    const mainPhotoFrame = document.getElementById('main-photo-frame');
    const images = [
        "https://xatimg.com/image/Nf3PO2gv9jk1.jpg", // Foto Inicial
        "https://xatimg.com/image/45sAHFD1nJSM.jpg", 
        "https://xatimg.com/image/2MaN1JR2bROp.jpg",
    ];
    let currentImageIndex = 0;
    let intervalId;

    function changeImage(index) {
        // Aplicar la transición de opacidad
        mainProfilePic.style.opacity = 0;

        setTimeout(() => {
            mainProfilePic.src = images[index];
            mainProfilePic.alt = `Foto principal de Solange ${index + 1}`;
            mainProfilePic.style.opacity = 1;
        }, 500); // Espera 500ms (la duración de la transición CSS)
    }

    function startAutoChange() {
        intervalId = setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            changeImage(currentImageIndex);
        }, 5000); // Cambia cada 5 segundos
    }

    function stopAutoChange() {
        clearInterval(intervalId);
    }

    // 1. Inicio del cambio automático
    startAutoChange();

    // 2. Comportamiento al pasar el ratón (Hover)
    mainPhotoFrame.addEventListener('mouseenter', () => {
        stopAutoChange(); // Detiene el cambio automático
        // Pasa a la siguiente imagen inmediatamente al hacer hover
        currentImageIndex = (currentImageIndex + 1) % images.length;
        changeImage(currentImageIndex);
    });

    mainPhotoFrame.addEventListener('mouseleave', () => {
        startAutoChange(); // Reanuda el cambio automático
    });
    
    // --- LÓGICA DE CARRUSEL/SLIDER EN GALERÍA (Solicitud 1) ---
    const slider = document.getElementById('gallery-slider');
    const slides = document.querySelectorAll('.slider-img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.getElementById('slider-dots');
    
    if (slider && slides.length > 0) {
        let currentIndex = 0;
        
        // Crea los puntos indicadores
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                moveToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function updateDots(index) {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        }

        function moveToSlide(index) {
            if (index < 0) {
                currentIndex = slides.length - 1;
            } else if (index >= slides.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }

            // Calcula el desplazamiento: -100% * index
            const offset = -currentIndex * 100;
            slider.style.transform = `translateX(${offset}%)`;
            
            updateDots(currentIndex);
        }

        prevBtn.addEventListener('click', () => {
            moveToSlide(currentIndex - 1);
        });

        nextBtn.addEventListener('click', () => {
            moveToSlide(currentIndex + 1);
        });
        
        // Carrusel automático para la galería (opcional)
        // setInterval(() => {
        //     moveToSlide(currentIndex + 1);
        // }, 7000); // 7 segundos para el carrusel de la galería
    }
});
