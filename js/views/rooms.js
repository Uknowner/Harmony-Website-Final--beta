export function render() {
    return `
    <div class="cards">
        <div class="card">
            <p>Modern Student Living · Steps from Campus</p>

            <div class="price-section">
                <div class="price-card">
                    <div class="room-type">Single Room</div>
                    <div class="price">R5,000<span>/mo</span></div>
                    <div class="per-month">per student</div>
                    <div class="availability available">Available</div>
                </div>
                <div class="price-card">
                    <div class="room-type">Sharing Room</div>
                    <div class="price">R3,500<span>/mo</span></div>
                    <div class="per-month">per student</div>
                    <div class="availability limited">Limited spots</div>
                </div>
            </div>

            <div class="info-grid">
                <div class="info-item">Free Fibre Wi-Fi</div>
                <div class="info-item">24/7 Security</div>
                <div class="info-item">Backup Power</div>
                <div class="info-item">Shuttle to Campus</div>
                <div class="info-item">Laundry Room</div>
                <div class="info-item">Gym Access</div>
            </div>

            <div class="description" style="text-align: center;">
                <p>
                    <strong>Prime location</strong> Fully furnished rooms with study desk, bed, fridgerator and wardrobe.
                    Rent includes water, electricity (within fair usage), and high-speed internet.
                    Communal kitchen, lounge area, and regular cleaning of common spaces.
                </p>
            </div>

            <div class="features-title">What's included</div>
            <ul class="features-list">
                <li>Furnished bedroom</li>
                <li>Study area</li>
                <li>Water & electricity</li>
                <li>Wi-Fi (100Mbps)</li>
                <li>Parking (limited)</li>
                <li>Gym</li>
            </ul>

            <div class="cta">
                <a href="#apply" class="btn" id="applyBtn">Application Process</a>
                <a href="#contact" class="btn" id="contactBtn">Enquire</a>
                <a href="#facilities" class="btn" id="facilitiesBtn">See Facilities</a>
            </div>
        </div>
    </div>`;
}