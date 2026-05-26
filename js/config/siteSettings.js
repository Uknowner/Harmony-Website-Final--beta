// config/siteSettings.js
import { resolves } from './resolver.js';
import { initScrollAnimations, destroyScrollAnimations } from './animations.js';

// Simple flag - animations on or off
let animationsEnabled = resolves.animations;

// ==============================
// ANIMATIONS SETTINGS
// ==============================
export function applyAnimationsSetting() {
    if (animationsEnabled) {
        // Only run if there are elements to animate
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

// Simple toggle if you want a settings button later
export function toggleAnimations() {
    animationsEnabled = !animationsEnabled;
    applyAnimationsSetting();
    return animationsEnabled;
}

// ==============================
// BACKGROUND SETTINGS
// ==============================
function setBackground() {
    // Check if backgrounds feature is enabled
    if (!resolves.features?.backgrounds) return;
    
    const page = document.getElementById('page');
    if (!page) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const theme = mediaQuery.matches ? 'dark' : 'light';
    
    // Random background selection
    const variantCount = resolves.backgroundVariantCount || 3;
    const pick = Math.floor(Math.random() * variantCount) + 1;
    
    page.style.backgroundImage = `url('/assets/images/backgrounds-${theme}/background-${pick}.webp')`;
    page.style.backgroundSize = 'cover';
    page.style.backgroundPosition = 'center';
    page.style.backgroundAttachment = 'fixed';
}

// ==============================
// MAIN APPLY SETTINGS
// ==============================
export async function applySettings() {
    console.log('Applying site settings...');
    
    // Set background if enabled
    if (resolves.features?.backgrounds) {
        setBackground();
        
        // Listen for theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            setBackground();
        });
    }
    
    // Note: applyAnimationsSetting() should be called AFTER content loads
    // Call it from router.js or after each page render
    
    console.log('Settings applied');
}

// ==============================
// RE-INITIALIZE SETTINGS (for dynamic changes)
// ==============================
export function reinitSettings() {
    if (resolves.features?.backgrounds) {
        setBackground();
    }
    applyAnimationsSetting();
}