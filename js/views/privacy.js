export function render() {
    return `
    <div class="cards">
        <section class="card">
            <h1>Privacy Policy</h1>
            <p><strong>Effective date:</strong> 27 May 2026</p>

            <p>
                This Privacy Policy explains how Harmony Private Home ("we", "us", "our") handles information
                when you visit this website, submit a contact message, or start an application.
            </p>

            <div class="important">
                This website is a simple informational site. It does not create user accounts or process online payments.
            </div>
        </section>

        <section class="card">
            <h2>Information we collect</h2>
            <p>We may receive the following information when you use the site:</p>
            <ul>
                <li>Contact details you choose to send through the contact form or email link, such as your name, email address, subject, and message.</li>
                <li>Application details you submit when applying for accommodation.</li>
                <li>Basic technical data that your browser sends automatically, such as IP address, browser type, device type, and pages visited.</li>
                <li>Small local browser data used by the site, such as session storage for the welcome screen.</li>
            </ul>
        </section>

        <section class="card">
            <h2>How we use information</h2>
            <ul>
                <li>To respond to enquiries and applications.</li>
                <li>To manage accommodation enquiries and tenant communication.</li>
                <li>To improve site performance, stability, and usability.</li>
                <li>To keep the website secure and prevent misuse.</li>
            </ul>
        </section>

        <section class="card">
            <h2>How information is shared</h2>
            <p>
                We do not sell your personal information. We may share information only when necessary
                to operate the site, respond to your enquiry, comply with legal obligations, or work with
                service providers that help us run the website.
            </p>
            <p>
                The site uses third-party services and links, including email providers, embedded map content,
                and social media platforms. Those services may collect and process data under their own policies.
            </p>
        </section>

        <section class="card">
            <h2>Cookies and browser storage</h2>
            <p>
                The site may use session storage or similar browser storage to remember simple interface behaviour,
                such as whether you have already seen the welcome screen in the current browser session.
            </p>
            <p>
                We do not currently use a cookie banner because the site does not appear to rely on advertising cookies.
                Your browser settings may still allow you to block or delete stored data.
            </p>
        </section>

        <section class="card">
            <h2>Data retention</h2>
            <p>
                We keep enquiry and application information only for as long as needed to manage communication,
                provide accommodation services, meet legal requirements, or resolve disputes.
            </p>
        </section>

        <section class="card">
            <h2>Your choices</h2>
            <ul>
                <li>You may choose not to submit personal information through the site.</li>
                <li>You may disable browser storage in your browser settings.</li>
                <li>You may contact us to ask about access, correction, or deletion of information we hold, where applicable.</li>
            </ul>
        </section>

        <section class="card">
            <h2>Children's privacy</h2>
            <p>
                This site is intended for prospective and current students and is not directed at children under 13.
            </p>
        </section>

        <section class="card">
            <h2>Changes to this policy</h2>
            <p>
                We may update this policy from time to time. The latest version will appear on this page with a revised effective date.
            </p>

            <p>
                <strong>Contact:</strong> Use the contact page or the email address listed on the site for privacy-related questions.
            </p>
        </section>
    </div>
    `;
}

export function init() {
    document.title = "Privacy Policy | Harmony Private Home";
}
