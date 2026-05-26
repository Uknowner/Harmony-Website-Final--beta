import { hardware } from "../hardware.js";

export const resolves = {
    features: {
        backgrounds: hardware.canShowBackground(),
        animations: !hardware.prefersReducedMotion(),
        highQualityImages: hardware.isHighEnd(),
        lazyVideo: !hardware.isHighEnd(),
    },

    hero: {
        autoCollapse: true,
        collapseDelay: 3000,
    },

    backgroundVariantCount: 7,
    headerScrollThreshold: 100,
};
