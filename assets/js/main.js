
/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

/*=============== MENU SHOW ===============*/
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/*=============== MENU HIDDEN ===============*/
if (navClose && navMenu) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLinks = document.querySelectorAll('.nav__link');

const linkAction = () => {
    if (navMenu) {
        navMenu.classList.remove('show-menu');
    }
};

navLinks.forEach(link => {
    link.addEventListener('click', linkAction);
});

/*=============== SHADOW HEADER ===============*/
const shadowHeader = () => {
    const header = document.getElementById('header');

    if (header) {
        header.classList.toggle('shadow-header', window.scrollY >= 50);
    }
};

window.addEventListener('scroll', shadowHeader);

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
        'service_8cx94th',
        'template_3z5ad4m',
        '#contact-form',
        '8vH6NVDqUY4Zr5XIu'
    ).then(() => {
        if (contactMessage) {
            contactMessage.textContent = 'Message sent successfully ✅';

            setTimeout(() => {
                contactMessage.textContent = '';
            }, 5000);
        }

        if (contactForm) {
            contactForm.reset();
        }
    }).catch(() => {
        if (contactMessage) {
            contactMessage.textContent =
                'Message not sent (service error) ❌';
        }
    });
};

if (contactForm) {
    contactForm.addEventListener('submit', sendEmail);
}

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUpButton = document.getElementById('scroll-up');

    if (scrollUpButton) {
        scrollUpButton.classList.toggle(
            'show-scroll',
            window.scrollY >= 350
        );
    }
};

window.addEventListener('scroll', scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Highlight the last section at the bottom of the page
    if (scrollY + windowHeight >= documentHeight - 2) {
        const lastSection = sections[sections.length - 1];

        if (lastSection) {
            setActiveLink(lastSection.id);
        }

        return;
    }

    // Find the section nearest the top of the viewport
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;

        if (scrollY >= sectionTop) {
            currentSection = section.id;
        }
    });

    if (currentSection) {
        setActiveLink(currentSection);
    }
};

const setActiveLink = (sectionId) => {
    navLinks.forEach(link => {
        const isActive =
            link.getAttribute('href') === `#${sectionId}`;

        link.classList.toggle('active-link', isActive);
    });
};

// Update underline on click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const sectionId = link.getAttribute('href');

        if (sectionId && sectionId.startsWith('#')) {
            setActiveLink(sectionId.substring(1));
        }
    });
});

// Update underline while scrolling
window.addEventListener('scroll', scrollActive);
window.addEventListener('load', () => {
    shadowHeader();
    scrollUp();
    scrollActive();
});

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? 'dark' : 'light';

const getCurrentIcon = () =>
    themeButton && themeButton.classList.contains(iconTheme)
        ? 'ri-moon-line'
        : 'ri-sun-line';

// Restore previously selected theme
if (selectedTheme) {
    document.body.classList.toggle(
        darkTheme,
        selectedTheme === 'dark'
    );
}

if (themeButton && selectedIcon) {
    themeButton.classList.toggle(
        iconTheme,
        selectedIcon === 'ri-sun-line'
    );
}

// Toggle theme
if (themeButton) {
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);

        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    });
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400
});

sr.reveal('.home__perfil, .about__image, .contact__mail', {
    origin: 'right'
});

sr.reveal(
    `.home__name, .home__info,
     .about__container .section__title-1, .about__info,
     .contact__social, .contact__data`,
    { origin: 'left' }
);

sr.reveal('.services__card, .projects__card', {
    interval: 100
});