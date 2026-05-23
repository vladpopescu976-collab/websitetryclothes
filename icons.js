(() => {
    const iconPaths = {
        "badge-check": '<path d="M9 12l2 2 4-5"/><path d="M12 3l2.2 1.1 2.4-.2 1.3 2 2.1 1-.2 2.4L21 12l-1.1 2.2.2 2.4-2 1.3-1 2.1-2.4-.2L12 21l-2.2-1.1-2.4.2-1.3-2-2.1-1 .2-2.4L3 12l1.1-2.2-.2-2.4 2-1.3 1-2.1 2.4.2L12 3z"/>',
        "brain-circuit": '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5.5A3.5 3.5 0 0 0 7.5 18H9"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5.5A3.5 3.5 0 0 1 16.5 18H15"/><path d="M12 4v16"/><path d="M8 9h3"/><path d="M13 9h3"/><circle cx="8" cy="9" r="1"/><circle cx="16" cy="9" r="1"/><path d="M8 15h3"/><path d="M13 15h3"/><circle cx="8" cy="15" r="1"/><circle cx="16" cy="15" r="1"/>',
        "chevron-down": '<path d="m6 9 6 6 6-6"/>',
        "gallery-horizontal-end": '<path d="M2 7v10"/><path d="M6 5v14"/><rect x="10" y="6" width="10" height="12" rx="2"/>',
        "image-up": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 15 4-4 3 3 2-2 5 5"/><path d="M14 8h5"/><path d="m16 6 3 2-3 2"/>',
        "layers": '<path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/>',
        "mail": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
        "plus": '<path d="M12 5v14"/><path d="M5 12h14"/>',
        "ruler": '<path d="M3 8h18v8H3z"/><path d="M7 8v4"/><path d="M11 8v3"/><path d="M15 8v4"/><path d="M19 8v3"/>',
        "scan-face": '<path d="M7 3H5a2 2 0 0 0-2 2v2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M17 21h2a2 2 0 0 0 2-2v-2"/><path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M9 15a4 4 0 0 0 6 0"/>',
        "shirt": '<path d="M9 3h6l2 3 4 2-3 5-2-1v8H8v-8l-2 1-3-5 4-2 2-3z"/><path d="M9 3a3 3 0 0 0 6 0"/>',
        "smartphone": '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
        "sparkles": '<path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z"/><path d="M5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14z"/>'
    };

    function createIcons(root = document) {
        root.querySelectorAll("[data-lucide]").forEach((node) => {
            const name = node.getAttribute("data-lucide");
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.setAttribute("fill", "none");
            svg.setAttribute("stroke", "currentColor");
            svg.setAttribute("stroke-width", "1.8");
            svg.setAttribute("stroke-linecap", "round");
            svg.setAttribute("stroke-linejoin", "round");
            svg.setAttribute("aria-hidden", "true");
            svg.setAttribute("focusable", "false");
            if (node.className) {
                svg.setAttribute("class", node.className);
            }
            svg.innerHTML = iconPaths[name] || iconPaths.sparkles;
            node.replaceWith(svg);
        });
    }

    window.TryClothesIcons = { createIcons };

    function scheduleCreateIcons() {
        if ("requestIdleCallback" in window) {
            window.requestIdleCallback(() => createIcons(), { timeout: 1500 });
            return;
        }

        window.setTimeout(() => createIcons(), 650);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", scheduleCreateIcons, { once: true });
    } else {
        scheduleCreateIcons();
    }
})();
