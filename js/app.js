import { initHarmonyDetails } from './utils.js';
import { applySettings } from './config/siteSettings.js';
import { resolves } from './config/resolver.js';
import { router } from './router.js';
import { network } from './network.js';
import { popup } from './components/components.js';
import { render as renderFooter } from './footer.js';
import { loadMenu } from './components/menu.js';
import { initiateHeaderScrolling } from './utils/headerScroll.js';

// ==============================
// SESSION STATE
// ==============================
const siteViewed = sessionStorage.getItem('siteViewed') === 'true';

// ==============================
// ENTRY POINT
// ==============================
document.addEventListener('DOMContentLoaded', () => {
    siteViewed ? initSite() : showWelcome();
});

// ==============================
// WELCOME SCREEN
// ==============================
function showWelcome() {
    const content = document.getElementById('content');
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
        const hero = document.getElementById('welcomeHero');
        if (!hero) {
            initSite();
            return;
        }
        hero.classList.add('hero-collapsing');
        hero.addEventListener('transitionend', () => {
            sessionStorage.setItem('siteViewed', 'true');
            initSite();
        }, { once: true });
    }, resolves.hero.collapseDelay);
}

// ==============================
// INITIALISE FULL SITE
// ==============================
async function initSite() {
    const content = document.getElementById('content');
    if (!content) {
        console.error('#content not found');
        return;
    }

    await initHarmonyDetails();

    // Build shell
    content.innerHTML = `
        <main id="page"></main>
        <footer id="footer"></footer>
    `;

    // Menu
    loadMenu();

    // Footer
    const footer = document.getElementById('footer');
    if (footer) {
        footer.innerHTML = renderFooter();
    } else {
        console.error('Footer element not found');
    }

    // Default route
    if (!location.hash) {
        location.hash = '#home';
    }

    // Router
    router.init();

    // Header scroll behaviour
    initiateHeaderScrolling();

    // Network monitoring
    initNetwork();

    document.body.classList.add('site-ready');
}

// ==============================
// NETWORK
// ==============================
function initNetwork() {
    if (!network?.isSupported?.()) return;

    network.onChange(({ slow, saveData }) => {
        if (slow || saveData) {
            popup.message('⚠️ Slow network detected. Images may load slower.');
        } else {
            popup.hide();
        }
    });
}