import { Skeletons } from "./skeletons.js";

export class Popup {
    constructor() {
        this.popup = null;
        this.overlay = null;
        this.messageTimeout = null;
    }

    _createBase(centered = false) {
        const popup = document.createElement("div");
        popup.id = "popup";
        popup.className = "card";
        popup.style.cssText = `
            position: fixed;
            left: 50%;
            ${centered ? "top: 50%; transform: translate(-50%, -50%);" : "top: 70px; transform: translateX(-50%);"}
            z-index: 9999;
            text-align: center;
            max-width: 400px;
            width: 90%;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        return popup;
    }

    _createOverlay() {
        const overlay = document.createElement("div");
        overlay.id = "popup-overlay";
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9998;
        `;
        return overlay;
    }

    // Auto-dismisses after 3 seconds, no overlay
    message(text = "Something went wrong.") {
        if (document.getElementById("popup")) return;

        const popup = this._createBase(false);
        popup.textContent = text;
        this.popup = popup;

        document.body.appendChild(popup);
        requestAnimationFrame(() => popup.style.opacity = "1");

        clearTimeout(this.messageTimeout);
        this.messageTimeout = setTimeout(() => this.hide(), 4000);
    }

    // Requires user interaction, has overlay
    confirm(text = "Are you sure?", onConfirm, onCancel) {
        if (document.getElementById("popup")) return;

        const popup = this._createBase(confirm);
        this.overlay = this._createOverlay();

        const msg = document.createElement("p");
        msg.textContent = text;

        const btnGroup = document.createElement("div");
        btnGroup.style.cssText = "display: flex; gap: 1rem; justify-content: center; margin-top: 1rem;";

        const yesBtn = document.createElement("button");
        yesBtn.textContent = "Yes";
        yesBtn.className = "btn";
        yesBtn.addEventListener("click", () => {
            this.hide();
            onConfirm?.();
        });

        const noBtn = document.createElement("button");
        noBtn.textContent = "No";
        noBtn.className = "btn";
        noBtn.addEventListener("click", () => {
            this.hide();
            onCancel?.();
        });

        btnGroup.append(yesBtn, noBtn);
        popup.append(msg, btnGroup);
        this.popup = popup;

        document.body.append(this.overlay, popup);
        requestAnimationFrame(() => popup.style.opacity = "1");

        this.overlay.addEventListener("click", () => {
            this.hide();
            onCancel?.();
        });
    }

    hide() {
        if (!this.popup) return;
        clearTimeout(this.messageTimeout);
        this.popup.style.opacity = "0";
        setTimeout(() => {
            this.popup?.remove();
            this.overlay?.remove();
            this.popup = null;
            this.overlay = null;
        }, 300);
    }
}

export const popup = new Popup();

export async function createTestimonialCards(container, data, skeletonOptions = null) {
    let skeletons = null;
    
    // Create skeletons if options provided
    if (skeletonOptions) {
        const { count = 6, height = "130px", width = "100%", gap = "12px", gridTemplateColumns = "1fr" } = skeletonOptions;
        skeletons = new Skeletons();
        skeletons.create(container, count, {
            height,
            width,
            gap,
            gridTemplateColumns
        });
    }

    try {
        data.forEach(testimonial => {
            const card = document.createElement("div");
            card.classList.add("card");

            const blockquote = document.createElement("blockquote");

            const quote = document.createElement("p");
            quote.textContent = `"${testimonial.quote}"`;
            blockquote.appendChild(quote);

            const citeElement = document.createElement("cite");
            citeElement.textContent = `— ${testimonial.name}`;
            blockquote.appendChild(citeElement);

            if (testimonial.detail) {
                const detailElement = document.createElement("p");
                detailElement.textContent = testimonial.detail;
                detailElement.style.fontSize = "0.85rem";
                detailElement.style.color = "var(--text-faint)";
                detailElement.style.marginTop = "0.25rem";
                blockquote.appendChild(detailElement);
            }

            card.appendChild(blockquote);
            container.appendChild(card);
        });

    } catch (err) {
        container.textContent = "Failed to load testimonials.";
    } finally {
        if (skeletons) {
            skeletons.remove();
        }
    }
}