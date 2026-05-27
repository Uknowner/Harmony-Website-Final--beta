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
    if (!resolves.features.backgrounds) return;

    const page = document.getElementById('page');
    if (!page) return;

    const isMobile    = resolves.features.isMobile;
    const theme       = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const variantCount = resolves.backgroundVariantCount || 3;
    const pick        = Math.floor(Math.random() * variantCount) + 1;

    page.style.backgroundImage      = `url('/assets/images/backgrounds-${theme}/background.webp')`;
    page.style.backgroundSize       = 'cover';
    page.style.backgroundPosition   = 'center';
    // fixed attachment is broken on iOS/Android — use scroll on mobile
    page.style.backgroundAttachment = isMobile ? 'scroll' : 'fixed';

    console.group('🖼️ Background');
    console.log('theme:   ', theme);
    console.log('variant: ', pick);
    console.log('mobile:  ', isMobile);
    console.groupEnd();
}

// ==============================
// MAIN APPLY SETTINGS
// ==============================
export async function applySettings() {
    const isMobile    = resolves.features.isMobile;
    const backgrounds = resolves.features.backgrounds;
    const animations  = resolves.features.animations;

    console.group('⚙️ Site settings');
    console.log('mobile:      ', isMobile);
    console.log('backgrounds: ', backgrounds);
    console.log('animations:  ', animations);
    console.groupEnd();

    if (backgrounds) {
        setBackground();

        // Attach theme-change listener only once
        if (!_themeChangeListenerAttached) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setBackground);
            _themeChangeListenerAttached = true;
        }
    }

    // applyAnimationsSetting() is called from router.js after each page render
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