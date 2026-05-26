import { getGallery } from "../api.js";
import { titleCase, registerEventListener, scrollToTarget } from "../utils.js";
import { lightBox } from "../components/modal.js";
import { network } from "../network.js";
import { spinners } from "../components/spinners.js";
import { skeletons } from "../components/skeletons.js";

export function render() {
    return `
    <div class="cards">
        <div class="lightbox" id="lightbox">
            <button id="lightbox-close" class="close-btn">✕</button>
            <img id="lightboxImg" alt="">
        </div>
        <div class="gallery"></div>
    </div>`;
}

function createCardSkeletons(gallery, count = 3) {
    const skeletonCards = [];

    for (let i = 0; i < count; i++) {
        const card = document.createElement("div");
        card.classList.add("card");

        const headerSkeleton = document.createElement("div");
        headerSkeleton.className = "skeleton";
        headerSkeleton.style.height = "28px";
        headerSkeleton.style.width = "160px";
        headerSkeleton.style.marginBottom = "12px";
        card.appendChild(headerSkeleton);

        const grid = document.createElement("div");
        grid.classList.add("image-grid");

        for (let j = 0; j < 6; j++) {
            const imgSkeleton = document.createElement("div");
            imgSkeleton.className = "skeleton";
            imgSkeleton.style.height = "200px";
            imgSkeleton.style.width = "100%";
            grid.appendChild(imgSkeleton);
        }

        card.appendChild(grid);
        gallery.appendChild(card);
        skeletonCards.push(card);
    }

    return skeletonCards;
}

export async function init(scrollTarget) {
    let lightbox = document.getElementById("lightbox");
    let lightboxImg = document.getElementById("lightboxImg");

    const lightboxFunc = lightBox(lightbox, lightboxImg);
    lightbox = lightboxFunc[0];
    lightboxImg = lightboxFunc[1];

    const gallery = document.querySelector(".gallery");
    if (!lightbox || !lightboxImg || !gallery) return;

    // Show skeleton cards while data loads
    const skeletonCards = createCardSkeletons(gallery);

    const imgLoadingType = network.isSlow() ? "lazy" : "eager";

    // Slow network message
    const slowNetworkMessage = document.createElement("p");
    slowNetworkMessage.classList.add("important");
    slowNetworkMessage.textContent = "Slow network. Image loading may be slow.";
    slowNetworkMessage.style.opacity = "0";
    slowNetworkMessage.style.transition = "opacity 0.8s";
    gallery.appendChild(slowNetworkMessage);

    let slowMessageVisible = false;
    let slowMessageTimeout = null;

    if (network.isSlow() || network.isSaveData()) {
        slowMessageTimeout = setTimeout(() => {
            slowNetworkMessage.style.opacity = "1";
            slowMessageVisible = true;
        }, 1500);
    }

    try {
        const data = await getGallery();

        // Remove skeleton cards once data is ready
        skeletonCards.forEach(card => card.remove());

        Object.entries(data).forEach(([category, images]) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.id = category;

            const header = document.createElement("h2");
            header.textContent = titleCase(category);
            card.appendChild(header);

            const imageGrid = document.createElement("div");
            imageGrid.classList.add("image-grid");

            images.forEach(image => {
                const ext = image.src.split(".").pop().toLowerCase();

                if (ext === "mp4") {
                    const placeholder = document.createElement("div");
                    placeholder.className = "skeleton";
                    placeholder.style.height = "200px";
                    imageGrid.appendChild(placeholder);

                    const video = document.createElement("video");
                    video.src = `assets/images/${category}/${image.src}`;
                    video.alt = image.alt;
                    video.muted = true;
                    video.loop = true;
                    video.playsInline = true;
                    video.controls = true;
                    video.preload = "none"

                    video.oncanplay = () => placeholder.replaceWith(video);

                    registerEventListener(video, "click", () => {
                        if (video.paused) {
                            video.play();
                        } else {
                            video.pause();
                        }
                    });

                } else {
                    const placeholder = document.createElement("div");
                    placeholder.className = "skeleton";
                    placeholder.style.height = "200px";
                    imageGrid.appendChild(placeholder);

                    const img = document.createElement("img");
                    img.alt = image.alt;
                    img.loading = imgLoadingType;

                    img.onload = () => placeholder.replaceWith(img);
                    img.onerror = () => placeholder.remove();

                    img.src = `assets/images/${category}/${image.src}`;

                    registerEventListener(img, "click", () => {
                        document.body.classList.add("no-scroll");
                        lightbox.classList.add("active");
                        lightboxImg.src = img.src;
                    });
                }
            });

            card.appendChild(imageGrid);
            gallery.appendChild(card);
        });

        if (scrollTarget) scrollToTarget(scrollTarget);

    } catch (err) {
        console.error("Failed to load gallery:", err);
        skeletonCards.forEach(card => card.remove());
        gallery.innerHTML = "<p>Failed to load gallery.</p>";
    } finally {
        clearTimeout(slowMessageTimeout);
        if (slowMessageVisible) {
            slowNetworkMessage.style.opacity = "0";
            setTimeout(() => slowNetworkMessage.remove(), 800);
        } else {
            slowNetworkMessage.remove();
        }
    }
}