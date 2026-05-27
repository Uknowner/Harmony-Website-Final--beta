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
            // Mobile low-end: Entry level devices with <= 4 cores OR strictly under 4GB RAM
            // The Samsung A15 (8 cores, >= 4GB reported RAM) safely bypasses this.
            const weakCPU = this.cores  !== null && this.cores <= 2;
            const lowRAM  = this.memory !== null && this.memory < 2;
            return weakCPU || lowRAM;
        } else {
            // Desktop low-end: Can be adjusted independently if desktop baselines change
            const weakCPU = this.cores  !== null && this.cores <= 4;
            const lowRAM  = this.memory !== null && this.memory < 4;
            return weakCPU || lowRAM;
        }
    }

    isHighEnd() {
        if (this.isLowEnd()) return false;

        if (this.isMobile()) {
            // High-end mobile benchmarks: 8+ cores AND 8GB+ reported RAM.
            // Because the A15 reports 4GB of memory to the browser, it fails 'ampleRAM' 
            // and safely drops down to mid-range.
            const strongCPU = this.cores  === null || this.cores >= 8;
            const ampleRAM  = this.memory === null || this.memory >= 8;
            return strongCPU && ampleRAM;
        } else {
            const strongCPU = this.cores  === null || this.cores >= 6;
            const ampleRAM  = this.memory === null || this.memory >= 16;
            return strongCPU && ampleRAM;
        }
    }

    isMidRange() {
        // Anything that isn't struggling on low-end and isn't premium high-end 
        // falls perfectly here (e.g. Samsung A15 with its Octa-core chip & 4GB/6GB reported memory)
        return !this.isLowEnd() && !this.isHighEnd();
    }

    getTier() {
        if (this.isLowEnd()) return "low";
        if (this.isMidRange()) return "mid";
        return "high";
    }

    // ── Generous Feature Gates ────────────────────────────────────────────────

    canShowBackground() {
        return !this.isLowEnd();
    }

    canAnimate() {
        return !this.isLowEnd() && !this.prefersReducedMotion();
    }

    shouldAggressiveLazyLoad() {
        return this.isLowEnd();
    }

    canUseModernImages() {
        return !this.isLowEnd();
    }

    shouldReduceData() {
        return this.isLowEnd();
    }

    canAutoplayVideo() {
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