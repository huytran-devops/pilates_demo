<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Playfair+Display:wght@500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "surface-tint": "#506352",
                    "on-secondary": "#ffffff",
                    "surface-container-highest": "#e4e2e0",
                    "on-secondary-fixed-variant": "#4f453c",
                    "surface-container-lowest": "#ffffff",
                    "on-surface": "#1b1c1b",
                    "on-tertiary": "#ffffff",
                    "on-surface-variant": "#434843",
                    "outline": "#737872",
                    "on-tertiary-container": "#f9ffed",
                    "on-primary": "#ffffff",
                    "on-secondary-container": "#6e6258",
                    "inverse-primary": "#b7ccb7",
                    "tertiary-container": "#6d7862",
                    "surface-container-low": "#f5f3f1",
                    "sage-deep": "#4A5D4C",
                    "on-tertiary-fixed-variant": "#3f4a36",
                    "secondary-fixed": "#f0e0d3",
                    "on-background": "#1b1c1b",
                    "background": "#fbf9f7",
                    "on-primary-fixed-variant": "#394b3b",
                    "surface-container": "#efedec",
                    "error": "#ba1a1a",
                    "on-primary-fixed": "#0e1f12",
                    "secondary-container": "#f0e0d3",
                    "warm-sand": "#EAE3DB",
                    "on-secondary-fixed": "#221a13",
                    "primary": "#4d6150",
                    "inverse-surface": "#30302f",
                    "charcoal-silk": "#2D2D2D",
                    "tertiary-fixed": "#dae7cc",
                    "primary-fixed": "#d2e8d3",
                    "primary-container": "#667a68",
                    "on-primary-container": "#f6fff4",
                    "tertiary-fixed-dim": "#becbb1",
                    "on-tertiary-fixed": "#151e0e",
                    "secondary-fixed-dim": "#d3c4b8",
                    "tertiary": "#545f4a",
                    "primary-fixed-dim": "#b7ccb7",
                    "surface-dim": "#dbdad8",
                    "inverse-on-surface": "#f2f0ee",
                    "error-container": "#ffdad6",
                    "soft-clay": "#B5A496",
                    "on-error-container": "#93000a",
                    "on-error": "#ffffff",
                    "surface-variant": "#e4e2e0",
                    "secondary": "#685c53",
                    "surface": "#fbf9f7",
                    "surface-container-high": "#eae8e6",
                    "surface-bright": "#fbf9f7",
                    "outline-variant": "#c3c8c0"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "section-gap-mobile": "4rem",
                    "container-max": "1280px",
                    "stack-sm": "0.5rem",
                    "section-gap": "8rem",
                    "gutter": "1.5rem",
                    "stack-md": "1.5rem",
                    "stack-lg": "3rem"
            },
            "fontFamily": {
                    "body-md": ["Inter"],
                    "display-hero": ["Playfair Display"],
                    "label-caps": ["Inter"],
                    "headline-lg-mobile": ["Playfair Display"],
                    "headline-md": ["Playfair Display"],
                    "headline-lg": ["Playfair Display"],
                    "body-lg": ["Inter"]
            },
            "fontSize": {
                    "body-md": ["1rem", {"lineHeight": "1.6", "fontWeight": "400"}],
                    "display-hero": ["4.5rem", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "600"}],
                    "label-caps": ["0.75rem", {"lineHeight": "1.5", "letterSpacing": "0.1em", "fontWeight": "600"}],
                    "headline-lg-mobile": ["2.25rem", {"lineHeight": "1.2", "fontWeight": "500"}],
                    "headline-md": ["2rem", {"lineHeight": "1.3", "fontWeight": "500"}],
                    "headline-lg": ["3rem", {"lineHeight": "1.2", "fontWeight": "500"}],
                    "body-lg": ["1.125rem", {"lineHeight": "1.7", "fontWeight": "400"}]
            }
          },
        },
      }
    </script>
<style>
        .nav-item-transition {
            transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1), opacity 0.3s ease;
        }
        .stagger-1 { transition-delay: 50ms; }
        .stagger-2 { transition-delay: 100ms; }
        .stagger-3 { transition-delay: 150ms; }
        .stagger-4 { transition-delay: 200ms; }
        .stagger-5 { transition-delay: 250ms; }
        
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }

        /* Submenu Accordion Style */
        .submenu-enter {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease-out;
        }
        .submenu-open {
            max-height: 500px;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-surface text-on-surface selection:bg-primary-fixed-dim">
<!-- Screen Wrapper -->
<div class="relative h-screen w-full flex flex-col overflow-hidden">
<!-- TopAppBar (Based on Shared Components JSON) -->
<header class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm flex justify-between items-center px-gutter py-4 w-full">
<button class="text-sage-deep hover:opacity-80 transition-opacity active:scale-95 duration-200" onclick="toggleNav()">
<span class="material-symbols-outlined" data-icon="close">close</span>
</button>
<h1 class="font-headline-md text-headline-md text-sage-deep">Jee Pilates</h1>
<button class="bg-primary text-on-primary px-6 py-2 rounded-full font-label-caps text-label-caps hover:opacity-80 transition-opacity active:scale-95 duration-200">
                Book Now
            </button>
</header>
<!-- Main Content Area (Visual Placeholder) -->
<main class="flex-grow flex flex-col items-center justify-center pt-24 px-gutter">
<div class="text-center space-y-stack-md max-w-md">
<p class="font-label-caps text-label-caps text-primary tracking-widest uppercase">Tranquility in Motion</p>
<h2 class="font-headline-lg-mobile text-headline-lg-mobile text-sage-deep">Find your balance.</h2>
<div class="aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-lg border border-warm-sand">
<img class="w-full h-full object-cover" data-alt="A serene Pilates studio bathed in soft morning light filtering through linen curtains. A sleek, modern reformer machine sits on a light wood floor next to a large potted olive tree. The color palette is composed of soft sage greens, warm sandy neutrals, and creamy whites, creating a high-end wellness atmosphere of peace and professional precision." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqUoGmX5LuibnmN5aDvoY9YpY81xrY0t_OiPgSW1paZVceo3GGWdUoznVoPrklHdx4ZGLDOwmRqe7Ez3OnzFTAhsRIjHW6lsf-TOh6QHgWrpMXaO7S__-_6mi0MMReAXSKBlJU5imsVGmnjqZVRecfitXXd_tQbX1Ijdxk0saquy3MnBnodTNihPGXJ3BZXP9g_vCPkfqE1fApnM0z-qmnts_jxHGanwSOzpBIhJ6YHt-dy4QWtEAXKCuyYI5ElCR0CUpWMBpjysU"/>
</div>
</div>
</main>
<!-- Navigation Drawer (The Core Task) -->
<!-- Note: This is styled as a full-screen overlay for mobile UX -->
<nav class="fixed inset-0 z-[60] bg-surface flex flex-col h-full py-8 px-gutter transform translate-x-0 transition-transform duration-500 ease-in-out" id="mobileDrawer">
<!-- Drawer Header -->
<div class="flex justify-between items-center mb-stack-lg">
<span class="font-headline-md text-headline-md text-sage-deep">Jee Pilates</span>
<button class="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors active:scale-95" onclick="toggleNav()">
<span class="material-symbols-outlined" data-icon="close">close</span>
</button>
</div>
<!-- Navigation Links (Editorial Layout) -->
<div class="flex-grow overflow-y-auto no-scrollbar py-4 space-y-6">
<!-- Home -->
<a class="group flex items-center gap-4 text-on-surface-variant hover:text-sage-deep transition-all stagger-1 nav-item-transition" href="#">
<span class="material-symbols-outlined text-primary" data-icon="home">home</span>
<span class="font-headline-lg-mobile text-headline-lg-mobile font-medium">Home</span>
</a>
<!-- Classes with Accordion Sub-links -->
<div class="stagger-2 nav-item-transition">
<button class="w-full group flex justify-between items-center text-sage-deep bg-secondary-container rounded-full px-6 py-4 transition-all" onclick="toggleSubmenu('classesSubmenu')">
<div class="flex items-center gap-4">
<span class="material-symbols-outlined" data-icon="fitness_center">fitness_center</span>
<span class="font-headline-lg-mobile text-headline-lg-mobile font-medium">Classes</span>
</div>
<span class="material-symbols-outlined transition-transform duration-300 rotate-180" data-icon="expand_more" id="submenuIcon">expand_more</span>
</button>
<div class="submenu-enter submenu-open flex flex-col ml-14 mt-4 space-y-4 border-l border-warm-sand" id="classesSubmenu">
<a class="pl-6 py-1 font-body-lg text-body-lg text-on-surface-variant hover:text-sage-deep transition-colors border-l-2 border-transparent hover:border-soft-clay" href="#">Group</a>
<a class="pl-6 py-1 font-body-lg text-body-lg text-on-surface-variant hover:text-sage-deep transition-colors border-l-2 border-transparent hover:border-soft-clay" href="#">Small Group</a>
<a class="pl-6 py-1 font-body-lg text-body-lg text-on-surface-variant hover:text-sage-deep transition-colors border-l-2 border-transparent hover:border-soft-clay" href="#">PT 1-1</a>
<a class="pl-6 py-1 font-body-lg text-body-lg text-on-surface-variant hover:text-sage-deep transition-colors border-l-2 border-transparent hover:border-soft-clay" href="#">Beginners</a>
</div>
</div>
<!-- Memberships -->
<a class="group flex items-center gap-4 text-on-surface-variant hover:text-sage-deep transition-all stagger-3 nav-item-transition" href="#">
<span class="material-symbols-outlined text-primary" data-icon="payments">payments</span>
<span class="font-headline-lg-mobile text-headline-lg-mobile font-medium">Memberships</span>
</a>
<!-- Locations -->
<a class="group flex items-center gap-4 text-on-surface-variant hover:text-sage-deep transition-all stagger-4 nav-item-transition" href="#">
<span class="material-symbols-outlined text-primary" data-icon="location_on">location_on</span>
<span class="font-headline-lg-mobile text-headline-lg-mobile font-medium">Locations</span>
</a>
<!-- Contact -->
<a class="group flex items-center gap-4 text-on-surface-variant hover:text-sage-deep transition-all stagger-5 nav-item-transition" href="#">
<span class="material-symbols-outlined text-primary" data-icon="mail">mail</span>
<span class="font-headline-lg-mobile text-headline-lg-mobile font-medium">Contact</span>
</a>
</div>
<!-- Drawer Footer (CTA & Socials) -->
<div class="mt-auto pt-8 border-t border-warm-sand flex flex-col gap-6 items-center">
<button class="w-full bg-sage-deep text-white py-5 rounded-full font-label-caps text-label-caps tracking-[0.2em] shadow-lg hover:opacity-90 active:scale-[0.98] transition-all">
                    BOOK NOW
                </button>
<div class="flex gap-stack-lg">
<a class="text-sage-deep p-2 hover:bg-surface-container-high rounded-full transition-all" href="#">
<svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewbox="0 0 24 24"><path clip-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" fill-rule="evenodd"></path></svg>
</a>
<a class="text-sage-deep p-2 hover:bg-surface-container-high rounded-full transition-all" href="#">
<svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewbox="0 0 24 24"><path clip-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fill-rule="evenodd"></path></svg>
</a>
</div>
<p class="font-label-caps text-[0.6rem] text-soft-clay pb-4">© 2024 Jee Pilates Studio</p>
</div>
</nav>
<!-- Background Atmospheric Texture (Soft Overlay) -->
<div class="fixed inset-0 pointer-events-none z-0 opacity-10">
<div class="absolute inset-0 bg-[radial-gradient(#EAE3DB_1px,transparent_1px)] [background-size:20px_20px]"></div>
</div>
</div>
<script>
        function toggleNav() {
            const drawer = document.getElementById('mobileDrawer');
            const isOpen = drawer.style.transform === 'translateX(0%)' || drawer.style.transform === '';
            
            if (isOpen) {
                drawer.style.transform = 'translateX(-100%)';
            } else {
                drawer.style.transform = 'translateX(0%)';
                // Trigger subtle refresh of stagger animations
                const items = drawer.querySelectorAll('.nav-item-transition');
                items.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 100 + (index * 50));
                });
            }
        }

        function toggleSubmenu(id) {
            const submenu = document.getElementById(id);
            const icon = document.getElementById('submenuIcon');
            
            if (submenu.classList.contains('submenu-open')) {
                submenu.classList.remove('submenu-open');
                icon.style.transform = 'rotate(0deg)';
            } else {
                submenu.classList.add('submenu-open');
                icon.style.transform = 'rotate(180deg)';
            }
        }

        // Initialize state
        window.onload = () => {
            // Start closed for demo if wanted, but user asked for the drawer UI
            // toggleNav(); 
        }
    </script>
</body></html>