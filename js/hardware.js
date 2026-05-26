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

    getCores() {
        return this.cores;
    }

    getMemoryGB() {
        return this.memory;
    }

    prefersReducedMotion() {
        return this._reducedMotionActive;
    }

    // ── Phone-specific tier classification (SA students, 2026) ──────────────
    // 
    // LOW:    R1000-R2500  → Entry-level Android (Itel, Tecno Spark, Samsung A0x)
    //         Realistic: 4-6 cores (A53/A55 little cores), 2-3GB RAM
    //         Examples: Itel P55 (R1800), Tecno Spark 20C (R2200)
    // 
    // MID:    R3000-R6000  → Decent budget (Samsung A1x/A2x, Redmi Note series)
    //         Realistic: 6-8 cores (some big.LITTLE), 4-6GB RAM
    //         Examples: Samsung A16 (R3800), Redmi Note 14 (R5500)
    // 
    // HIGH:   R6000+       → Mid-range to flagship (Samsung A5x, Pixel 7a, older flagships)
    //         Realistic: 8+ cores, 6-12GB RAM
    //         Examples: Samsung A55 (R7000), second-hand Pixel 6 (R6500)
    
    isLowEnd() {
        // Low-end phones in SA: 2-3GB RAM, mostly little cores
        const weakCPU = this.cores  !== null && this.cores  <= 6;    // 4-6 cores = entry level
        const lowRAM  = this.memory !== null && this.memory <  4;    // 3GB or less = struggling
        const reducedMotion = this.prefersReducedMotion();           // User knows their phone is slow
        
        return weakCPU || lowRAM || reducedMotion;
    }

    isMidRange() {
        if (this.isLowEnd()) return false;
        
        // Mid-range phone: 6-8 cores OR 4-6GB RAM
        const midCPU = this.cores  !== null && this.cores  <= 8;
        const midRAM = this.memory !== null && this.memory <= 6;
        
        // Special case: 8GB RAM but weak CPU (e.g., random Chinese brand)
        const decentRAMWithWeakCPU = (this.memory !== null && this.memory >= 6) && 
                                      (this.cores  !== null && this.cores  <= 6);
        
        return (midCPU || midRAM) && !decentRAMWithWeakCPU;
    }

    isHighEnd() {
        if (this.isLowEnd() || this.isMidRange()) return false;
        
        // High-end phone: 8+ cores AND 6+GB RAM (what SA students save up for)
        const goodCPU = this.cores  === null || this.cores  >= 8;
        const goodRAM = this.memory === null || this.memory >= 6;
        
        return goodCPU && goodRAM;
    }

    getTier() {
        if (this.isLowEnd()) return "low";
        if (this.isMidRange()) return "mid";
        return "high";
    }

    // ── Phone-specific feature gates ────────────────────────────────────────
    
    canShowBackground() {
        // Backgrounds cost battery on phones. Only on mid/high.
        return !this.isLowEnd();
    }
    
    // Can we run smooth 60fps animations?
    canAnimate() {
        return !this.isLowEnd();  // Mid-range phones handle basic CSS animations
    }
    
    // Should we lazy-load everything aggressively?
    shouldAggressiveLazyLoad() {
        return this.isLowEnd();   // Low-end phones need all the help they can get
    }
    
    // Can we afford webp/avif or need jpeg?
    canUseModernImages() {
        return !this.isLowEnd();  // Mid/high can decode webp efficiently
    }
    
    // Reduce API calls / data usage (capped mobile data)
    shouldReduceData() {
        return this.isLowEnd() || this.prefersReducedMotion();
    }
    
    // Can we show autoplay videos? (battery + data killer on low-end)
    canAutoplayVideo() {
        return this.isHighEnd();   // Only high-end gets video backgrounds
    }

    // ── Diagnostics ─────────────────────────────────────────────────────────
    
    getSummary() {
        return {
            cores:                     this.getCores(),
            memoryGB:                  this.getMemoryGB(),
            prefersReducedMotion:      this.prefersReducedMotion(),
            tier:                      this.getTier(),
            canShowBackground:         this.canShowBackground(),
            canAnimate:                this.canAnimate(),
            shouldAggressiveLazyLoad:  this.shouldAggressiveLazyLoad(),
            shouldReduceData:          this.shouldReduceData(),
            canAutoplayVideo:          this.canAutoplayVideo(),
        };
    }
}

export const hardware = new UserHardware();