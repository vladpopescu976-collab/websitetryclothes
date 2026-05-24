(() => {
    const storageKey = "tryclothes:cookie-consent";
    const consentVersion = "2026-05-25";

    const copy = {
        ro: {
            title: "Cookies",
            text: "Cookies necesare pentru funcționare. Preferințele sunt opționale; analytics și marketing sunt oprite.",
            accept: "Accept",
            necessary: "Necesare",
            settings: "Setări",
            save: "Salvează",
            close: "Închide",
            policy: "Detalii",
            requiredTitle: "Necesare",
            requiredText: "Securitate, afișare, formular și memorarea acestei alegeri.",
            preferencesTitle: "Preferințe site",
            preferencesText: "Limbă, preferințe de interfață și setări cerute de tine.",
            analyticsTitle: "Analytics și marketing",
            analyticsText: "Momentan nu sunt active pe site. Vor rămâne oprite fără acordul tău.",
            soon: "Neactiv",
            accepted: "Preferințele au fost salvate."
        },
        en: {
            title: "Cookies",
            text: "Necessary cookies keep the site working. Preferences are optional; analytics and marketing are off.",
            accept: "Accept",
            necessary: "Necessary",
            settings: "Settings",
            save: "Save",
            close: "Close",
            policy: "Details",
            requiredTitle: "Necessary",
            requiredText: "Security, page delivery, forms and remembering this choice.",
            preferencesTitle: "Site preferences",
            preferencesText: "Language, interface preferences and settings you request.",
            analyticsTitle: "Analytics and marketing",
            analyticsText: "Not active on this site right now. They stay off without your consent.",
            soon: "Inactive",
            accepted: "Your preferences were saved."
        }
    };

    const getLanguage = () => document.documentElement.lang?.toLowerCase().startsWith("en") ? "en" : "ro";

    function readConsent() {
        try {
            const value = JSON.parse(window.localStorage.getItem(storageKey) || "null");
            return value && value.version === consentVersion ? value : null;
        } catch (error) {
            return null;
        }
    }

    function writeConsent(preferences) {
        const value = {
            version: consentVersion,
            savedAt: new Date().toISOString(),
            necessary: true,
            preferences: Boolean(preferences),
            analytics: false,
            marketing: false
        };

        try {
            window.localStorage.setItem(storageKey, JSON.stringify(value));
        } catch (error) {
            // The consent UI can still close if storage is unavailable.
        }

        document.documentElement.dataset.cookieConsent = preferences ? "all" : "necessary";
        document.dispatchEvent(new CustomEvent("tryclothes:cookie-consent", { detail: value }));
        return value;
    }

    function cookiesUrl() {
        const path = window.location.pathname;
        if (path === "/" || path === "/index.html") {
            return "./cookies/";
        }
        return "../cookies/";
    }

    function createOption({ title, text, checked, disabled, badge, inputName }) {
        const row = document.createElement("label");
        row.className = "cookie-option";

        const input = document.createElement("input");
        input.type = "checkbox";
        input.name = inputName;
        input.checked = checked;
        input.disabled = disabled;

        const content = document.createElement("span");
        content.className = "cookie-option-copy";

        const heading = document.createElement("span");
        heading.className = "cookie-option-title";
        heading.textContent = title;

        if (badge) {
            const badgeElement = document.createElement("span");
            badgeElement.className = "cookie-option-badge";
            badgeElement.textContent = badge;
            heading.appendChild(badgeElement);
        }

        const description = document.createElement("span");
        description.className = "cookie-option-text";
        description.textContent = text;

        content.append(heading, description);
        row.append(input, content);
        return row;
    }

    function createBanner() {
        const lang = getLanguage();
        const t = copy[lang];

        const banner = document.createElement("section");
        banner.className = "cookie-consent";
        banner.setAttribute("role", "dialog");
        banner.setAttribute("aria-modal", "false");
        banner.setAttribute("aria-labelledby", "cookie-consent-title");

        const main = document.createElement("div");
        main.className = "cookie-consent-main";

        const eyebrow = document.createElement("p");
        eyebrow.className = "cookie-eyebrow";
        eyebrow.textContent = "TryClothes";

        const title = document.createElement("h2");
        title.id = "cookie-consent-title";
        title.textContent = t.title;

        const text = document.createElement("p");
        text.className = "cookie-consent-text";
        text.textContent = t.text;

        const policy = document.createElement("a");
        policy.className = "cookie-policy-link";
        policy.href = cookiesUrl();
        policy.textContent = t.policy;

        main.append(eyebrow, title, text, policy);

        const settings = document.createElement("div");
        settings.className = "cookie-settings";
        settings.hidden = true;

        const requiredOption = createOption({
            title: t.requiredTitle,
            text: t.requiredText,
            checked: true,
            disabled: true,
            inputName: "necessary"
        });

        const preferencesOption = createOption({
            title: t.preferencesTitle,
            text: t.preferencesText,
            checked: true,
            disabled: false,
            inputName: "preferences"
        });

        const analyticsOption = createOption({
            title: t.analyticsTitle,
            text: t.analyticsText,
            checked: false,
            disabled: true,
            badge: t.soon,
            inputName: "analytics"
        });

        settings.append(requiredOption, preferencesOption, analyticsOption);

        const status = document.createElement("p");
        status.className = "cookie-status";
        status.setAttribute("role", "status");
        status.hidden = true;

        const actions = document.createElement("div");
        actions.className = "cookie-actions";

        const accept = document.createElement("button");
        accept.className = "button button-primary cookie-button";
        accept.type = "button";
        accept.textContent = t.accept;

        const necessary = document.createElement("button");
        necessary.className = "button button-secondary cookie-button";
        necessary.type = "button";
        necessary.textContent = t.necessary;

        const toggleSettings = document.createElement("button");
        toggleSettings.className = "button button-secondary cookie-button";
        toggleSettings.type = "button";
        toggleSettings.textContent = t.settings;
        toggleSettings.setAttribute("aria-expanded", "false");

        actions.append(accept, necessary, toggleSettings);
        banner.append(main, settings, status, actions);

        const close = (preferences) => {
            writeConsent(preferences);
            status.textContent = t.accepted;
            status.hidden = false;
            banner.classList.add("is-hiding");
            window.setTimeout(() => banner.remove(), 180);
        };

        accept.addEventListener("click", () => close(true));
        necessary.addEventListener("click", () => close(false));
        toggleSettings.addEventListener("click", () => {
            if (settings.hidden) {
                settings.hidden = false;
                toggleSettings.setAttribute("aria-expanded", "true");
                toggleSettings.textContent = t.save;
                return;
            }

            const preferencesInput = settings.querySelector("input[name='preferences']");
            close(Boolean(preferencesInput?.checked));
        });

        document.body.appendChild(banner);
    }

    function openSettings() {
        document.querySelector(".cookie-consent")?.remove();
        createBanner();
    }

    document.addEventListener("DOMContentLoaded", () => {
        const stored = readConsent();
        if (stored) {
            document.documentElement.dataset.cookieConsent = stored.preferences ? "all" : "necessary";
        } else {
            createBanner();
        }

        document.addEventListener("click", (event) => {
            const opener = event.target.closest("[data-cookie-open]");
            if (!opener) {
                return;
            }

            event.preventDefault();
            openSettings();
        });
    });

    window.TryClothesCookieConsent = {
        get: readConsent,
        open: openSettings,
        reset() {
            try {
                window.localStorage.removeItem(storageKey);
            } catch (error) {
                // Ignore unavailable storage.
            }
            openSettings();
        }
    };
})();
