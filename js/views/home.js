import { getGallery } from "../api.js";
import { harmonyDetails } from "../utils.js";

export function render() {
    const html = `
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
        
        <div class="cards" id="container">
            <div class="card fade-up">
                <div class="card-text-media">
                    <div class="card-content-container">
                        <h2>Rooms & Pricing</h2>
                        <p>We offer comfortable single and shared rooms, each furnished with new furniture upon moving in and maintained year-round by our dedicated maintenance team.</p>
                        <h3>Rooms contain:</h3>
                        <ul>
                            <li>Fridge</li>
                            <li>Study desk</li>
                            <li>Study lamps</li>
                            <li>Spacious Wardrobes</li>
                            <li>Single bed</li>                            
                            <li>Basin</li>
                            <li>Bathroom and toilet inside for sharing rooms</li>
                        </li>
                    </div>
                    <div class="card-image-container" id="rooms-img">
                        <img src="assets/images/single-rooms/room1.webp" alt="">
                    </div>
                </div>
                <a href="#rooms" class="btn">Read more</a>
                <a href="#gallery?scroll=single%20rooms" class="btn">See rooms</a>
            </div>

            <div class="card fade-up">
                <h2>Facilities</h2>
                <p><strong>Study Areas:</strong> Quiet, spacious areas for focused study outside your room.</p>
                <p><strong>Laundry Services:</strong> Washing machines and dryers in each building — no need to hang clothes.</p>
                <p><strong>Security:</strong> 24/7 security patrols and monitoring for peace of mind.</p>
                <p><strong>Gym:</strong> On-site gym to help students stay fit and healthy.</p>
                
                <a href="#facilities" class="btn">Read more</a>
            </div>

            <div class="card fade-up">
                <h2>Gallery</h2>
                <div class="gallery"></div>
            </div>

            <div class="card fade-up">
                <h2>What Our Students Say</h2>
                <p>We value the feedback from our tenants as they help us build a better environment for the next. See our reviews and what students had to say about Harmony.</p>
                <blockquote>
                    "Harmony Private Home gave me the perfect balance of study and social life."
                    <cite>— Thabo, 2nd Year Engineering</cite>
                </blockquote>
                <blockquote>
                    "Affordable, safe, and close to campus. Highly recommend!"
                    <cite>— Lerato, 3rd Year Law</cite>
                </blockquote>
                
                <a href="#testimonials" class="btn">Read more</a>
            </div>

            <div class="card fade-up">
                <h2>Find Us</h2>
                <iframe
                    src="${harmonyDetails.googleMapsUrl}"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    title="Google Maps location of Harmony Private Home">
                </iframe>
                <p>Physical Address: 127 Steve Biko St, Sunnyside, Pretoria, 0007</p>
                <div class="important">
                    <strong>Note:</strong> The map view reflects 2024 imagery and may not show recent updates. For the latest visuals, please see the <a id="inline-anchor" href="#gallery?scroll=building">building and entrance</a> photos in our gallery.
                </div>
            </div>

            <div class="card fade-up">
                <h2>Visit Our:</h2>
                <div class="contact-buttons">
                    <a href="${harmonyDetails.tiktok}" target="_blank" rel="noopener noreferrer" aria-label="Visit TKC Properties Student Res on TikTok" class="btn contact-btn" aria-label="TikTok">
                        <i class="ti ti-brand-tiktok" aria-hidden="true"></i>TikTok
                    </a>
                    <a href="${harmonyDetails.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Visit TKC Properties on Instagram" class="btn contact-btn" aria-label="Instagram">
                        <i class="ti ti-brand-instagram" aria-hidden="true"></i>Instagram
                    </a>
                    <a href="${harmonyDetails.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Visit TKC Properties on Facebook" class="btn contact-btn" aria-label="Facebook">
                        <i class="ti ti-brand-facebook" aria-hidden="true"></i>Facebook
                    </a>
                    <a href="#contact" class="btn contact-btn">Contact Page</a>
                </div>
            </div>

            <div class="card special-card fade-up">
                <h2>Apply</h2>
                <p>Spaces are limited — secure your room today!</p>
                <a href="#apply" class="btn">Application Process</a>
            </div>
        </div>
        
        <script async src="https://www.tiktok.com/embed.js"><\/script>
    `;
    
    return html;
}

function createSkeletons(container) {
    let skeletonImgs = [];
    
    for (let i = 0; i < 3; i++) {
        const skeletonImg = document.createElement("div");
        skeletonImg.classList.add("skeleton");  // Fixed: use add() method, not assignment
        skeletonImg.style.width = "100%";
        skeletonImg.style.height = "100px";     // Fixed: added "px" unit
    
        container.appendChild(skeletonImg);
        skeletonImgs.push(skeletonImg);         // Fixed: use push() for arrays
    }
    
    return skeletonImgs;
}

export async function init(scrollTarget) {
    // Scroll indicator: click scrolls to first card, hides on scroll
    const indicator = document.getElementById("heroScrollIndicator");
    const firstCard  = document.querySelector("#container");

    if (indicator && firstCard) {
        indicator.addEventListener("click", () => {
            firstCard.scrollIntoView({ behavior: "smooth", block: "start" });
        });

        const hideOnScroll = () => {
            if (window.scrollY > 60) {
                indicator.style.opacity = "0";
                indicator.style.transition = "opacity 0.3s ease";
                window.removeEventListener("scroll", hideOnScroll);
            }
        };
        window.addEventListener("scroll", hideOnScroll, { passive: true });
    }
    
    const APPLY_MONTHS = [11, 0]; // 11 = December, 0 = January
    const currentMonth = new Date().getMonth();

    if (APPLY_MONTHS.includes(currentMonth)) {
        const applyBtn = document.createElement("a");
        applyBtn.href = "#apply";
        applyBtn.classList.add("btn", "hero-btn");
        applyBtn.textContent = "Apply";

        document.getElementById("hero-content").appendChild(applyBtn);
    }

    const gallery = document.querySelector(".gallery");
    if (!gallery) return;
    
    const skeletonImgs = createSkeletons(gallery);

    try {
        const data = await getGallery();
        const isEmpty =
            !data ||
            Object.keys(data).length === 0 ||
            Object.values(data).every(arr => !Array.isArray(arr) || arr.length === 0);

        if (isEmpty) {
            gallery.innerHTML = `
                <div class="gallery-empty">
                    <p>Our gallery is currently empty.</p>
                    <p>Come back later to see updates from us.</p>
                </div>`;
            return;
        }

        const previews = [
            { src: "assets/images/gym/wide-view1.webp", alt: "Wide view of gym and its equipments" },
            { src: "assets/images/single-rooms/room2.webp", alt: "Single room with clean bed and tiny desk near the window" },
            { src: "assets/images/other/braii_area.webp", alt: "Open space with braai stands" }
        ];

        previews.forEach(({ src, alt }) => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = alt;
            img.loading = "lazy";
            gallery.appendChild(img);
        });

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("gallery-btn-container");

        const btn = document.createElement("a");
        btn.href = "#gallery";
        btn.classList.add("btn");
        btn.textContent = "Open Gallery";

        btnContainer.appendChild(btn);
        gallery.appendChild(btnContainer);
        
        if (!document.querySelector(".whatsapp-btn")) {
        const whatsapp = document.createElement("a");

        whatsapp.href = `https://wa.me/${harmonyDetails.whatsapp}`;
        whatsapp.target = "_blank";
        whatsapp.rel = "noopener noreferrer";
        whatsapp.className = "whatsapp-btn";
        whatsapp.setAttribute("aria-label", "Chat with us on WhatsApp");

        whatsapp.innerHTML = `
            <i class="ti ti-brand-whatsapp" aria-hidden="true"></i>
        `;

        document.body.appendChild(whatsapp);
}

    } catch (err) {
        gallery.innerHTML = `<div class="gallery-empty"><p>Gallery could not be loaded.</p><p>${err.message}</p></div>`;
    } finally {
        skeletonImgs.forEach(skeletonImg => skeletonImg.remove());
    }
}