export class UserHardware {
    constructor() {
        this.cores  = navigator.hardwareConcurrency ?? null; // logical CPU threads; null = unknown
        this.memory = navigator.deviceMemory        ?? null; // GB approx; null on Firefox / Safari
        this._reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

        // React to OS-level reduced-motion changes while the page is open
        // (e.g. user enables Low Power Mode on iOS mid-session)
        this._reducedMotion.addEventListener("change", () => {
            this._reducedMotionActive = this._reducedMotion.matches;
        });
        this._reducedMotionActive = this._reducedMotion.matches;
    }

    // ── Individual readings ──────────────────────────────────────────────────

    getCores() {
        return this.cores;
    }

    getMemoryGB() {
        return this.memory;
    }

    // Reads the cached flag so tier logic always reflects the latest OS state
    prefersReducedMotion() {
        return this._reducedMotionActive;
    }

    // ── Tier classification ──────────────────────────────────────────────────

    // Low-end: confirmed weak CPU or confirmed low RAM.
    // Unknown values (null) are NOT counted against the device — a Safari user
    // on a powerful Mac should not be penalised for the missing deviceMemory API.
    isLowEnd() {
        const weakCPU = this.cores  !== null && this.cores  <= 2;
        const lowRAM  = this.memory !== null && this.memory <  4;
        return weakCPU || lowRAM || this.prefersReducedMotion();
    }

    isMidRange() {
        if (this.isLowEnd()) return false;
        // Updated for 2026: 4 GB RAM is entry-level now, not mid-range.
        // Mid-range: 3–4 cores, or confirmed < 8 GB RAM.
        const midCPU = this.cores  !== null && this.cores  <= 4;
        const midRAM = this.memory !== null && this.memory <  8;
        return midCPU || midRAM;
    }

    isHighEnd() {
        return !this.isLowEnd() && !this.isMidRange();
    }

    // Convenience: returns 'low' | 'mid' | 'high' for simple switch statements
    getTier() {
        if (this.isLowEnd()) return "low";
        if (this.isMidRange()) return "mid";
        return "high";
    }

    // ── Feature gates ────────────────────────────────────────────────────────

    // Background images are decorative and expensive to composite on weak devices.
    // Skip them when the device is confirmed low-end.
    canShowBackground() {
        return !this.isLowEnd();
    }

    // ── Diagnostics ─────────────────────────────────────────────────────────

    getSummary() {
        return {
            cores:                this.getCores(),
            memoryGB:             this.getMemoryGB(),
            prefersReducedMotion: this.prefersReducedMotion(),
            tier:                 this.getTier(),
            canShowBackground:    this.canShowBackground(),
        };
    }
}

export const hardware = new UserHardware();