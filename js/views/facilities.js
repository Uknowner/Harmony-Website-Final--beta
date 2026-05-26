import { Skeletons } from "../components/modal.js";
    
export function render() {
    const html = `
        <div class="cards">

            <div class="card">
                <h2>📶 Wi-Fi</h2>
                <p>
                    Staying connected is non-negotiable when you're a student, and we get that.
                    Every tenant has access to reliable high-speed internet throughout the building —
                    whether you're submitting an assignment at midnight, attending an online lecture,
                    or just unwinding with a stream after a long day.
                </p>
            </div>

            <div class="card">
                <h2>📚 Study Areas</h2>
                <p>
                    Sometimes your room just isn't the right headspace to get work done.
                    Our dedicated study areas give you a quiet, distraction-free environment
                    where you can actually focus. Spacious enough to spread out your notes,
                    calm enough to get into the zone.
                </p>
            </div>

            <div class="card">
                <h2>🧺 Laundry Services</h2>
                <p>
                    Forget the hassle of hand-washing or hunting for a laundromat.
                    We have washing machines and dryers available in each building,
                    so keeping your clothes clean is one less thing to worry about.
                    No more clothes hanging around your room for days either.
                </p>
            </div>

            <div class="card">
                <h2>🔒 Security</h2>
                <p>
                    Your safety is our priority, full stop. The premises are monitored
                    around the clock with 24/7 security patrols keeping watch day and night.
                    Whether you're coming back late from campus or just sleeping in on a Sunday,
                    you can rest easy knowing the building is looked after.
                </p>
            </div>

            <div class="card">
                <h2>🏋️ Gym</h2>
                <p>
                    Staying active is a big part of student life, and you won't need a
                    gym membership to do it. Our on-site gym is right here in the building —
                    no commute, no monthly fees. Fit in a workout between lectures or
                    burn off some steam after a tough exam.
                </p>
            </div>

            <div class="card">
                <h2>📺 TV Room</h2>
                <p>
                    Not every moment has to be about studying. The TV room is a shared space
                    where you can catch a game, watch a series, or just hang out with fellow
                    tenants. It's the kind of place where you end up staying longer than planned
                    and actually getting to know your neighbours.
                </p>
            </div>

            <div class="card">
                <h2>🎱 Entertainment Room</h2>
                <p>
                    When you need a proper break, the entertainment room delivers.
                    Snooker table, ping pong — it's a great way to decompress, have a laugh,
                    and take your mind completely off whatever's been stressing you out.
                    A little friendly competition never hurt anyone.
                </p>
            </div>
            
            <div class="card">
                <h2>🛠️ Maintenance</h2>
                <p>
                    We have a dedicated maintenance team ready to assist you with any furniture
                    issues in your room. They're fast, reliable, and committed to keeping your living space in top condition.
                </p>
            </div>
            
            <div class="card">
                <h2>🧹 Cleaning Services</h2>
                <p>
                    Our dedicated cleaning team keeps all common areas, hallways, and shared facilities
                    spotless on a regular schedule. They take pride in maintaining a fresh, hygienic
                    environment so you can focus on your studies and feel right at home.
                </p>
            </div>
            
            <div class="card text-center">
                <h2>Gallery</h2>                
                <p>
                    Take a look inside Harmony Private Home. Our gallery showcases the comfortable rooms, modern
                    facilities, study areas, entertainment spaces, and the welcoming atmosphere that
                    makes Harmony the ideal student accommodation.
            </p>
    
    <a href="#gallery" class="btn">Open Gallery</a>
</div>

        </div>
    `;

    return html;
}