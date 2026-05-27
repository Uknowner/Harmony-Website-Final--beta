export function render() {
    return `
    <div class="cards">
        <section class="card">
            <h1>Terms of Service</h1>
            <p><strong>Effective date:</strong> 27 May 2026</p>

            <p>
                These Terms of Service govern your use of the Harmony Private Home website.
                By using the site, you agree to these terms.
            </p>

            <div class="important">
                The information on this website is provided for general guidance only. Availability, pricing, and application outcomes are subject to change.
            </div>
        </section>

        <section class="card">
            <h2>Use of the site</h2>
            <ul>
                <li>Use the site lawfully and respectfully.</li>
                <li>Do not try to break, disrupt, scrape, or reverse engineer the site.</li>
                <li>Do not submit false, misleading, or harmful information.</li>
                <li>Do not use the site in a way that interferes with other users or with site operation.</li>
            </ul>
        </section>

        <section class="card">
            <h2>Accommodation enquiries and applications</h2>
            <p>
                Submitting an enquiry or application does not guarantee a room, placement, pricing, or acceptance.
                Applications are reviewed according to the accommodation process in place at the time.
            </p>
            <p>
                Any documents you submit must be accurate, current, and valid. We may reject or delay incomplete,
                incorrect, or unreadable submissions.
            </p>
        </section>

        <section class="card">
            <h2>Content accuracy</h2>
            <p>
                We try to keep the website accurate and current, but we do not guarantee that all information is complete,
                error-free, or always available. Photos, descriptions, and facilities may change.
            </p>
        </section>

        <section class="card">
            <h2>Third-party services</h2>
            <p>
                The website may link to or embed third-party services such as email providers, map services, and social platforms.
                Those services are governed by their own terms and privacy policies.
            </p>
        </section>

        <section class="card">
            <h2>Intellectual property</h2>
            <p>
                The website design, text, branding, and layout are protected unless otherwise stated. You may not copy or reuse
                large parts of the site without permission.
            </p>
        </section>

        <section class="card">
            <h2>Disclaimer and limitation</h2>
            <p>
                The site is provided on an "as is" basis. To the fullest extent allowed by law, we are not liable for indirect,
                incidental, or consequential losses arising from your use of the site.
            </p>
        </section>

        <section class="card">
            <h2>Changes to these terms</h2>
            <p>
                We may update these terms at any time. Continued use of the site after changes are posted means you accept the updated terms.
            </p>
        </section>

        <section class="card">
            <h2>Contact</h2>
            <p>
                Questions about these terms can be sent through the contact page or by using the contact details published on the site.
            </p>
        </section>
    </div>
    `;
}

export function init() {
    document.title = "Terms of Service | Harmony Private Home";
}
