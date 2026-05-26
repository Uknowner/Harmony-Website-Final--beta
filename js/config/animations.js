// ==============================
// SCROLL ANIMATIONS (fade-up)
// ==============================
let scrollObserver = null;

/**
 * Initialize scroll-triggered fade-up animations.
 * Add class "fade-up" to any element you want to animate.
 * @param {Object} options - { threshold: 0.1, staggerCards: true, staggerDelay: 60 }
 */
export function initScrollAnimations(options = {}) {
    const {
        threshold = 0.1,
        staggerCards = true,
        staggerDelay = 60
    } = options;

    // Clean up previous observer
    if (scrollObserver) {
        scrollObserver.disconnect();
        scrollObserver = null;
    }

    const fadeUpElements = document.querySelectorAll(".fade-up");
    if (fadeUpElements.length === 0) return;

    scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold });

    // Optional: staggered delays for cards
    if (staggerCards) {
        document.querySelectorAll(".card.fade-up").forEach((card, i) => {
            card.style.transitionDelay = `${i * staggerDelay}ms`;
        });
    }

    fadeUpElements.forEach(el => scrollObserver.observe(el));
}

/**
 * Manually trigger all fade-up elements to become visible (no scroll needed)
 */
export function forceShowAllFadeUp() {
    document.querySelectorAll(".fade-up").forEach(el => {
        el.classList.add("visible");
        if (scrollObserver) scrollObserver.unobserve(el);
    });
}

/**
 * Destroy scroll observer (cleanup)
 */
export function destroyScrollAnimations() {
    if (scrollObserver) {
        scrollObserver.disconnect();
        scrollObserver = null;
    }
}

// ==============================
// PAGE TRANSITIONS
// ==============================

/**
 * Returns an object with enter/exit methods for the #page element.
 * @returns {Object|null} { enter, exit, reset } or null if #page not found.
 */
export function initPageTransitions() {
    const page = document.getElementById("page");
    if (!page) return null;

    return {
        /**
         * Trigger exit animation (fade out + slight slide up)
         * @param {number} duration - ms to wait before resolving
         * @returns {Promise<true>}
         */
        async exit(duration = 150) {
            page.classList.remove("page-enter");
            page.classList.add("page-exit");
            await new Promise(resolve => setTimeout(resolve, duration));
            return true;
        },

        /**
         * Trigger enter animation (fade in + reset)
         */
        enter() {
            page.classList.remove("page-exit");
            page.classList.add("page-enter");
            // Remove the class after animation ends (assuming 150ms)
            setTimeout(() => page.classList.remove("page-enter"), 150);
        },

        /**
         * Remove all transition classes immediately
         */
        reset() {
            page.classList.remove("page-exit", "page-enter");
        }
    };
}

// ==============================
// ELEMENT ANIMATIONS (imperative)
// ==============================

/**
 * Fade in an element (imperative, not CSS class based)
 * @param {HTMLElement} el - element to fade in
 * @param {number} duration - ms
 */
export function fadeIn(el, duration = 300) {
    if (!el) return;
    el.style.transition = `opacity ${duration}ms ease`;
    el.style.opacity = "0";
    // force reflow
    el.offsetHeight;
    el.style.opacity = "1";
    setTimeout(() => {
        el.style.transition = "";
    }, duration);
}

/**
 * Fade out an element
 * @param {HTMLElement} el
 * @param {number} duration
 * @returns {Promise<void>} resolves after fade out
 */
export function fadeOut(el, duration = 300) {
    if (!el) return Promise.resolve();
    return new Promise(resolve => {
        el.style.transition = `opacity ${duration}ms ease`;
        el.style.opacity = "0";
        setTimeout(() => {
            el.style.transition = "";
            resolve();
        }, duration);
    });
}

/**
 * Slide down animation (reveal)
 * @param {HTMLElement} el
 * @param {number} duration
 */
export function slideDown(el, duration = 300) {
    if (!el) return;
    el.style.overflow = "hidden";
    el.style.transition = `max-height ${duration}ms ease-in-out`;
    el.style.maxHeight = "0";
    el.offsetHeight;
    el.style.maxHeight = el.scrollHeight + "px";
    setTimeout(() => {
        el.style.maxHeight = "";
        el.style.overflow = "";
        el.style.transition = "";
    }, duration);
}

/**
 * Slide up animation (hide)
 * @param {HTMLElement} el
 * @param {number} duration
 * @returns {Promise<void>}
 */
export function slideUp(el, duration = 300) {
    if (!el) return Promise.resolve();
    return new Promise(resolve => {
        el.style.overflow = "hidden";
        el.style.transition = `max-height ${duration}ms ease-in-out`;
        el.style.maxHeight = el.scrollHeight + "px";
        el.offsetHeight;
        el.style.maxHeight = "0";
        setTimeout(() => {
            el.style.maxHeight = "";
            el.style.overflow = "";
            el.style.transition = "";
            resolve();
        }, duration);
    });
}