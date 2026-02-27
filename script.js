document.addEventListener('DOMContentLoaded', () => {

    // --- Custom Cursor ---
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    // Check if cursor elements exist (they might be hidden on mobile)
    if (cursorDot && cursorOutline && window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Adding a slight delay to the outline for a smooth trailing effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover effect for links and buttons
        const hoverables = document.querySelectorAll('a, button, .gallery-item, .ai-button, .social-icon');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    // --- Typewriter Effect ---
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const textToType = "Anı Yakala.";
        let i = 0;

        function typeWriter() {
            if (i < textToType.length) {
                typewriterElement.innerHTML += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, 150); // Speed of typing
            } else {
                // Done typing, maybe blink cursor wait a bit, we'll just leave it blinking
            }
        }

        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animates only once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- Lightbox Gallery Implementation ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    // Open lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').getAttribute('src');
            lightboxImg.setAttribute('src', imgSrc);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close lightbox via close button
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close lightbox by clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close lightbox on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // --- Smooth Scrolling for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- AI Assistant Logic ---
    const aiChatBtn = document.getElementById('ai-chat-btn');
    const aiChatBox = document.getElementById('ai-chat-box');
    const aiCloseBtn = document.getElementById('ai-close-btn');
    const aiInput = document.getElementById('ai-input');
    const aiSendBtn = document.getElementById('ai-send-btn');
    const aiMessages = document.getElementById('ai-messages');

    // Toggle Chat Panel
    aiChatBtn.addEventListener('click', () => {
        aiChatBox.classList.toggle('hidden');
        if (!aiChatBox.classList.contains('hidden')) {
            aiInput.focus();
        }
    });

    aiCloseBtn.addEventListener('click', () => {
        aiChatBox.classList.add('hidden');
    });

    // Handle Sending Messages
    const handleSend = () => {
        const text = aiInput.value.trim();
        if (text === '') return;

        // Add User Message
        const userDiv = document.createElement('div');
        userDiv.className = 'ai-msg user-msg';
        userDiv.textContent = text;
        aiMessages.appendChild(userDiv);

        aiInput.value = '';
        aiMessages.scrollTop = aiMessages.scrollHeight;

        // Simulate AI Thinking & Response
        setTimeout(() => {
            const botDiv = document.createElement('div');
            botDiv.className = 'ai-msg bot-msg';

            // Basic Keyword Responses (Mock AI)
            const lowerText = text.toLowerCase();
            if (lowerText.includes('fiyat') || lowerText.includes('ücret')) {
                botDiv.textContent = 'Çekim fiyatları konsept, süre ve mekana göre değişiklik göstermektedir. Kesin bir fiyat almak için WhatsApp üzerinden iletişime geçebilirsiniz.';
            } else if (lowerText.includes('randevu') || lowerText.includes('iletişim')) {
                botDiv.textContent = 'Randevu oluşturmak veya detaylı görüşmek için sağ alttaki WhatsApp ikonuna tıklayarak Halil İbrahim Bey\'e direkt ulaşabilirsiniz!';
            } else if (lowerText.includes('nerede') || lowerText.includes('şehir') || lowerText.includes('yer')) {
                botDiv.textContent = 'Çekimler ağırlıklı olarak İstanbul\'da yapılmaktadır ancak projenin büyüklüğüne göre şehir dışı organizasyonlar da planlanabilmektedir.';
            } else {
                botDiv.textContent = 'Anladım. Size en doğru bilgiyi verebilmek için lütfen detayları WhatsApp üzerinden H. İbrahim Zal\'a doğrudan yazın. Başka nasıl yardımcı olabilirim?';
            }

            aiMessages.appendChild(botDiv);
            aiMessages.scrollTop = aiMessages.scrollHeight;
        }, 1000);
    };

    aiSendBtn.addEventListener('click', handleSend);
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });
});
