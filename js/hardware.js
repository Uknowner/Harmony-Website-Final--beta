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

    getCores()    { return this.cores;  }
    getMemoryGB() { return this.memory; }
    prefersReducedMotion() { return this._reducedMotionActive; }

    // ── Device type detection ────────────────────────────────────────────────
    //
    // Combines three signals to avoid false positives:
    //   • coarse pointer  → finger/touch input (no mouse)
    //   • touch points    → device has a touch screen
    //   • narrow screen   → phone-sized viewport
    //
    // A touchscreen laptop still has a fine pointer, so it won't match.

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
    //
    // MOBILE thresholds (SA students, 2026)
    //   LOW:  R1000–R2500  Itel P55, Tecno Spark 20C      → ≤6 cores, <4GB RAM
    //   MID:  R3000–R6000  Samsung A16, Redmi Note 14     → ≤8 cores, ≤6GB RAM
    //   HIGH: R6000+       Samsung A55, second-hand Pixel → 8+ cores, 6+GB RAM
    //
    // DESKTOP/LAPTOP thresholds
    //   LOW:  Old/budget   Celeron/Pentium, Chromebook    → ≤4 cores, <8GB RAM
    //   MID:  Mid-range    i5/Ryzen 5, 8–16GB RAM         → ≤8 cores, ≤16GB RAM
    //   HIGH: Modern       i7/Ryzen 7+, 16+GB RAM         → 8+ cores, 16+GB RAM

    isLowEnd() {
        const reducedMotion = this.prefersReducedMotion();

        if (this.isMobile()) {
            const weakCPU = this.cores  !== null && this.cores  <= 6;
            const lowRAM  = this.memory !== null && this.memory <  4;
            return weakCPU || lowRAM || reducedMotion;
        } else {
            const weakCPU = this.cores  !== null && this.cores  <= 4;
            const lowRAM  = this.memory !== null && this.memory <  8;
            return weakCPU || lowRAM || reducedMotion;
        }
    }

    isMidRange() {
        const low = this.isLowEnd();
        if (low) return false;

        if (this.isMobile()) {
            const midCPU = this.cores  !== null && this.cores  <= 8;
            const midRAM = this.memory !== null && this.memory <= 6;

            // 6GB RAM but weak CPU (cheap brand padding specs)
            const paddedSpecs = (this.memory !== null && this.memory >= 6) &&
                                 (this.cores  !== null && this.cores  <= 6);

            return (midCPU || midRAM) && !paddedSpecs;
        } else {
            const midCPU = this.cores  !== null && this.cores  <= 8;
            const midRAM = this.memory !== null && this.memory <= 16;

            // 16GB RAM but only 4 cores (e.g. old Xeon workstation)
            const paddedSpecs = (this.memory !== null && this.memory >= 16) &&
                                  (this.cores  !== null && this.cores  <= 4);

            return (midCPU || midRAM) && !paddedSpecs;
        }
    }

    isHighEnd() {
        const low = this.isLowEnd();
        const mid = this.isMidRange();
        if (low || mid) return false;

        if (this.isMobile()) {
            const goodCPU = this.cores  === null || this.cores  >= 8;
            const goodRAM = this.memory === null || this.memory >= 6;
            return goodCPU && goodRAM;
        } else {
            const goodCPU = this.cores  === null || this.cores  >= 8;
            const goodRAM = this.memory === null || this.memory >= 16;
            return goodCPU && goodRAM;
        }
    }

    getTier() {
        const low = this.isLowEnd();
        if (low) return "low";

        const mid = this.isMidRange();
        if (mid) return "mid";

        return "high";
    }

    // ── Feature gates ────────────────────────────────────────────────────────

    canShowBackground() {
        const low = this.isLowEnd();
        // Laptops can always show backgrounds; phones only on mid/high
        return this.isDesktop() ? !low : !low;
    }

    canAnimate() {
        const low = this.isLowEnd();
        return !low;
    }

    shouldAggressiveLazyLoad() {
        const low = this.isLowEnd();
        // Always aggressive on low-end; mobile mid-range also benefits
        return low || (this.isMobile() && this.isMidRange());
    }

    canUseModernImages() {
        const low = this.isLowEnd();
        return !low;
    }

    shouldReduceData() {
        const low = this.isLowEnd();
        // Laptops are usually on WiFi, so only reduce on low-end mobile
        return this.isMobile() ? (low || this.prefersReducedMotion()) : low;
    }

    canAutoplayVideo() {
        const high = this.isHighEnd();
        // Desktops can autoplay on mid+; phones only on high-end (battery/data)
        return this.isDesktop() ? !this.isLowEnd() : high;
    }

    // ── Diagnostics ──────────────────────────────────────────────────────────

    getSummary() {
        const tier   = this.getTier();
        const mobile = this.isMobile();

        return {
            device:                    mobile ? "mobile" : "desktop",
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