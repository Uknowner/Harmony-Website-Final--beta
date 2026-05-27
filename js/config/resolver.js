import { hardware } from "../hardware.js";

export const resolves = {
    features: {
        get isMobile() {
            return hardware.isMobile();
        },

        get backgrounds() {
            return hardware.canShowBackground();
        },
        get animations() {
            return !hardware.prefersReducedMotion();
        },
        get highQualityImages() {
            return hardware.isHighEnd();
        },
        get lazyVideo() {
            return !hardware.isHighEnd();
        },
    },

    hero: {
        autoCollapse: true,
        collapseDelay: 3000,
    },

    backgroundVariantCount: 7,
    headerScrollThreshold: 100,
};