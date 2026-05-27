export class UserHardware {
    constructor() {
        this.cores  = navigator.hardwareConcurrency ?? null;
        this.memory = navigator.deviceMemory        ?? null;
        this._reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

        this._reducedMotion.addEventListener("change", () => {
            this._reducedMotionActive = this._reducedMotion.matches;
        });
        this._reducedMotionActive = this._reducedMotion.matches;
    }

    getCores()     { return this.cores;  }
    getMemoryGB() { return this.memory; }
    prefersReducedMotion() { return this._reducedMotionActive; }

    // ── Device type detection ────────────────────────────────────────────────
    isMobile() {
        const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
        const hasTouch      = navigator.maxTouchPoints > 0;
        const narrowScreen  = window.screen.width <= 768;
        return coarsePointer && hasTouch && narrowScreen;
    }

    isDesktop() {
        return !this.isMobile();
    }

    // ── Tier classification ──────────────────────────────────────────────────
    // Clean boundaries to stop capable devices from falling into low-performance traps.
    isLowEnd() {
        if (this.isMobile()) {
            // True low-end entry devices (≤ 4 cores or under 4GB RAM)
            const weakCPU = this.cores  !== null && this.cores  <= 4;
            const lowRAM  = this.memory !== null && this.memory <  4;
            return weakCPU || lowRAM;
        } else {
            const weakCPU = this.cores  !== null && this.cores  <= 4;
            const lowRAM  = this.memory !== null && this.memory <  4;
            return weakCPU || lowRAM;
        }
    }

    isHighEnd() {
        if (this.isLowEnd()) return false;

        if (this.isMobile()) {
            // High-end benchmarks: 8+ cores AND 8GB+ reported RAM
            const strongCPU = this.cores  === null || this.cores  >= 8;
            const ampleRAM  = this.memory === null || this.memory >= 8;
            return strongCPU && ampleRAM;
        } else {
            const strongCPU = this.cores  === null || this.cores  >= 6;
            const ampleRAM  = this.memory === null || this.memory >= 16;
            return strongCPU && ampleRAM;
        }
    }

    isMidRange() {
        // Anything that isn't struggling on low-end and isn't premium high-end 
        // falls perfectly here (e.g. Octa-core chipsets with 4GB/6GB reported memory)
        return !this.isLowEnd() && !this.isHighEnd();
    }

    getTier() {
        if (this.isLowEnd()) return "low";
        if (this.isMidRange()) return "mid";
        return "high";
    }

    // ── Generous Feature Gates ────────────────────────────────────────────────

    canShowBackground() {
        // Unlocked for mid & high tiers
        return !this.isLowEnd();
    }

    canAnimate() {
        // Enabled for mid/high, unless the user manually turned on reduced motion
        return !this.isLowEnd() && !this.prefersReducedMotion();
    }

    shouldAggressiveLazyLoad() {
        // Mid-range phones like the A25 can handle normal background asset queueing. 
        // Aggressive loading is reserved only for low-end hardware saving execution cycles.
        return this.isLowEnd();
    }

    canUseModernImages() {
        return !this.isLowEnd();
    }

    shouldReduceData() {
        return this.isLowEnd();
    }

    canAutoplayVideo() {
        // Generous unlock: Mid-range devices decode inline modern formats flawlessly
        return !this.isLowEnd();
    }

    // ── Diagnostics ──────────────────────────────────────────────────────────

    getSummary() {
        const tier   = this.getTier();
        const mobile = this.isMobile();

        return {
            device:                   mobile ? "mobile" : "desktop",
            cores:                     this.getCores(),
            memoryGB:                  this.getMemoryGB(),
            prefersReducedMotion:      this.prefersReducedMotion(),
            tier,
            canShowBackground:         this.canShowBackground(),
            canAnimate:                this.canAnimate(),
            shouldAggressiveLazyLoad:  this.shouldAggressiveLazyLoad(),
            canUseModernImages:        this.canUseModernImages(),
            shouldReduceData:          this.shouldReduceData(),
            canAutoplayVideo:          this.canAutoplayVideo(),
        };
    }
}

export const hardware = new UserHardware();