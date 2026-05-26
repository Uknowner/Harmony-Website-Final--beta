import { getTestimonials } from "../api.js";
import { createTestimonialCards } from "../components/components.js";

export function render() {
    return `
    <div class="cards">
        <div class="testimonials-container"></div>
    </div>`;
}

export async function init(scrollTarget) {
    const container = document.querySelector(".testimonials-container");
    
    const testimonials = await getTestimonials();
    
    createTestimonialCards(container, testimonials);(container, testimonials);
}