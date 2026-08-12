const PORTFOLIO_DATA = {
    personal: {
        name: "Muhammad Hammad",
        title: "Frontend Developer",
        email: "hammadlodhi745@gmail.com",
        whatsapp: "03142476885",
        phone: "03712324149",
        github: "https://github.com/hammadlodhi745-lang/Cars-Web",
        liveProjectUrl: "https://cars-web-phi.vercel.app"
    },
    typingPhrases: [
        "Modern & Responsive Web Experiences.",
        "Interactive UI Layouts.",
        "Clean JavaScript Components.",
        "Bootstrap 5 Applications."
    ]
};

document.addEventListener("DOMContentLoaded", function () {
    if (window.lucide) {
        window.lucide.createIcons({
            attrs: {
                "stroke-width": 1.8
            }
        });
    }

    const revealTargets = document.querySelectorAll("section[id], .about-image-wrapper, .about-content, .skill-card, .service-card, .contact-card, .placeholder-card, .experience-card, .github-card, .form-container");
    revealTargets.forEach(function (element, index) {
        element.classList.add("reveal");
        if (index % 3 === 0) {
            element.classList.add("reveal-delay-1");
        } else if (index % 3 === 1) {
            element.classList.add("reveal-delay-2");
        } else {
            element.classList.add("reveal-delay-3");
        }
    });

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px"
    });

    revealTargets.forEach(function (element) {
        revealObserver.observe(element);
    });
    
    const typedTextSpan = document.getElementById("typed-text");
    const phrases = PORTFOLIO_DATA.typingPhrases;
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        if (!typedTextSpan) return;

        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    const navbar = document.getElementById("mainNavbar");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    const navbarCollapse = document.getElementById("navbarContent");

    const setActiveNavLink = function (sectionId) {
        navLinks.forEach(function (navLink) {
            navLink.classList.toggle("active", navLink.getAttribute("href") === `#${sectionId}`);
        });
    };

    const setDefaultHomeState = function () {
        navLinks.forEach(function (navLink) {
            navLink.classList.toggle("active", navLink.getAttribute("href") === "#home");
        });
    };

    setDefaultHomeState();

    const sections = document.querySelectorAll("main section[id], body > section[id]");

    const sectionObserver = new IntersectionObserver(function (entries) {
        const visibleEntries = entries.filter(function (entry) {
            return entry.isIntersecting;
        });

        if (!visibleEntries.length) return;

        if (window.scrollY < 80) {
            setDefaultHomeState();
            return;
        }

        const topVisibleSection = visibleEntries.sort(function (a, b) {
            return a.boundingClientRect.top - b.boundingClientRect.top;
        })[0];

        setActiveNavLink(topVisibleSection.target.id);
    }, {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0.1
    });

    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });
    
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("shadow-lg");
            navbar.style.padding = "0.6rem 0";
        } else {
            navbar.classList.remove("shadow-lg");
            navbar.style.padding = "1rem 0";
            setDefaultHomeState();
        }
    });

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.forEach(function (navLink) {
                navLink.classList.remove("active");
            });
            link.classList.add("active");

            if (navbarCollapse.classList.contains("show")) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }
        });
    });

    const liveDemoBtn = document.getElementById("liveDemoBtn");
    if (liveDemoBtn) {
        if (PORTFOLIO_DATA.personal.liveProjectUrl && PORTFOLIO_DATA.personal.liveProjectUrl.trim() !== "") {
            liveDemoBtn.href = PORTFOLIO_DATA.personal.liveProjectUrl;
            liveDemoBtn.classList.remove("disabled");
        } else {
            liveDemoBtn.setAttribute("title", "Live link will be available upon deployment");
        }
    }

    const contactForm = document.getElementById("contactForm");
    const formAlert = document.getElementById("formAlert");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (contactForm.checkValidity()) {
                formAlert.classList.remove("d-none");
                contactForm.reset();
                contactForm.classList.remove("was-validated");

                setTimeout(function () {
                    formAlert.classList.add("d-none");
                }, 5000);
            } else {
                contactForm.classList.add("was-validated");
            }
        }, false);
    }
});