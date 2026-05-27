// config/siteSettings.js
import { resolves } from './resolver.js';
import { initScrollAnimations, destroyScrollAnimations } from './animations.js';

// ==============================
// ANIMATIONS SETTINGS
// ==============================
let animationsEnabled = resolves.features.animations;

export function applyAnimationsSetting() {
    if (animationsEnabled) {
        if (document.querySelectorAll('.fade-up').length > 0) {
            initScrollAnimations();
        }
    } else {
        destroyScrollAnimations();
    }
}

export function areAnimationsEnabled() {
    return animationsEnabled;
}

export function toggleAnimations() {
    animationsEnabled = !animationsEnabled;
    applyAnimationsSetting();
    return animationsEnabled;
}

// ==============================
// BACKGROUND SETTINGS
// ==============================
let _themeChangeListenerAttached = false;

function setBackground() {
    // Target the body instead of #page so the image covers the entire screen
    const targetEl = document.body; 

    const isMobile    = resolves.features.isMobile;
    const theme       = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const pick = Math.floor(Math.random() * 2) + 1;

    targetEl.style.backgroundImage      = `url('/assets/images/backgrounds/${theme}${pick}.webp')`;
    targetEl.style.backgroundSize       = 'cover';
    targetEl.style.backgroundPosition   = 'center';
    targetEl.style.backgroundAttachment = isMobile ? 'scroll' : 'fixed';
}

// ==============================
// MAIN APPLY SETTINGS
// ==============================
export async function applySettings() {
    const backgrounds = resolves.features.backgrounds;

    if (backgrounds) {
        setBackground();

        // Attach theme-change listener only once
        if (!_themeChangeListenerAttached) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setBackground);
            _themeChangeListenerAttached = true;
        }
   
    }

    applyAnimationsSetting();
}

// ==============================
// RE-INITIALIZE SETTINGS (for dynamic changes)
// ==============================
export function reinitSettings() {
    if (resolves.features.backgrounds) {
        setBackground();
    }
    applyAnimationsSetting();
}