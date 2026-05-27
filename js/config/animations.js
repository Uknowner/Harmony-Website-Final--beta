// ── Animation constants ──────────────────────────────────────────────────────
// These are the ONLY place animation values are defined.
// CSS is injected from here — do not put animation values in animations.css.

export const ANIM = {
    fadeUp: {
        duration:       500,    // ms  — .fade-up transition
        easing:         'ease',
        translateY:     '24px', // starting offset
        staggerDelay:   60,     // ms between staggered cards
        threshold:      0.1,    // IntersectionObserver visibility threshold
    },
    page: {
        duration:       150,    // ms  — #page enter/exit
        easing:         'ease',
        exitTranslateY: '8px',  // how far #page slides down on exit
    },
};

// ── Style injection ──────────────────────────────────────────────────────────
// Injects a <style> tag so CSS values always match the JS constants above.

let _styleInjected = false;

function injectStyles() {
    if (_styleInjected) return;
    _styleInjected = true;

    const { fadeUp, page } = ANIM;

    const css = `
        /* ── Fade up on scroll ── */
        .fade-up {
            opacity: 0;
            transform: translateY(${fadeUp.translateY});
            transition: opacity ${fadeUp.duration}ms ${fadeUp.easing},
                        transform ${fadeUp.duration}ms ${fadeUp.easing};
        }
        .fade-up.visible {
            opacity: 1;
            transform: translateY(0);
        }

        /* ── Page transitions ── */
        #page {
            min-height: 100vh;
            opacity: 1;
            transition: opacity ${page.duration}ms ${page.easing},
                        transform ${page.duration}ms ${page.easing};
        }
        #page.page-exit {
            opacity: 0;
            transform: translateY(${page.exitTranslateY});
        }
        #page.page-enter {
            opacity: 1;
            transform: translateY(0);
        }
    `;

    const style = document.createElement('style');
    style.id = 'anim-styles';
    style.textContent = css;
    document.head.appendChild(style);
}

// ── Scroll animations (fade-up) ──────────────────────────────────────────────
let scrollObserver = null;

export function initScrollAnimations(options = {}) {
    injectStyles();

    const {
        threshold    = ANIM.fadeUp.threshold,
        staggerCards = true,
        staggerDelay = ANIM.fadeUp.staggerDelay,
    } = options;

    if (scrollObserver) {
        scrollObserver.disconnect();
        scrollObserver = null;
    }

    const fadeUpElements = document.querySelectorAll('.fade-up');
    if (fadeUpElements.length === 0) return;

    scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold });

    if (staggerCards) {
        document.querySelectorAll('.card.fade-up').forEach((card, i) => {
            card.style.transitionDelay = `${i * staggerDelay}ms`;
        });
    }

    fadeUpElements.forEach(el => scrollObserver.observe(el));
}

export function forceShowAllFadeUp() {
    document.querySelectorAll('.fade-up').forEach(el => {
        el.classList.add('visible');
        if (scrollObserver) scrollObserver.unobserve(el);
    });
}

export function destroyScrollAnimations() {
    if (scrollObserver) {
        scrollObserver.disconnect();
        scrollObserver = null;
    }
}

// ── Page transitions ─────────────────────────────────────────────────────────
export function initPageTransitions() {
    injectStyles();

    const page = document.getElementById('page');
    if (!page) return null;

    return {
        async exit(duration = ANIM.page.duration) {
            page.classList.remove('page-enter');
            page.classList.add('page-exit');
            await new Promise(resolve => setTimeout(resolve, duration));
            return true;
        },

        enter() {
            page.classList.remove('page-exit');
            page.classList.add('page-enter');
            setTimeout(() => page.classList.remove('page-enter'), ANIM.page.duration);
        },

        reset() {
            page.classList.remove('page-exit', 'page-enter');
        },
    };
}

// ── Imperative element animations ────────────────────────────────────────────
export function fadeIn(el, duration = ANIM.page.duration) {
    if (!el) return;
    el.style.transition = `opacity ${duration}ms ease`;
    el.style.opacity    = '0';
    el.offsetHeight; // force reflow
    el.style.opacity = '1';
    setTimeout(() => { el.style.transition = ''; }, duration);
}

export function fadeOut(el, duration = ANIM.page.duration) {
    if (!el) return Promise.resolve();
    return new Promise(resolve => {
        el.style.transition = `opacity ${duration}ms ease`;
        el.style.opacity    = '0';
        setTimeout(() => {
            el.style.transition = '';
            resolve();
        }, duration);
    });
}

export function slideDown(el, duration = 300) {
    if (!el) return;
    el.style.overflow   = 'hidden';
    el.style.transition = `max-height ${duration}ms ease-in-out`;
    el.style.maxHeight  = '0';
    el.offsetHeight;
    el.style.maxHeight  = el.scrollHeight + 'px';
    setTimeout(() => {
        el.style.maxHeight  = '';
        el.style.overflow   = '';
        el.style.transition = '';
    }, duration);
}

export function slideUp(el, duration = 300) {
    if (!el) return Promise.resolve();
    return new Promise(resolve => {
        el.style.overflow   = 'hidden';
        el.style.transition = `max-height ${duration}ms ease-in-out`;
        el.style.maxHeight  = el.scrollHeight + 'px';
        el.offsetHeight;
        el.style.maxHeight  = '0';
        setTimeout(() => {
            el.style.maxHeight  = '';
            el.style.overflow   = '';
            el.style.transition = '';
            resolve();
        }, duration);
    });
}
