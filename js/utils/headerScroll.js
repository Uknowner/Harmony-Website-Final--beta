import { resolves } from '../config/resolver.js';

export function initiateHeaderScrolling(threshold = resolves.headerScrollThreshold) {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScroll = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll - lastScroll > threshold) {
            header.classList.add('scrolled');
            lastScroll = currentScroll;
        } else if (lastScroll - currentScroll > threshold) {
            header.classList.remove('scrolled');
            lastScroll = currentScroll;
        }
    });
}