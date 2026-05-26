const menuItems = [
        { route: 'home',         label: 'Home',         icon: 'ti-home'        },
        { route: 'rooms',        label: 'Rooms',        icon: 'ti-door'        },
        { route: 'facilities',   label: 'Facilities',   icon: 'ti-building'    },
        { route: 'gallery',      label: 'Gallery',      icon: 'ti-photo'       },
        { route: 'testimonials', label: 'Testimonials', icon: 'ti-message'     },
        { route: 'contact',      label: 'Contact',      icon: 'ti-mail'        },
        { route: 'apply',        label: 'Apply',        icon: 'ti-pencil'      },
        { route: 'about-tkc',    label: 'About TKC',    icon: 'ti-info-circle' },
]

export function loadMenu() {
    const header = document.querySelector('header');
    if (!header || header.dataset.loaded === 'true') return;
    header.dataset.loaded = 'true';

    // Logo
    const logoLink = document.createElement('a');
    logoLink.href = '#home';
    const logo = document.createElement('img');
    logo.src = 'assets/images/logos/nav-logo.webp';
    logo.alt = 'Harmony Private Home Logo';
    logo.classList.add('tkc-logo');
    logoLink.appendChild(logo);

    // Menu toggle
    const menuBtn = document.createElement('button');
    menuBtn.id = 'menuBtn';
    menuBtn.className = 'menu-btn';
    menuBtn.setAttribute('aria-label', 'Open Menu');
    menuBtn.innerHTML = '☰';

    header.appendChild(logoLink);
    header.appendChild(menuBtn);

    // Sidebar
    let aside = document.getElementById('sidebar');
    let closeBtn = null;

    if (!aside) {
        aside = document.createElement('aside');
        aside.id = 'sidebar';
        aside.className = 'sidebar';

        closeBtn = document.createElement('button');
        closeBtn.id = 'closeBtn';
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '✕';

        const ul = document.createElement('ul');
        menuItems.forEach(({ route, label, icon }) => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${route}`;
            link.dataset.route = route;
            link.innerHTML = `<i class="ti ${icon}" aria-hidden="true"></i> ${label}`;
            li.appendChild(link);
            ul.appendChild(li);
        });

        aside.appendChild(closeBtn);
        aside.appendChild(ul);
        document.body.appendChild(aside);
    } else {
        closeBtn = document.getElementById('closeBtn');
    }

    // Overlay
    let overlay = document.getElementById('overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'overlay';
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
    }

    // Toggle functions
    const openMenu = () => {
        aside.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('no-scroll');
    };
    const closeMenu = () => {
        aside.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    };

    menuBtn.addEventListener('click', openMenu);
    closeBtn?.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    aside.addEventListener('click', (e) => {
        if (e.target.closest('a')) closeMenu();
    });
}