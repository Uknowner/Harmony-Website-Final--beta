import { destroyEventListeners, registerEventListener } from "./utils.js";

const routes = {
    home: "home",
    gallery: "gallery",
    apply: "apply",
    contact: "contact",
    "about-tkc": "about-tkc",
    facilities: "facilities",
    testimonials: "testimonials",
    rooms: "rooms"
};

let currentModule = null;
let scrollObserver = null;

export const router = {
    _historyIndex: 0,

    init() {
        if (history.state?.index === undefined) {
            history.replaceState({ index: 0 }, "");
        }

        this._historyIndex = history.state?.index ?? 0;

        window.addEventListener("popstate", (e) => {
            const newIndex = e.state?.index ?? 0;
            const oldIndex = this._historyIndex;
            const isBack = newIndex < oldIndex;

            this._historyIndex = newIndex;
            this.handleRoute({ isBack });
        });

        this.handleRoute({ isBack: false });
    },

    navigate(hash) {
        const newIndex = this._historyIndex + 1;
        history.pushState({ index: newIndex }, "", `#${hash}`);
        this._historyIndex = newIndex;
        this.handleRoute({ isBack: false });
    },

    getRoute() {
        return window.location.hash.replace("#", "") || "home";
    },

    async handleRoute({ isBack = false } = {}) {
        const route = this.getRoute();

        // Update active nav link
        document.querySelectorAll("#sidebar a").forEach(a => {
            a.classList.toggle("active", a.dataset.route === route);
        });

        const file = routes[route] || route;
        await this.loadView(file, { isBack });
    },

    async loadView(file, { isBack = false } = {}) {
        destroyEventListeners();
        scrollObserver?.disconnect();
        scrollObserver = null;
        let scrollTarget = null;
    
        if (file.includes("?")) {
            scrollTarget = file.split("=")[1];
            if (scrollTarget?.includes("%20")) {
                scrollTarget = scrollTarget.replace("%20", "-");
            }
            file = file.split("?")[0];
        }

        if (!isBack && file !== "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }

        const content = document.getElementById("page");

        // Lock height so footer can't jump during transition
        content.style.minHeight = content.offsetHeight + "px";

        content.classList.add("page-exit");
        await new Promise(r => setTimeout(r, 150));
        content.classList.remove("page-exit");

        try {
            const module = await import(`./views/${file}.js`);
        currentModule = module;

            content.innerHTML = module.render?.() || "";
    
            requestAnimationFrame(() => {
                content.style.minHeight = "";
                content.classList.add("page-enter");
            });

            setTimeout(() => content.classList.remove("page-enter"), 150);
        
            await module.init?.(isBack ? null : scrollTarget);

            initScrollAnimations();

        } catch (e) {
            const { render } = await import("./views/not-found.js");
            content.innerHTML = render();
            content.style.minHeight = "";
            console.log(e);
        }
    }
};

function initScrollAnimations() {
    scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll(".card").forEach((card, i) => {
        card.classList.add("fade-up");
        card.style.transitionDelay = `${i * 60}ms`;
        scrollObserver.observe(card);
    });
}