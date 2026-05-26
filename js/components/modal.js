import { registerEventListener } from "../utils.js";
    
export function lightBox(lightbox, lightboxedElement) {
    // Lightbox controls
    registerEventListener(document.getElementById("lightbox-close"), "click", (e) => {
        e.stopPropagation();
        lightbox.classList.remove("active");
        document.body.classList.remove("no-scroll");
    });

    registerEventListener(lightbox, "click", () => {
        lightbox.classList.remove("active");
        document.body.classList.remove("no-scroll");
    });
    
    registerEventListener(lightboxedElement, "click", (e) => e.stopPropagation());

    registerEventListener(document, "keydown", (e) => {
        if (e.key === "Escape") {
            lightbox.classList.remove("active");
            document.body.classList.remove("no-scroll");
        }
    });
    
    return [lightbox, lightboxedElement];
}

export class Skeletons {
  constructor() {
    this.wrapper = null;
  }

  create(container, count, options = {}) {
    const {
      height = "200px",
      width = "100%",
      gap = "16px",
      gridTemplateColumns = "repeat(3, 1fr)",
      display = "grid",
    } = options;

    const wrapper = document.createElement("div");
    wrapper.className = "skeleton-wrapper";
    wrapper.style.display = display;
    wrapper.style.gap = gap;
    wrapper.style.gridTemplateColumns = gridTemplateColumns;
    wrapper.style.width = "100%";

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "skeleton";
      el.style.height = height;
      el.style.width = width;
      wrapper.appendChild(el);
    }

    container.appendChild(wrapper);
    this.wrapper = wrapper;
    return wrapper;
  }

  remove() {
    if (!this.wrapper) return;
    setTimeout(() => {
        this.wrapper.classList.add("removing");
        registerEventListener(this.wrapper, "transitionend", () => {
            this.wrapper.remove();
        });
    }, 150); // small pause before fade starts, not after
  }
}