(() => {
    const qs = (selector, scope = document) => scope.querySelector(selector);
    const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
    const siteVersion = "footer-groups-2026-05-23";
    const languageStorageKey = "tryclothes:language";

    const state = {
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        chromium: /\b(Chrome|Chromium|CriOS|Edg)\b/i.test(navigator.userAgent)
    };

    const translations = {
        ro: {
            meta: {
                title: "TryClothes – AI Virtual Try-On App | Try Clothes Before You Buy",
                description: "Try clothes online with AI. Upload a photo, preview outfits instantly and see how clothes fit before buying. Reduce clothing returns with TryClothes."
            },
            nav: {
                aria: "Navigație principală",
                homeAria: "TryClothes home",
                clothes: "Haine",
                how: "Cum funcționează",
                signup: "Înscrie-te"
            },
            hero: {
                aria: "Prezentare TryClothes",
                title: "TryClothes: probează haine online.",
                subtitle: "TryClothes este cabina ta de probă virtuală pentru haine. Vezi cum îți vin înainte să cumperi.",
                scroll: "Dă scroll"
            },
            story: {
                midEyebrow: "Probă virtuală",
                midTitle: "Probă realistă, nu filtru.",
                midText: "Aplicația analizează haine, pliuri, lumină și forma corpului.",
                finalEyebrow: "Rezultat pregătit",
                finalTitle: "Probează înainte să cumperi.",
                finalText: "Ținute testate virtual, pregătite pentru garderoba ta."
            },
            experience: {
                eyebrow: "Probă haine virtuală",
                title: "Probă realistă, nu filtru.",
                text: "TryClothes păstrează textura, lumina și proporțiile ținutei, ca să poți proba haine online cu încrederea unei cabine reale.",
                resultLabel: "Rezultat outfit",
                fitLabel: "Profil fit"
            },
            steps: {
                aria: "Pașii principali TryClothes",
                eyebrow: "Cum funcționează",
                title: "Trei pași pentru o probă virtuală premium.",
                text: "Un flux gândit pentru shopping online fără ghicit: încarci, alegi, compari și păstrezi doar hainele care arată bine pe tine.",
                oneTitle: "Încarci o poză cu tine.",
                oneText: "Alegi o imagine clară sau un look salvat, iar TryClothes pregătește corpul și lumina pentru proba virtuală.",
                twoTitle: "Selectezi haina dorită.",
                twoText: "Poți testa haine din magazine online, screenshots sau articole vestimentare salvate în garderoba ta digitală.",
                threeTitle: "Compari rezultatul.",
                threeText: "Vezi rapid outfit-ul pe corp, compari variantele și alegi doar ținutele care merită comandate."
            },
            faq: {
                eyebrow: "Întrebări frecvente",
                title: "Tot ce trebuie să știi despre proba virtuală de haine."
            },
            cta: {
                eyebrow: "Acces privat",
                title: "Probează haine înaintea tuturor.",
                text: "Locurile sunt limitate. Intră pe lista și primești acces la TryClothes înainte de lansare."
            },
            form: {
                emailPlaceholder: "Adresa ta de email",
                subject: "Înscriere nouă TryClothes",
                button: "Vreau să probez",
                consent: "Sunt de acord să fiu contactat pe email pentru acces TryClothes și am citit <a href=\"./privacy/\">Politica de confidențialitate</a>.",
                consentError: "Bifează acordul de confidențialitate pentru a te înscrie.",
                sending: "Se trimite înscrierea...",
                success: "Gata. Te-am adăugat pe listă.",
                error: "Nu s-a trimis. Încearcă din nou în câteva secunde."
            },
            footer: {
                aria: "Pagini TryClothes",
                copy: "© 2026 TryClothes. Probă virtuală AI pentru haine, ținute și cumpărături online.",
                product: "Produs",
                resources: "Resurse",
                legal: "Legal",
                tryClothes: "Probează haine",
                virtualTryOn: "Probă virtuală",
                aiTryOn: "Probă AI",
                fittingRoom: "Cabină virtuală",
                how: "Cum funcționează",
                returns: "Reducerea retururilor",
                signup: "Înscrie-te",
                privacy: "Confidențialitate",
                terms: "Termeni",
                cookies: "Cookies",
                contact: "Contact"
            },
            language: {
                aria: "Alege limba site-ului",
                label: "Limbă"
            }
        },
        en: {
            meta: {
                title: "TryClothes – AI Virtual Try-On App | Try Clothes Before You Buy",
                description: "Try clothes online with AI. Upload a photo, preview outfits instantly and see how clothes fit before buying. Reduce clothing returns with TryClothes."
            },
            nav: {
                aria: "Main navigation",
                homeAria: "TryClothes home",
                clothes: "Clothes",
                how: "How it works",
                signup: "Join"
            },
            hero: {
                aria: "TryClothes presentation",
                title: "TryClothes: try clothes online.",
                subtitle: "TryClothes is your AI virtual fitting room for clothes. See how outfits look before you buy.",
                scroll: "Scroll"
            },
            story: {
                midEyebrow: "Virtual fitting",
                midTitle: "Realistic try-on, not a filter.",
                midText: "The app analyzes garments, folds, light and body shape.",
                finalEyebrow: "Try-on ready",
                finalTitle: "Try before you buy.",
                finalText: "Virtual outfits, ready for your wardrobe."
            },
            experience: {
                eyebrow: "Virtual clothes try-on",
                title: "Realistic try-on, not a filter.",
                text: "TryClothes preserves texture, light and outfit proportions so you can try clothes online with the confidence of a real fitting room.",
                resultLabel: "Outfit result",
                fitLabel: "Fit profile"
            },
            steps: {
                aria: "Main TryClothes steps",
                eyebrow: "How it works",
                title: "Three steps to a premium virtual try-on.",
                text: "A flow designed for online shopping without guessing: upload, choose, compare and keep only clothes that actually look good on you.",
                oneTitle: "Upload a photo of yourself.",
                oneText: "Choose a clear image or a saved look, and TryClothes prepares the body and lighting for virtual try-on.",
                twoTitle: "Select the clothing item.",
                twoText: "Test clothes from online stores, screenshots or garments saved in your digital wardrobe.",
                threeTitle: "Compare the result.",
                threeText: "Preview the outfit on your body, compare options quickly and choose only the looks worth ordering."
            },
            faq: {
                eyebrow: "Frequently asked questions",
                title: "Everything you need to know about virtual clothes try-on."
            },
            cta: {
                eyebrow: "Private access",
                title: "Try clothes before everyone else.",
                text: "Spots are limited. Join the list and receive access to TryClothes before launch."
            },
            form: {
                emailPlaceholder: "Your email address",
                subject: "New TryClothes signup",
                button: "I want to try",
                consent: "I agree to be contacted by email for TryClothes access and I have read the <a href=\"./privacy/\">Privacy Policy</a>.",
                consentError: "Accept the privacy consent to join the list.",
                sending: "Sending your signup...",
                success: "Done. You are on the list.",
                error: "It did not send. Try again in a few seconds."
            },
            footer: {
                aria: "TryClothes pages",
                copy: "© 2026 TryClothes. AI virtual try-on for clothes, outfits and online shopping.",
                product: "Product",
                resources: "Resources",
                legal: "Legal",
                tryClothes: "Try clothes",
                virtualTryOn: "Virtual try-on",
                aiTryOn: "AI try-on",
                fittingRoom: "Virtual fitting room",
                how: "How it works",
                returns: "Reduce returns",
                signup: "Join",
                privacy: "Privacy",
                terms: "Terms",
                cookies: "Cookies",
                contact: "Contact"
            },
            language: {
                aria: "Choose website language",
                label: "Language"
            }
        }
    };

    document.addEventListener("DOMContentLoaded", () => {
        document.documentElement.dataset.tryclothesSite = siteVersion;
        document.documentElement.classList.toggle("is-chromium", state.chromium);
        initLanguageSwitcher();
        initNavigationScroll();
        initDeferredImages();
        initWaitlist();

        if (state.reducedMotion) {
            document.documentElement.classList.add("motion-fallback");
            qs("#scroll-master")?.style.setProperty("--hero-scroll-height", "100vh");
            qs("#phone-drop-wrapper")?.classList.add("is-present");
            return;
        }

        scheduleMotionSetup();
    });

    function getNested(source, path) {
        return path.split(".").reduce((value, key) => value && value[key], source);
    }

    function getStoredLanguage() {
        try {
            const stored = window.localStorage.getItem(languageStorageKey);
            return stored === "en" || stored === "ro" ? stored : "ro";
        } catch (error) {
            return "ro";
        }
    }

    function currentLanguage() {
        const lang = document.documentElement.dataset.siteLanguage;
        return lang === "en" || lang === "ro" ? lang : "ro";
    }

    function translate(path, lang = currentLanguage()) {
        return getNested(translations[lang] || translations.ro, path) ?? getNested(translations.ro, path) ?? "";
    }

    function applyLanguage(lang) {
        const activeLang = lang === "en" ? "en" : "ro";
        const dictionary = translations[activeLang];

        document.documentElement.lang = activeLang;
        document.documentElement.dataset.siteLanguage = activeLang;
        document.title = dictionary.meta.title;

        const description = qs("meta[name='description']");
        const ogLocale = qs("meta[property='og:locale']");
        if (description) {
            description.setAttribute("content", dictionary.meta.description);
        }
        if (ogLocale) {
            ogLocale.setAttribute("content", activeLang === "en" ? "en_US" : "ro_RO");
        }

        qsa("[data-i18n]").forEach((element) => {
            element.textContent = translate(element.dataset.i18n, activeLang);
        });
        qsa("[data-i18n-html]").forEach((element) => {
            element.innerHTML = translate(element.dataset.i18nHtml, activeLang);
        });
        qsa("[data-i18n-placeholder]").forEach((element) => {
            element.setAttribute("placeholder", translate(element.dataset.i18nPlaceholder, activeLang));
        });
        qsa("[data-i18n-aria-label]").forEach((element) => {
            element.setAttribute("aria-label", translate(element.dataset.i18nAriaLabel, activeLang));
        });
        qsa("[data-i18n-value]").forEach((element) => {
            element.value = translate(element.dataset.i18nValue, activeLang);
        });

        qsa(".faq-language-block").forEach((block) => {
            const blockLang = block.getAttribute("lang") === "en" ? "en" : "ro";
            const isActive = blockLang === activeLang;
            block.hidden = !isActive;
            block.setAttribute("aria-hidden", String(!isActive));
        });

        qsa("[data-language-option]").forEach((button) => {
            const isActive = button.dataset.languageOption === activeLang;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        try {
            window.localStorage.setItem(languageStorageKey, activeLang);
        } catch (error) {
            // Language preference is a convenience only.
        }
    }

    function initLanguageSwitcher() {
        applyLanguage(getStoredLanguage());

        qsa("[data-language-option]").forEach((button) => {
            button.addEventListener("click", () => {
                applyLanguage(button.dataset.languageOption);
            });
        });
    }

    function initNavigationScroll() {
        let activeFrame = 0;
        const links = qsa(".site-nav a[href^='#'], .brand-lockup-footer[href^='#']");

        const easeOutQuart = (value) => 1 - Math.pow(1 - value, 4);

        const runScroll = (targetY) => {
            window.cancelAnimationFrame(activeFrame);
            const startY = window.scrollY;
            const distance = targetY - startY;
            const duration = Math.min(300, Math.max(110, Math.abs(distance) * 0.026));
            const startTime = performance.now();
            document.documentElement.classList.add("is-programmatic-scroll");

            const step = (now) => {
                const progress = clamp((now - startTime) / duration);
                window.scrollTo(0, Math.round(startY + distance * easeOutQuart(progress)));

                if (progress < 1) {
                    activeFrame = window.requestAnimationFrame(step);
                    return;
                }

                window.setTimeout(() => {
                    document.documentElement.classList.remove("is-programmatic-scroll");
                }, 24);
            };

            activeFrame = window.requestAnimationFrame(step);
        };

        links.forEach((link) => {
            link.addEventListener("click", (event) => {
                const href = link.getAttribute("href");
                if (!href || href === "#") {
                    return;
                }

                const target = qs(href);
                if (!target) {
                    return;
                }

                event.preventDefault();
                const targetY = Math.max(0, target.getBoundingClientRect().top + window.scrollY);
                runScroll(targetY);

                if (window.history && window.history.pushState) {
                    window.history.pushState(null, "", href);
                }
            });
        });
    }

    function scheduleMotionSetup() {
        let started = false;
        const events = ["scroll", "wheel", "touchstart", "pointerdown", "keydown"];
        document.documentElement.dataset.motionSetup = "scheduled";

        const cleanup = () => {
            events.forEach((eventName) => window.removeEventListener(eventName, start));
        };

        const start = () => {
            if (started) {
                return;
            }
            started = true;
            cleanup();
            document.documentElement.dataset.motionSetup = "started";
            window.TryClothesSite.motionSetupStarted = true;
            try {
                initPremiumScroll();
                initReveals();
                document.documentElement.dataset.motionSetup = "ready";
                window.TryClothesSite.motionSetupReady = true;
            } catch (error) {
                document.documentElement.dataset.motionSetup = "error";
                window.TryClothesSite.motionSetupError = error?.message || "Motion setup failed";
            }
        };

        events.forEach((eventName) => {
            window.addEventListener(eventName, start, { once: true, passive: true });
        });

        const idleStart = () => {
            if ("requestIdleCallback" in window) {
                window.requestIdleCallback(start, { timeout: 160 });
                return;
            }
            window.setTimeout(start, 80);
        };

        window.setTimeout(idleStart, 12);
        window.addEventListener("load", () => window.setTimeout(idleStart, 20), { once: true });
        window.setTimeout(start, 900);
    }

    function initDeferredImages() {
        const images = qsa("img[data-defer-src]");

        if (!images.length) {
            return;
        }

        const heroImages = images.filter((image) => image.closest("#scroll-master"));
        let loadedAll = false;
        let loadedHero = false;

        const loadImage = (image) => {
            if (!image.dataset.deferSrc) {
                return;
            }
            image.src = image.dataset.deferSrc;
            image.removeAttribute("data-defer-src");
            if (image.decode) {
                image.decode().catch(() => {});
            }
        };

        const loadHeroImages = () => {
            if (loadedHero) {
                return;
            }
            loadedHero = true;
            heroImages.forEach(loadImage);
        };

        const loadImages = () => {
            if (loadedAll) {
                return;
            }
            loadedAll = true;
            loadHeroImages();
            images.forEach(loadImage);
        };

        const idleLoad = (callback, timeout = 900) => {
            if ("requestIdleCallback" in window) {
                window.requestIdleCallback(callback, { timeout });
                return;
            }
            window.setTimeout(callback, Math.min(timeout, 520));
        };

        window.addEventListener("scroll", loadImages, { once: true, passive: true });
        window.addEventListener("pointerdown", loadImages, { once: true, passive: true });
        idleLoad(loadHeroImages, 260);
        window.addEventListener("load", () => {
            idleLoad(loadHeroImages, 520);
            window.setTimeout(() => idleLoad(loadImages, 1200), 900);
        }, { once: true });
    }

    function clamp(value, min = 0, max = 1) {
        return Math.min(max, Math.max(min, value));
    }

    function lerp(start, end, amount) {
        return start + (end - start) * amount;
    }

    function smoothstep(start, end, value) {
        const x = clamp((value - start) / (end - start));
        return x * x * (3 - 2 * x);
    }

    function pulse(start, peak, end, value) {
        if (value <= start || value >= end) {
            return 0;
        }
        return value < peak ? smoothstep(start, peak, value) : 1 - smoothstep(peak, end, value);
    }

    const styleCache = new WeakMap();

    function setStyle(element, property, value) {
        let cache = styleCache.get(element);
        if (!cache) {
            cache = {};
            styleCache.set(element, cache);
        }
        if (cache[property] === value) {
            return;
        }
        cache[property] = value;
        if (property.startsWith("--")) {
            element.style.setProperty(property, value);
            return;
        }
        element.style[property] = value;
    }

    function setVars(element, vars) {
        Object.entries(vars).forEach(([key, value]) => setStyle(element, key, value));
    }

    function initPremiumScroll() {
        const hero = qs("#scroll-master");
        const phoneDrop = qs("#phone-drop-wrapper");
        const phone = qs("#phone-3d");
        const heroText = qs("#hero-text");
        const textMid = qs("#text-mid");
        const textFinal = qs("#text-final");
        const transitionWash = qs("#transition-wash");
        const glareFront = qs("#glare-front");
        const glareBack = qs("#glare-back");
        const scanLine = qs(".phone-back .scan-line");
        const leftLight = qs(".cinematic-light-left");
        const rightLight = qs(".cinematic-light-right");
        const handoffElements = qsa("#experience .gs-reveal");

        if (!hero || !phoneDrop || !phone) {
            return;
        }

        const media = {
            mobile: window.matchMedia("(max-width: 640px)"),
            tablet: window.matchMedia("(min-width: 641px) and (max-width: 1024px)")
        };

        let metrics = { top: 0, range: 1 };
        let targetProgress = 0;
        let renderedProgress = 0;
        let ticking = false;

        const setInitial = () => {
            const isMobile = media.mobile.matches;
            const isTablet = media.tablet.matches;
            setStyle(hero, "--hero-scroll-height", isMobile ? "520vh" : isTablet ? "650vh" : "820vh");
            handoffElements.forEach((element) => {
                setStyle(element, "opacity", "0");
                setStyle(element, "transform", `translate3d(0, ${isMobile ? 24 : 42}px, 0) scale(0.99)`);
                setStyle(element, "filter", "none");
                setStyle(element, "transition", "none");
            });
        };

        const refresh = () => {
            setInitial();
            metrics = {
                top: hero.offsetTop,
                range: Math.max(1, hero.offsetHeight - window.innerHeight)
            };
            targetProgress = clamp((window.scrollY - metrics.top) / metrics.range);
            renderedProgress = targetProgress;
            apply(renderedProgress);
        };

        const updateTarget = () => {
            targetProgress = clamp((window.scrollY - metrics.top) / metrics.range);
        };

        const renderFrame = () => {
            const isMobile = media.mobile.matches;
            const smoothing = state.chromium ? 0.2 : isMobile ? 0.22 : 1;
            if (smoothing >= 1) {
                renderedProgress = targetProgress;
            } else {
                renderedProgress += (targetProgress - renderedProgress) * smoothing;
                if (Math.abs(targetProgress - renderedProgress) < 0.0007) {
                    renderedProgress = targetProgress;
                }
            }

            apply(renderedProgress);

            if (renderedProgress !== targetProgress) {
                requestAnimationFrame(renderFrame);
                return;
            }

            ticking = false;
        };

        const requestApply = () => {
            updateTarget();
            if (ticking) {
                return;
            }
            ticking = true;
            requestAnimationFrame(renderFrame);
        };

        const apply = (progress) => {
            const isMobile = media.mobile.matches;
            const introY = isMobile ? -84 : -84;
            const floatY = isMobile ? -124 : -122;
            const finalY = isMobile ? -146 : -142;
            const entry = smoothstep(0.025, 0.16, progress);
            const firstSpin = smoothstep(0.2, 0.48, progress);
            const secondSpin = smoothstep(0.54, 0.8, progress);
            const spinPulse = Math.max(pulse(0.2, 0.34, 0.48, progress), pulse(0.54, 0.67, 0.8, progress));
            const zoom = smoothstep(0.78, 0.88, progress);
            const fadeOut = smoothstep(0.86, 0.94, progress);
            const handoff = smoothstep(0.76, 0.86, progress);
            const midOpacity = 0.68 * pulse(0.3, 0.38, 0.48, progress);
            const finalOpacity = 0.72 * pulse(0.68, 0.76, 0.86, progress);
            const rotationY = progress < 0.52 ? lerp(0, 180, firstSpin) : lerp(180, 360, secondSpin);
            const floatBlend = Math.sin(spinPulse * Math.PI);
            const yBase = lerp(-window.innerHeight, introY, entry);
            const yFloat = lerp(introY, floatY, floatBlend);
            const y = lerp(entry < 1 ? yBase : yFloat, finalY, zoom);
            const scale = lerp(lerp(0.8, 1, entry) + spinPulse * 0.04, 2.18, zoom);
            const rotationZ = lerp(12, 0, entry) + (progress < 0.52 ? -5.5 : 5.5) * spinPulse * (progress > 0.22 ? 1 : 0);
            const rotationX = lerp(15, 0, entry) + (progress < 0.52 ? 7.5 : -7.5) * spinPulse * (progress > 0.22 ? 1 : 0);
            const phoneOpacity = clamp(entry - fadeOut);
            const originalOpacity = 0.82 * (1 - smoothstep(0.46, 0.52, progress));
            const resultOpacity = smoothstep(0.52, 0.58, progress);
            const heroTextOut = smoothstep(0, 0.15, progress);
            const animateAtmosphere = !state.chromium && !isMobile && !document.documentElement.classList.contains("is-programmatic-scroll");

            setStyle(phoneDrop, "opacity", phoneOpacity.toFixed(3));
            setStyle(phoneDrop, "transform", `translate3d(0, ${y.toFixed(2)}px, 0) rotateZ(${rotationZ.toFixed(2)}deg) rotateX(${rotationX.toFixed(2)}deg) scale(${scale.toFixed(4)})`);
            setStyle(phone, "transform", `rotateY(${rotationY.toFixed(2)}deg) rotateX(${(-4 * firstSpin * (1 - secondSpin)).toFixed(2)}deg)`);

            if (state.chromium || isMobile) {
                setVars(phoneDrop, {
                    "--original-screen-opacity": originalOpacity.toFixed(3),
                    "--result-screen-opacity": resultOpacity.toFixed(3),
                    "--edge-glow": (entry * 0.2 + spinPulse * 0.28 + zoom * 0.1).toFixed(3)
                });
            } else {
                const flare = Math.max(pulse(0.235, 0.31, 0.4, progress), pulse(0.565, 0.64, 0.74, progress));
                const glassBloom = Math.max(pulse(0.24, 0.36, 0.5, progress), pulse(0.57, 0.7, 0.84, progress), zoom);
                setVars(phoneDrop, {
                    "--original-screen-opacity": originalOpacity.toFixed(3),
                    "--result-screen-opacity": resultOpacity.toFixed(3),
                    "--aura-opacity": (entry * 0.64 + spinPulse * 0.24 + zoom * 0.12).toFixed(3),
                    "--aura-scale": (0.74 + entry * 0.28 + spinPulse * 0.18 + zoom * 0.14).toFixed(3),
                    "--ring-opacity": (entry * 0.22 + spinPulse * 0.48 + zoom * 0.22).toFixed(3),
                    "--ring-rotation": `${lerp(-24, 410, progress).toFixed(2)}deg`,
                    "--edge-glow": (entry * 0.34 + spinPulse * 0.64 + zoom * 0.22).toFixed(3),
                    "--metal-flare-opacity": (flare * 0.95 + zoom * 0.16).toFixed(3),
                    "--metal-flare-x": `${lerp(-145, 142, Math.max(firstSpin, secondSpin, zoom)).toFixed(1)}%`,
                    "--glass-bloom": glassBloom.toFixed(3)
                });
            }

            if (heroText) {
                setStyle(heroText, "opacity", (1 - heroTextOut).toFixed(3));
                setStyle(heroText, "transform", `translate(-50%, ${(-40 * heroTextOut).toFixed(2)}px) scale(${(1 - 0.04 * heroTextOut).toFixed(3)})`);
            }

            if (textMid) {
                setStyle(textMid, "opacity", midOpacity.toFixed(3));
                setStyle(textMid, "transform", `translate(-50%, ${lerp(16, -30, midOpacity / 0.68 || 0).toFixed(2)}px)`);
            }

            if (textFinal) {
                setStyle(textFinal, "opacity", finalOpacity.toFixed(3));
                setStyle(textFinal, "transform", `translate(-50%, ${lerp(18, -24, finalOpacity / 0.72 || 0).toFixed(2)}px)`);
            }

            if (transitionWash) {
                setStyle(transitionWash, "opacity", smoothstep(0.87, 0.94, progress).toFixed(3));
            }

            if (glareFront && animateAtmosphere) {
                setStyle(glareFront, "opacity", (progress > 0.2 && progress < 0.54 ? 1 : 0.04).toFixed(3));
                setStyle(glareFront, "transform", `translateX(${lerp(-100, 100, firstSpin).toFixed(1)}%) rotate(25deg)`);
            }

            if (glareBack && animateAtmosphere) {
                setStyle(glareBack, "opacity", (progress > 0.55 && progress < 0.84 ? 1 : 0.04).toFixed(3));
                setStyle(glareBack, "transform", `translateX(${lerp(-100, 100, secondSpin).toFixed(1)}%) rotate(25deg)`);
            }

            if (scanLine && !state.chromium && !isMobile) {
                setStyle(scanLine, "opacity", (progress > 0.22 && progress < 0.86 ? 1 - zoom : 0.04).toFixed(3));
            }

            if (leftLight && animateAtmosphere) {
                setStyle(leftLight, "opacity", (entry * 0.42 + spinPulse * 0.36).toFixed(3));
                setStyle(leftLight, "transform", `translate3d(${lerp(-100, progress < 0.52 ? 90 : -30, progress).toFixed(1)}px, ${lerp(50, progress < 0.52 ? -38 : 34, progress).toFixed(1)}px, 0) scale(${(0.8 + entry * 0.28).toFixed(3)})`);
            }

            if (rightLight && animateAtmosphere) {
                setStyle(rightLight, "opacity", (entry * 0.38 + spinPulse * 0.42).toFixed(3));
                setStyle(rightLight, "transform", `translate3d(${lerp(100, progress < 0.52 ? -70 : 58, progress).toFixed(1)}px, ${lerp(-50, progress < 0.52 ? 26 : -42, progress).toFixed(1)}px, 0) scale(${(0.8 + entry * 0.32).toFixed(3)})`);
            }

            handoffElements.forEach((element, index) => {
                const elementProgress = clamp(handoff - index * 0.06);
                setStyle(element, "opacity", elementProgress.toFixed(3));
                setStyle(element, "transform", `translate3d(0, ${((1 - elementProgress) * (isMobile ? 24 : 42)).toFixed(2)}px, 0) scale(${(0.99 + elementProgress * 0.01).toFixed(3)})`);
            });
        };

        setInitial();
        refresh();
        window.addEventListener("scroll", requestApply, { passive: true });
        window.addEventListener("resize", refresh, { passive: true });
        phoneDrop.classList.add("is-present");
    }

    function initReveals() {
        const elements = qsa(".gs-reveal").filter((element) => !element.closest("#experience"));

        if (!("IntersectionObserver" in window)) {
            elements.forEach((element) => {
                element.style.opacity = "1";
                element.style.transform = "none";
                element.style.filter = "none";
            });
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }
                const element = entry.target;
                element.style.transition = "opacity 360ms ease, transform 360ms cubic-bezier(0.16, 1, 0.3, 1)";
                element.style.opacity = "1";
                element.style.transform = "translate3d(0, 0, 0) scale(1)";
                element.style.filter = "none";
                observer.unobserve(element);
            });
        }, { rootMargin: "0px 0px -2% 0px", threshold: 0.04 });

        elements.forEach((element) => {
            element.style.opacity = "0";
            element.style.transform = "translate3d(0, 26px, 0) scale(0.995)";
            element.style.filter = "none";
            observer.observe(element);
        });
    }

    function initWaitlist() {
        const form = qs("[data-waitlist-form]");

        if (!form) {
            return;
        }

        const status = qs("[data-waitlist-status]", form);
        const button = qs("button[type='submit']", form);
        const privacyConsent = qs("input[name='privacy_consent']", form);

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const email = formData.get("email");
            const botcheck = formData.get("botcheck");

            if (!email || botcheck) {
                return;
            }

            if (privacyConsent && !privacyConsent.checked) {
                if (status) {
                    status.textContent = translate("form.consentError");
                }
                privacyConsent.focus();
                return;
            }

            if (status) {
                status.textContent = translate("form.sending");
            }

            if (button) {
                button.disabled = true;
            }

            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Waitlist submit failed");
                }

                const result = await response.json().catch(() => null);

                if (result && result.success === false) {
                    throw new Error("Waitlist submit rejected");
                }

                if (status) {
                    status.textContent = translate("form.success");
                }
                form.reset();
            } catch (error) {
                if (status) {
                    status.textContent = translate("form.error");
                }
            } finally {
                if (button) {
                    button.disabled = false;
                }
            }
        });
    }

    window.TryClothesSite = {
        version: siteVersion
    };
})();
