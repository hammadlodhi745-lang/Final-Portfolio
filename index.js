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
    const navToggle = document.querySelector(".navbar-toggler");
    const progressBar = document.querySelector(".scroll-progress-bar");

    const setMobileMenuState = function (isOpen) {
        if (!navbarCollapse || !navToggle) return;

        navbarCollapse.classList.toggle("show", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
        navToggle.classList.toggle("collapsed", !isOpen);
    };

    if (navToggle && navbarCollapse) {
        navToggle.addEventListener("click", function () {
            const isOpen = navToggle.getAttribute("aria-expanded") === "true";
            setMobileMenuState(!isOpen);
        });
    }

    const setScrollState = function () {
        const scrolled = window.scrollY > 20;
        navbar.classList.toggle("scrolled", scrolled);
    };

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

    const updateActiveSectionFromScroll = function () {
        if (window.scrollY < 80) {
            setDefaultHomeState();
            return;
        }

        let activeSection = null;
        let smallestDistance = Number.POSITIVE_INFINITY;

        sections.forEach(function (section) {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top - 120);

            if (rect.top <= 180 && rect.bottom > 140) {
                if (distance < smallestDistance) {
                    smallestDistance = distance;
                    activeSection = section;
                }
            }
        });

        if (activeSection) {
            setActiveNavLink(activeSection.id);
        }
    };

    const updateScrollProgress = function () {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        if (progressBar) {
            progressBar.style.width = progress + "%";
        }
    };

    setScrollState();
    updateScrollProgress();
    updateActiveSectionFromScroll();

    window.addEventListener("scroll", function () {
        setScrollState();
        updateScrollProgress();
        updateActiveSectionFromScroll();

        if (window.scrollY <= 50) {
            setDefaultHomeState();
        }
    });

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const href = link.getAttribute("href");
            const sectionId = href && href.startsWith("#") ? href.slice(1) : "";

            if (sectionId) {
                const section = document.getElementById(sectionId);
                if (section) {
                    event.preventDefault();

                    const offset = navbar ? navbar.offsetHeight + 26 : 0;
                    const targetPosition = Math.max(section.offsetTop - offset, 0);

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                    setTimeout(function () {
                        setActiveNavLink(sectionId);
                    }, 120);
                }
            }

            navLinks.forEach(function (navLink) {
                navLink.classList.remove("active");
            });
            link.classList.add("active");

            if (navbarCollapse && navbarCollapse.classList.contains("show")) {
                setMobileMenuState(false);
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