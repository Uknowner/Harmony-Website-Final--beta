import { harmonyDetails } from "./utils.js";
import { resolves } from './config/resolver.js'

export function render() {
return `
<div class="site-footer">
    <div class="footer-container">

        <!-- About -->
        <div class="footer-about">
            <h3>${harmonyDetails.siteName}</h3>

            <p>
                Safe, affordable student accommodation located near UNISA, 
                Sunnyside, Pretoria.
            </p>

            <a href="#about-tkc">
                <p class="managed-by">
                    Managed by ${harmonyDetails.managedBy}.
                </p>
            </a>
        </div>

        <!-- Links -->
        <div class="footer-links">
            <h4>Quick Links</h4>

            <ul>
                <li>
                    <a href="#home">
                        <i class="ti ti-home" aria-hidden="true"></i>
                        Home
                    </a>
                </li>

                <li>
                    <a href="#rooms">
                        <i class="ti ti-door" aria-hidden="true"></i>
                        Rooms
                    </a>
                </li>

                <li>
                    <a href="#facilities">
                        <i class="ti ti-building" aria-hidden="true"></i>
                        Facilities
                    </a>
                </li>

                <li>
                    <a href="#gallery">
                        <i class="ti ti-photo" aria-hidden="true"></i>
                        Gallery
                    </a>
                </li>

                <li>
                    <a href="#testimonials">
                        <i class="ti ti-message" aria-hidden="true"></i>
                        Testimonials
                    </a>
                </li>

                <li>
                    <a href="#contact">
                        <i class="ti ti-mail" aria-hidden="true"></i>
                        Contact
                    </a>
                </li>

                <li>
                    <a href="#apply">
                        <i class="ti ti-pencil" aria-hidden="true"></i>
                        Apply
                    </a>
                </li>

                <li>
                    <a href="#privacy">
                        <i class="ti ti-shield-lock" aria-hidden="true"></i>
                        Privacy Policy
                    </a>
                </li>

                <li>
                    <a href="#terms">
                        <i class="ti ti-file-text" aria-hidden="true"></i>
                        Terms of Service
                    </a>
                </li>
            </ul>
        </div>

        <!-- Contact -->
        <div class="footer-contact">
            <h4>Contact</h4>

            <ul>
                <li>
                    <i class="ti ti-phone" aria-hidden="true"></i>

                    <a href="tel:${harmonyDetails.cellNumber}">
                        ${harmonyDetails.cellNumber}
                    </a>
                </li>

                <li>
                    <i class="ti ti-brand-whatsapp" aria-hidden="true"></i>

                    <a 
                        href="https://wa.me/${harmonyDetails.whatsapp.replace(/\\s+/g, "")}" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        ${harmonyDetails.whatsapp}
                    </a>
                </li>

                <li>
                    <i class="ti ti-mail" aria-hidden="true"></i>

                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=${harmonyDetails.email}" target="_blank" rel="noopener noreferrer">
                        ${harmonyDetails.email}
                    </a>
                </li>

                <li>
                    <a href="https://maps.app.goo.gl/gYJgo7G3iQbbA23o7" target="_blank" rel="noopener noreferrer">
                        <i class="ti ti-map-pin" aria-hidden="true"></i>

                        <span>
                            ${harmonyDetails.address}, 
                            ${harmonyDetails.city}, 
                            ${harmonyDetails.province}
                        </span>
                    </a>
                </li>
            </ul>
        </div>

        <!-- Social -->
        <div class="footer-socials">
            <h4>Connect</h4>

            <ul>
                <li>
                    <a 
                        href="${harmonyDetails.tiktok}" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="Visit TKC Properties Student Res on TikTok"
                    >
                        <i class="ti ti-brand-tiktok" aria-hidden="true"></i>
                    </a>
                </li>

                <li>
                    <a 
                        href="${harmonyDetails.instagram}" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="Visit TKC Properties on Instagram"
                    >
                        <i class="ti ti-brand-instagram" aria-hidden="true"></i>
                    </a>
                </li>

                <li>
                    <a 
                        href="${harmonyDetails.facebook}" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="Visit TKC Properties on Facebook"
                    >
                        <i class="ti ti-brand-facebook" aria-hidden="true"></i>
                    </a>
                </li>
            </ul>
        </div>

    </div>

    <div class="footer-bottom">
        <p>
            &copy; 2026 ${harmonyDetails.siteName}. 
            All rights reserved.
        </p>

        <p class="site-credit">
            Site by 
            <a 
                href="https://www.instagram.com/lwazi.vibes/" 
                target="_blank" 
                rel="noopener noreferrer"
            >
                Lwazi Radebe
            </a>
        </p>
    </div>

</div>
`;
}

export async function init(scrollTarget) {
    // 1. Grab the footer from the DOM first
    const footer = document.querySelector('.site-footer');
    
    if (footer) {
        // 2. Toggle the class safely
        footer.classList.toggle('is-solid', resolves.features.backgrounds);
    }
}