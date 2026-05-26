export class Spinners {
    pulse(container) {
        const spinner = document.createElement("div");
        spinner.classList.add("spinner-pulse");
        this._appendTo(spinner, container);
        return spinner;
    }

    dots(container) {
        const spinner = document.createElement("div");
        spinner.classList.add("spinner-dots");

        for (let i = 0; i < 3; i++) {
            const dot = document.createElement("div");
            dot.classList.add("spinner-dot");
            spinner.appendChild(dot);
        }

        this._appendTo(spinner, container);
        return spinner;
    }

    arc(container) {
        const spinner = document.createElement("div");
        spinner.classList.add("spinner-arc");
        this._appendTo(spinner, container);
        return spinner;
    }

    remove(spinner) {
        if (!spinner) return;

        // If the spinner is inside an overlay wrapper, remove the wrapper
        const overlay = spinner.closest(".spinner-overlay");
        const elementToRemove = overlay || spinner;

        if (elementToRemove.parentNode) {
            elementToRemove.style.opacity = "0";
            elementToRemove.style.transition = "opacity 0.2s ease";
            setTimeout(() => elementToRemove.remove(), 200);
        }
    }

    _appendTo(spinner, container) {
        const target = container || document.body;

        if (target === document.body) {
            const wrapper = document.createElement("div");
            wrapper.classList.add("spinner-overlay");
            wrapper.appendChild(spinner);
            target.appendChild(wrapper);
        } else {
            target.appendChild(spinner);
        }
    }
}

export const spinners = new Spinners();