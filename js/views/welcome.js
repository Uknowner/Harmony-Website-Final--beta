export function render() {
    return `
        <div class="hero">
            <img
                class="hero-bg"
                src="assets/images/building/front-gate.webp"
                alt="View of the front gate of Harmony Private Home">
            <div class="hero-overlay"></div>
            <div class="hero-content" id="hero-content">
                <span class="hero-badge">NSFAS Accredited · Sunnyside, Pretoria</span>
                <h1>Your Home Away From Home</h1>
                <p>Safe, affordable student accommodation steps from UNISA</p>
            </div>

            <div class="hero-scroll-indicator" id="heroScrollIndicator" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
}

export function init() {
    const hero = document.querySelector(".hero");

    if (hero) {
        // Create a placeholder to hold the space
        const placeholder = document.createElement("div");
        placeholder.style.height = hero.offsetHeight + "px";
        placeholder.style.visibility = "hidden";
        hero.after(placeholder);

        hero.classList.add("hero-fullscreen");

        setTimeout(() => {
            hero.classList.add("hero-collapsing");

            // After animation ends, restore to normal flow
            hero.addEventListener("transitionend", () => {
                hero.classList.remove("hero-fullscreen", "hero-collapsing");
                placeholder.remove();
            }, { once: true });

        }, 3000);
    }
}