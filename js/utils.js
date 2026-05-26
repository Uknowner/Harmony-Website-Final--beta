import { getHarmonyDetails } from "./api.js";

const eventListeners = [];
export let harmonyDetails = null;

export async function initHarmonyDetails() {
    harmonyDetails = await getHarmonyDetails();
}
    
export function registerEventListener(element, type, handler) {
    element.addEventListener(type, handler);
    eventListeners.push([element, type, handler]);
}

export function destroyEventListeners() {

    eventListeners.forEach(([element, type, handler]) => {
        element.removeEventListener(type, handler);
    });

    // clear after cleanup
    eventListeners.length = 0;
}

export async function scrollToTarget(scrollTarget) {
    await new Promise(resolve => setTimeout(resolve, 10));
    
    let element = document.getElementById(scrollTarget);
    
    if (!element && scrollTarget.includes('-')) {
        element = document.getElementById(scrollTarget.replace(/-/g, ' '));
    }
    
    if (element) {
        // Get element position
        const position = element.getBoundingClientRect().top + window.scrollY;
        const headerHeight = document.querySelector('header')?.offsetHeight || 80;
        
        // Scroll to position minus header height
        window.scrollTo({
            top: position - headerHeight,
            behavior: "smooth"
        });
        return true;
    }
    
    return false;
}

export function sanitizeText(text = "") {
    return text.replace(/[<>]/g, "").trim();
}

export function sendEmail(name, email, subject = "", message = "") {

    if (!name || !email || !message) {
        alert("Fill all required fields.");
        return;
    }

    const recipient = harmonyDetails.email;

    const cleanSubject = sanitizeText(subject || "Contact Form Submission");

    const body =
         `From: ${sanitizeText(name)}
         Email: ${sanitizeText(email)}
        ${sanitizeText(message)}`;

    const gmail =
        `https://mail.google.com/mail/?view=cm&fs=1` +
        `&to=${encodeURIComponent(recipient)}` +
        `&su=${encodeURIComponent(cleanSubject)}` +
        `&body=${encodeURIComponent(body)}`;

    // 🔥 ALWAYS open Gmail first (reliable)
    const windowOpened = window.open(gmail, "_blank");

    // Only fall back to mailto if the popup was blocked
    if (!windowOpened) {
        const mailto =
            `mailto:${recipient}` +
            `?subject=${encodeURIComponent(cleanSubject)}` +
            `&body=${encodeURIComponent(body)}`;
    
        window.location.href = mailto;
    }
}
    
export function titleCase(dirtyTitle) {
    const title = dirtyTitle.replace(/[^a-zA-Z0-9\s]/g, " ");
    const cleanTitle = title
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    
    return cleanTitle;
}