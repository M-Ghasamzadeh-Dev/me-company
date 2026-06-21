// ===== Custom Cursor =====
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

if (window.innerWidth > 768 && cursor && cursorDot) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        dotX += (mouseX - dotX) * 0.5;
        dotY += (mouseY - dotY) * 0.5;

        cursor.style.left = cursorX - 20 + 'px';
        cursor.style.top = cursorY - 20 + 'px';
        cursorDot.style.left = dotX - 4 + 'px';
        cursorDot.style.top = dotY - 4 + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    document.querySelectorAll('a, button, .portfolio-item, .service-card, .bento-item, .testimonial-card, input, textarea, select').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        el.addEventListener('mousedown', () => cursor.classList.add('click'));
        el.addEventListener('mouseup', () => cursor.classList.remove('click'));
    });
}

// ===== Mobile Menu =====
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');

if (menuToggle && mobileMenu && mobileOverlay) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileOverlay.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        navbar.style.boxShadow = 'none';
    }

    if (currentScroll > lastScroll && currentScroll > 300) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== Hero Particles =====
function createHeroParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('hero-particle');

        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = Math.random() * 15 + 15;
        const opacity = Math.random() * 0.5 + 0.2;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            bottom: -10px;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            opacity: ${opacity};
        `;

        container.appendChild(particle);
    }
}

createHeroParticles();

// ===== GSAP Scroll Animations =====
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Fade up animations
    document.querySelectorAll('[data-gsap="fade-up"]').forEach(el => {
        const delay = parseFloat(el.dataset.delay) || 0;
        gsap.from(el, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: delay,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Hero title animation
    gsap.from('.hero-title .title-line', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.3
    });

    gsap.from('.hero-badge', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.1
    });

    gsap.from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.6
    });

    gsap.from('.hero-tagline', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8
    });

    gsap.from('.hero-buttons', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1
    });

    // About section parallax
    gsap.to('#aboutParallaxImg', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
            trigger: '.about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });

    // Stats counter animation
    document.querySelectorAll('.stat-number[data-count]').forEach(stat => {
        const target = parseInt(stat.dataset.count);
        gsap.to(stat, {
            innerHTML: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            scrollTrigger: {
                trigger: stat,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            onUpdate: function() {
                stat.innerHTML = Math.round(this.targets()[0].innerHTML).toLocaleString('fa-IR');
            }
        });
    });
}

// ===== Portfolio Horizontal Scroll =====
const portfolioTrack = document.getElementById('portfolioTrack');
const portfolioPrev = document.getElementById('portfolioPrev');
const portfolioNext = document.getElementById('portfolioNext');
const portfolioDots = document.getElementById('portfolioDots');

if (portfolioTrack && portfolioPrev && portfolioNext) {
    const items = portfolioTrack.querySelectorAll('.portfolio-item');
    let currentIndex = 0;

    // Create dots
    if (portfolioDots) {
        items.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('portfolio-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            portfolioDots.appendChild(dot);
        });
    }

    function goToSlide(index) {
        if (index < 0) index = 0;
        if (index >= items.length) index = items.length - 1;
        currentIndex = index;

        const itemWidth = items[0].offsetWidth + 24; // gap
        portfolioTrack.scrollTo({
            left: index * itemWidth,
            behavior: 'smooth'
        });

        // Update dots
        portfolioDots.querySelectorAll('.portfolio-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    portfolioPrev.addEventListener('click', () => goToSlide(currentIndex - 1));
    portfolioNext.addEventListener('click', () => goToSlide(currentIndex + 1));

    // Auto scroll
    let autoScrollInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        goToSlide(currentIndex);
    }, 5000);

    portfolioTrack.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    portfolioTrack.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            goToSlide(currentIndex);
        }, 5000);
    });
}

// ===== Shop Filters =====
const filterBtns = document.querySelectorAll('.filter-btn');
const bentoItems = document.querySelectorAll('.bento-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        bentoItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'flex';
                gsap.fromTo(item, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4 });
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ===== Cart / Add to Cart =====
const cartNotification = document.getElementById('cartNotification');
const cartNotificationProduct = document.getElementById('cartNotificationProduct');

function showCartNotification(productName) {
    if (!cartNotification || !cartNotificationProduct) return;

    cartNotificationProduct.textContent = productName;
    cartNotification.classList.add('show');

    setTimeout(() => {
        cartNotification.classList.remove('show');
    }, 3000);
}

document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const productName = btn.dataset.product;
        const price = btn.dataset.price;

        // Add to localStorage cart
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.push({ name: productName, price: price, date: new Date().toISOString() });
        localStorage.setItem('cart', JSON.stringify(cart));

        showCartNotification(productName);

        // Button animation
        btn.innerHTML = '✓';
        btn.style.background = '#22c55e';
        setTimeout(() => {
            btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM20 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>`;
            btn.style.background = '';
        }, 2000);
    });
});

// ===== Testimonials Carousel =====
const testimonialsTrack = document.getElementById('testimonialsTrack');
const testimonialPrev = document.getElementById('testimonialPrev');
const testimonialNext = document.getElementById('testimonialNext');
const testimonialDots = document.getElementById('testimonialDots');

if (testimonialsTrack && testimonialPrev && testimonialNext) {
    const cards = testimonialsTrack.querySelectorAll('.testimonial-card');
    let testimonialIndex = 0;
    const cardsPerView = window.innerWidth > 768 ? 3 : 1;
    const maxIndex = Math.max(0, cards.length - cardsPerView);

    // Create dots
    if (testimonialDots) {
        const dotCount = Math.ceil(cards.length / cardsPerView);
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('button');
            dot.classList.add('testimonial-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToTestimonial(i));
            testimonialDots.appendChild(dot);
        }
    }

    function goToTestimonial(index) {
        if (index < 0) index = 0;
        if (index > maxIndex) index = maxIndex;
        testimonialIndex = index;

        const cardWidth = cards[0].offsetWidth + 32;
        testimonialsTrack.style.transform = `translateX(${-index * cardWidth}px)`;

        testimonialDots.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    testimonialPrev.addEventListener('click', () => goToTestimonial(testimonialIndex - 1));
    testimonialNext.addEventListener('click', () => goToTestimonial(testimonialIndex + 1));

    // Auto carousel
    let testimonialInterval = setInterval(() => {
        testimonialIndex = (testimonialIndex + 1) % (maxIndex + 1);
        goToTestimonial(testimonialIndex);
    }, 4000);

    testimonialsTrack.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
    testimonialsTrack.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            testimonialIndex = (testimonialIndex + 1) % (maxIndex + 1);
            goToTestimonial(testimonialIndex);
        }, 4000);
    });
}

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            date: new Date().toISOString()
        };

        // Save to localStorage
        let messages = JSON.parse(localStorage.getItem('messages') || '[]');
        messages.push(formData);
        localStorage.setItem('messages', JSON.stringify(messages));

        // Success animation
        submitBtn.classList.add('success');
        submitBtn.innerHTML = `
            <span>✓ پیام شما ارسال شد!</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
        `;

        setTimeout(() => {
            submitBtn.classList.remove('success');
            submitBtn.innerHTML = `
                <span>ارسال پیام</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
            `;
            contactForm.reset();
        }, 3000);
    });
}

// ===== Newsletter =====
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;

        let subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
        subscribers.push({ email, date: new Date().toISOString() });
        localStorage.setItem('subscribers', JSON.stringify(subscribers));

        newsletterForm.querySelector('input').value = '';
        alert('✓ به خبرنامه ما پیوستید!');
    });
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ===== 3D Cube Mouse Follow =====
document.querySelectorAll('.bento-3d').forEach(cube => {
    const parent = cube.closest('.bento-item');
    if (!parent) return;

    parent.addEventListener('mousemove', (e) => {
        const rect = parent.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        cube.style.transform = `translate(-50%, -50%) perspective(400px) rotateY(${x * 30}deg) rotateX(${-y * 30}deg)`;
    });

    parent.addEventListener('mouseleave', () => {
        cube.style.transform = 'translate(-50%, -50%) perspective(400px) rotateY(0deg) rotateX(0deg)';
    });
});

// ===== Scroll Indicator Hide =====
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}

// ===== Preload Images =====
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const preloadImg = new Image();
            preloadImg.src = src;
        }
    });
}

window.addEventListener('load', preloadImages);

console.log('🚀 فروشگاه خلاق | Creative Shop - Loaded Successfully!');
console.log('✨ GSAP animations active');
console.log('🎨 Custom cursor enabled');
console.log('📦 LocalStorage cart ready');
