import { initHarmonyDetails } from "./utils.js";
import { hardware } from "./hardware.js";

import { router } from "./router.js";
import { network } from "./network.js";
import { titleCase, sanitizeText, registerEventListener } from "./utils.js";

import { popup } from "./components/components.js";

import { render as renderWelcome } from "./views/welcome.js";
import { render as renderFooter } from "./footer.js";

// ==============================
// SESSION STATE
// ==============================

const siteViewed = sessionStorage.getItem("siteViewed") === "true";

// ==============================
// ENTRY POINT
// ==============================

document.addEventListener("DOMContentLoaded", () => {
    if (!siteViewed) {
        showWelcome();        
    } else {
        initSite();
    }
});
// ==============================
// WELCOME SCREEN
// ==============================

function showWelcome() {
    const content = document.getElementById("content");
    if (!content) return;

    content.innerHTML = `
        <div class="hero hero-fullscreen" id="welcomeHero">
            <img class="hero-bg" src="assets/images/building/front-gate.webp" alt="Front gate">
            <div class="hero-overlay"></div>
            <div class="hero-content">
                <span class="hero-badge">NSFAS Accredited · Sunnyside, Pretoria</span>
                <h1>Your Home Away From Home</h1>
                <p>Safe, affordable student accommodation steps from UNISA</p>
            </div>
        </div>
    `;

    setTimeout(() => {
        const hero = document.getElementById("welcomeHero");
        if (!hero) { initSite(); return; }

        hero.classList.add("hero-collapsing");

        hero.addEventListener("transitionend", () => {
            sessionStorage.setItem("siteViewed", "true");
            initSite();
        }, { once: true });

    }, 3000);
}

// ==============================
// INITIALISE FULL SITE
// ==============================
async function initSite() {
    const content = document.getElementById("content");

    if (!content) {
        console.error("#content not found");
        return;
    }

    await initHarmonyDetails();

    // 1. Build shell
    content.innerHTML = `
        <main id="page"></main>
        <footer id="footer"></footer>
    `;
    
    // Pick once outside the function so it stays consistent
    const pick = Math.floor(Math.random() * 7) + 1;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function setBackground() {
        if (!hardware.canShowBackground()) return;
        const prefix = mediaQuery.matches ? "dark" : "light";
        document.getElementById("page").style.backgroundImage = `url('/assets/images/backgrounds-${prefix}/background.webp')`;
    }

    setBackground();
    mediaQuery.addEventListener("change", setBackground);

    // 2. Menu
    loadMenu();

    // 3. Footer — must be before router so it's ready
    const footer = document.getElementById("footer");
    if (footer) {
        footer.innerHTML = renderFooter();
    } else {
        console.error("Footer element not found");
    }

    // 4. Default route
    if (!location.hash) {
        location.hash = "#home";
    }

    // 5. Router — after everything is in the DOM
    router.init();

    // 6. Rest
    initiateHeaderScrolling();
    initNetwork();

    document.body.classList.add("site-ready");
}

// ==============================
// NETWORK
// ==============================

function initNetwork() {
    if (!network?.isSupported?.()) return;

    network.onChange(({ slow, saveData }) => {
        if (slow || saveData) {
            popup.message("⚠️ Slow network detected. Images may load slower.");
        } else {
            popup.hide();
        }
    });
}

// ==============================
// MENU
// ==============================

function loadMenu() {
    const header = document.querySelector("header");

    if (!header) {
        console.error("Header not found");
        return;
    }

    if (header.dataset.loaded === "true") return;

    header.dataset.loaded = "true";

    const menuOptions = [
        { route: "home",         label: "Home",        icon: "ti-home"        },
        { route: "rooms",        label: "Rooms",        icon: "ti-door"        },
        { route: "facilities",   label: "Facilities",   icon: "ti-building"    },
        { route: "gallery",      label: "Gallery",      icon: "ti-photo"       },
        { route: "testimonials", label: "Testimonials", icon: "ti-message"     },
        { route: "contact",      label: "Contact",      icon: "ti-mail"        },
        { route: "apply",        label: "Apply",        icon: "ti-pencil"      },
        { route: "about-tkc",    label: "About TKC",    icon: "ti-info-circle" },
    ];

    const logoLink = document.createElement("a");
    logoLink.href = "#home";

    const logo = document.createElement("img");
    logo.src = "assets/images/logos/nav-logo.webp";
    logo.alt = "Harmony Private Home Logo";
    logo.classList.add("tkc-logo");

    logoLink.appendChild(logo);

    const menuBtn = document.createElement("button");
    menuBtn.id = "menuBtn";
    menuBtn.className = "menu-btn";
    menuBtn.setAttribute("aria-label", "Open Menu");
    menuBtn.innerHTML = "☰";

    header.appendChild(logoLink);
    header.appendChild(menuBtn);

    let aside = document.getElementById("sidebar");
    let closeBtn = null;

    if (!aside) {
        aside = document.createElement("aside");
        aside.id = "sidebar";
        aside.className = "sidebar";

        closeBtn = document.createElement("button");
        closeBtn.id = "closeBtn";
        closeBtn.className = "close-btn";
        closeBtn.innerHTML = "✕";

        const ul = document.createElement("ul");

        menuOptions.forEach(({ route, label, icon }) => {
            const li = document.createElement("li");
            const link = document.createElement("a");

            link.href = `#${route}`;
            link.dataset.route = route;
            link.innerHTML = `<i class="ti ${icon}" aria-hidden="true"></i> ${label}`;

            li.appendChild(link);
            ul.appendChild(li);
        });

        aside.appendChild(closeBtn);
        aside.appendChild(ul);
        document.body.appendChild(aside);
    } else {
        closeBtn = document.getElementById("closeBtn");
    }

    let overlay = document.getElementById("overlay");

    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "overlay";
        overlay.className = "overlay";
        document.body.appendChild(overlay);
    }

    function openMenu() {
        aside.classList.add("active");
        overlay.classList.add("active");
        document.body.classList.add("no-scroll");
    }

    function closeMenu() {
        aside.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("no-scroll");
    }

    menuBtn.addEventListener("click", openMenu);
    closeBtn?.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    aside.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (link) closeMenu();
    });
}

// ==============================
// HEADER SCROLL EFFECT
// ==============================

function initiateHeaderScrolling() {
    let lastScroll = window.scrollY;
    const header = document.querySelector("header");

    if (!header) return;

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;

        if (currentScroll - lastScroll > 100) {
            header.classList.add("scrolled");
            lastScroll = currentScroll;
        } else if (lastScroll - currentScroll > 100) {
            header.classList.remove("scrolled");
            lastScroll = currentScroll;
        }
    });
}