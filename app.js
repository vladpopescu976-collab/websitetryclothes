(() => {
    const qs = (selector, scope = document) => scope.querySelector(selector);
    const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
    const siteVersion = "native-performance-2026-05-22";

    const state = {
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
    };

    document.addEventListener("DOMContentLoaded", () => {
        document.documentElement.dataset.tryclothesSite = siteVersion;
        createIcons();
        initWaitlist();

        if (state.reducedMotion) {
            document.documentElement.classList.add("motion-fallback");
            qs("#scroll-master")?.style.setProperty("--hero-scroll-height", "100vh");
            qs("#phone-drop-wrapper")?.classList.add("is-present");
            return;
        }

        initPremiumScroll();
        initReveals();
    });

    function createIcons() {
        window.TryClothesIcons?.createIcons();
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

    function setVars(element, vars) {
        Object.entries(vars).forEach(([key, value]) => element.style.setProperty(key, value));
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
        let ticking = false;

        const setInitial = () => {
            const isMobile = media.mobile.matches;
            const isTablet = media.tablet.matches;
            hero.style.setProperty("--hero-scroll-height", isMobile ? "560vh" : isTablet ? "730vh" : "940vh");
            handoffElements.forEach((element) => {
                element.style.opacity = "0";
                element.style.transform = `translate3d(0, ${isMobile ? 36 : 70}px, 0) scale(0.98)`;
                element.style.filter = isMobile ? "blur(0px)" : "blur(4px)";
                element.style.transition = "none";
            });
        };

        const refresh = () => {
            setInitial();
            metrics = {
                top: hero.offsetTop,
                range: Math.max(1, hero.offsetHeight - window.innerHeight)
            };
            apply();
        };

        const requestApply = () => {
            if (ticking) {
                return;
            }
            ticking = true;
            requestAnimationFrame(() => {
                ticking = false;
                apply();
            });
        };

        const apply = () => {
            const progress = clamp((window.scrollY - metrics.top) / metrics.range);
            const isMobile = media.mobile.matches;
            const introY = isMobile ? -84 : -84;
            const floatY = isMobile ? -124 : -122;
            const finalY = isMobile ? -146 : -142;
            const entry = smoothstep(0.04, 0.2, progress);
            const firstSpin = smoothstep(0.22, 0.5, progress);
            const secondSpin = smoothstep(0.55, 0.82, progress);
            const spinPulse = Math.max(pulse(0.22, 0.36, 0.5, progress), pulse(0.55, 0.68, 0.82, progress));
            const zoom = smoothstep(0.84, 0.94, progress);
            const fadeOut = smoothstep(0.91, 0.98, progress);
            const handoff = smoothstep(0.84, 0.93, progress);
            const midOpacity = 0.68 * pulse(0.31, 0.38, 0.5, progress);
            const finalOpacity = 0.72 * pulse(0.72, 0.8, 0.9, progress);
            const rotationY = progress < 0.52 ? lerp(0, 180, firstSpin) : lerp(180, 360, secondSpin);
            const floatBlend = Math.sin(spinPulse * Math.PI);
            const yBase = lerp(-window.innerHeight, introY, entry);
            const yFloat = lerp(introY, floatY, floatBlend);
            const y = lerp(entry < 1 ? yBase : yFloat, finalY, zoom);
            const scale = lerp(lerp(0.8, 1, entry) + spinPulse * 0.04, 2.18, zoom);
            const rotationZ = lerp(12, 0, entry) + (progress < 0.52 ? -5.5 : 5.5) * spinPulse * (progress > 0.22 ? 1 : 0);
            const rotationX = lerp(15, 0, entry) + (progress < 0.52 ? 7.5 : -7.5) * spinPulse * (progress > 0.22 ? 1 : 0);
            const phoneOpacity = clamp(entry - fadeOut);
            const flare = Math.max(pulse(0.235, 0.31, 0.4, progress), pulse(0.565, 0.64, 0.74, progress));
            const glassBloom = Math.max(pulse(0.24, 0.36, 0.5, progress), pulse(0.57, 0.7, 0.84, progress), zoom);
            const originalOpacity = 0.82 * (1 - smoothstep(0.39, 0.46, progress));
            const resultOpacity = smoothstep(0.46, 0.52, progress);
            const heroTextOut = smoothstep(0, 0.14, progress);

            phoneDrop.style.opacity = phoneOpacity.toFixed(3);
            phoneDrop.style.filter = isMobile ? "blur(0px)" : `blur(${(4 * (1 - entry) + 12 * fadeOut).toFixed(2)}px)`;
            phoneDrop.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) rotateZ(${rotationZ.toFixed(2)}deg) rotateX(${rotationX.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
            phone.style.transform = `rotateY(${rotationY.toFixed(2)}deg) rotateX(${(-4 * firstSpin * (1 - secondSpin)).toFixed(2)}deg)`;

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

            if (heroText) {
                heroText.style.opacity = (1 - heroTextOut).toFixed(3);
                heroText.style.filter = isMobile ? "blur(0px)" : `blur(${(10 * heroTextOut).toFixed(2)}px)`;
                heroText.style.transform = `translate(-50%, ${(-40 * heroTextOut).toFixed(2)}px) scale(${(1 - 0.04 * heroTextOut).toFixed(3)})`;
            }

            if (textMid) {
                textMid.style.opacity = midOpacity.toFixed(3);
                textMid.style.filter = isMobile ? "blur(0px)" : `blur(${(8 * (1 - midOpacity / 0.68)).toFixed(2)}px)`;
                textMid.style.transform = `translate(-50%, ${lerp(16, -30, midOpacity / 0.68 || 0).toFixed(2)}px)`;
            }

            if (textFinal) {
                textFinal.style.opacity = finalOpacity.toFixed(3);
                textFinal.style.filter = isMobile ? "blur(0px)" : `blur(${(8 * (1 - finalOpacity / 0.72)).toFixed(2)}px)`;
                textFinal.style.transform = `translate(-50%, ${lerp(18, -24, finalOpacity / 0.72 || 0).toFixed(2)}px)`;
            }

            if (transitionWash) {
                transitionWash.style.opacity = smoothstep(0.87, 0.94, progress).toFixed(3);
            }

            if (glareFront) {
                glareFront.style.opacity = (progress > 0.2 && progress < 0.54 ? 1 : 0.04).toFixed(3);
                glareFront.style.transform = `translateX(${lerp(-100, 100, firstSpin).toFixed(1)}%) rotate(25deg)`;
            }

            if (glareBack) {
                glareBack.style.opacity = (progress > 0.55 && progress < 0.84 ? 1 : 0.04).toFixed(3);
                glareBack.style.transform = `translateX(${lerp(-100, 100, secondSpin).toFixed(1)}%) rotate(25deg)`;
            }

            if (scanLine) {
                scanLine.style.opacity = (progress > 0.22 && progress < 0.86 ? 1 - zoom : 0.04).toFixed(3);
            }

            if (leftLight) {
                leftLight.style.opacity = (entry * 0.42 + spinPulse * 0.36).toFixed(3);
                leftLight.style.transform = `translate3d(${lerp(-100, progress < 0.52 ? 90 : -30, progress).toFixed(1)}px, ${lerp(50, progress < 0.52 ? -38 : 34, progress).toFixed(1)}px, 0) scale(${(0.8 + entry * 0.28).toFixed(3)})`;
            }

            if (rightLight) {
                rightLight.style.opacity = (entry * 0.38 + spinPulse * 0.42).toFixed(3);
                rightLight.style.transform = `translate3d(${lerp(100, progress < 0.52 ? -70 : 58, progress).toFixed(1)}px, ${lerp(-50, progress < 0.52 ? 26 : -42, progress).toFixed(1)}px, 0) scale(${(0.8 + entry * 0.32).toFixed(3)})`;
            }

            handoffElements.forEach((element, index) => {
                const elementProgress = clamp(handoff - index * 0.06);
                element.style.opacity = elementProgress.toFixed(3);
                element.style.transform = `translate3d(0, ${((1 - elementProgress) * (isMobile ? 36 : 70)).toFixed(2)}px, 0) scale(${(0.98 + elementProgress * 0.02).toFixed(3)})`;
                element.style.filter = isMobile ? "blur(0px)" : `blur(${((1 - elementProgress) * 4).toFixed(2)}px)`;
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
                element.style.transition = "opacity 900ms ease, transform 900ms cubic-bezier(0.16, 1, 0.3, 1), filter 900ms ease";
                element.style.opacity = "1";
                element.style.transform = "translate3d(0, 0, 0) scale(1)";
                element.style.filter = "blur(0px)";
                observer.unobserve(element);
            });
        }, { rootMargin: "0px 0px -14% 0px", threshold: 0.12 });

        elements.forEach((element) => {
            element.style.opacity = "0";
            element.style.transform = "translate3d(0, 70px, 0) scale(0.97)";
            element.style.filter = "blur(12px)";
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
                    status.textContent = "Bifează acordul de confidențialitate pentru a te înscrie.";
                }
                privacyConsent.focus();
                return;
            }

            if (status) {
                status.textContent = "Se trimite înscrierea...";
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
                    status.textContent = "Gata. Te-am adăugat pe listă.";
                }
                form.reset();
            } catch (error) {
                if (status) {
                    status.textContent = "Nu s-a trimis. Încearcă din nou în câteva secunde.";
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
