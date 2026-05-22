(() => {
    const qs = (selector, scope = document) => scope.querySelector(selector);
    const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
    const siteVersion = "hero-premium-spin-2026-05-21";

    const state = {
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
    };

    document.addEventListener("DOMContentLoaded", () => {
        document.documentElement.dataset.tryclothesSite = siteVersion;
        createIcons();
        initWaitlist();

        if (!window.gsap || !window.ScrollTrigger || state.reducedMotion) {
            document.documentElement.classList.add("motion-fallback");
            qs("#phone-drop-wrapper")?.classList.add("is-present");
            return;
        }

        gsap.registerPlugin(ScrollTrigger);
        initPremiumScroll();
        initReveals();
    });

    function createIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    function initPremiumScroll() {
        const phoneDrop = qs("#phone-drop-wrapper");
        const phone = qs("#phone-3d");
        const hero = qs("#scroll-master");
        const handoffElements = qsa("#experience .gs-reveal");

        if (!phoneDrop || !phone || !hero) {
            return;
        }

        const isMobile = window.matchMedia("(max-width: 640px)").matches;
        const isTablet = window.matchMedia("(min-width: 641px) and (max-width: 1024px)").matches;
        const timelineEnd = isMobile ? "+=460%" : isTablet ? "+=630%" : "+=840%";
        const scrubValue = isMobile ? 0.06 : isTablet ? 0.16 : 0.26;
        const blurIn = isMobile ? "blur(0px)" : "blur(4px)";
        const blurOut = isMobile ? "blur(0px)" : "blur(10px)";
        const finalBlur = isMobile ? "blur(0px)" : "blur(12px)";
        const mobileY = isMobile ? { intro: -84, float: -124, final: -146 } : { intro: -84, float: -122, final: -142 };

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: timelineEnd,
                pin: true,
                scrub: scrubValue,
                anticipatePin: 1,
                invalidateOnRefresh: true
            }
        });

        gsap.set(phoneDrop, {
            y: -window.innerHeight,
            opacity: 0,
            rotationZ: 12,
            rotationX: 15,
            scale: 0.8,
            filter: blurIn,
            "--original-screen-opacity": 0.82,
            "--result-screen-opacity": 0,
            "--aura-opacity": 0,
            "--aura-scale": 0.74,
            "--ring-opacity": 0,
            "--ring-rotation": "-24deg",
            "--edge-glow": 0,
            "--metal-flare-opacity": 0,
            "--metal-flare-x": "-145%",
            "--glass-bloom": 0
        });

        gsap.set(phone, { rotationY: 0, rotationX: 0 });
        gsap.set(".phone-back .screen-img, .phone-back .scan-line", { opacity: 1 });
        gsap.set("#glare-front, #glare-back", { opacity: 1, x: 0 });
        gsap.set(".cinematic-light-left", { opacity: 0, x: -100, y: 50, scale: 0.8 });
        gsap.set(".cinematic-light-right", { opacity: 0, x: 100, y: -50, scale: 0.8 });
        gsap.set(handoffElements, {
            y: isMobile ? 36 : 70,
            opacity: 0,
            scale: 0.98,
            filter: blurIn
        });

        tl.to("#hero-text", { opacity: 0, y: -40, scale: 0.96, filter: blurOut, duration: 0.65 }, 0)
            .to(phoneDrop, {
                y: mobileY.intro,
                opacity: 1,
                rotationZ: 0,
                rotationX: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 2.5,
                ease: "power3.out"
            }, 0.85)
            .to(phoneDrop, {
                "--aura-opacity": 0.74,
                "--aura-scale": 1,
                "--ring-opacity": 0.36,
                "--ring-rotation": "18deg",
                "--edge-glow": 0.62,
                duration: 2.6,
                ease: "power2.out"
            }, 1.05)
            .to(".cinematic-light-left", { opacity: 0.78, x: 0, y: 0, scale: 1.08, duration: 3, ease: "power2.out" }, 0)
            .to(".cinematic-light-right", { opacity: 0.72, x: 0, y: 0, scale: 1.12, duration: 3, ease: "power2.out" }, 0.5)
            .add(() => phoneDrop.classList.add("is-present"), 1)

            .to(phone, { rotationY: 180, rotationX: -4, duration: 4.65, ease: "none" }, 3)
            .to(phoneDrop, { y: mobileY.float, rotationZ: -5.5, rotationX: 7.5, scale: 1.035, duration: 2.25, ease: "none" }, 3)
            .to(phoneDrop, { "--ring-rotation": "208deg", "--ring-opacity": 0.72, "--edge-glow": 1, "--aura-scale": 1.16, "--glass-bloom": 1, duration: 2.85, ease: "none" }, 3)
            .to(phoneDrop, { "--metal-flare-opacity": 0.95, "--metal-flare-x": "140%", duration: 1.42, ease: "none" }, 3.12)
            .to(phoneDrop, { "--metal-flare-opacity": 0.12, "--glass-bloom": 0.25, duration: 1.05, ease: "none" }, 4.56)
            .to(".cinematic-light-left", { x: 90, y: -38, opacity: 0.9, duration: 3.2, ease: "none" }, 3)
            .to(".cinematic-light-right", { x: -70, y: 26, opacity: 0.84, duration: 3.2, ease: "none" }, 3)
            .to(phoneDrop, { y: mobileY.intro, rotationZ: 0, rotationX: 0, scale: 1, duration: 2.25, ease: "none" }, 5.35)
            .to("#glare-front", { x: "100%", duration: 3, ease: "none" }, 3)
            .to("#glare-front, .phone-back .scan-line, #glare-back", { opacity: 0.04, duration: 1.35, ease: "none" }, 3.2)
            .to(".phone-back .scan-line, #glare-back", { opacity: 1, duration: 0.9, ease: "none" }, 6.15)
            .to("#text-mid", { opacity: 0.68, y: -18, duration: 1.2, ease: "power2.out" }, 4.5)
            .to("#text-mid", { opacity: 0, y: -60, filter: blurOut, duration: 1.5, ease: "power2.in" }, 6.5)
            .to(phoneDrop, { "--original-screen-opacity": 0, duration: 0.5, ease: "none" }, 5.0)
            .set(phoneDrop, { "--result-screen-opacity": 1 }, 6)

            .set(phoneDrop, { "--metal-flare-x": "-145%" }, 7.85)
            .to(phone, { rotationY: 360, rotationX: 0, duration: 4.65, ease: "none" }, 7.85)
            .to(phoneDrop, { y: mobileY.float, rotationZ: 5.5, rotationX: -7.5, scale: 1.04, duration: 2.25, ease: "none" }, 7.85)
            .to(phoneDrop, { "--ring-rotation": "396deg", "--ring-opacity": 0.8, "--edge-glow": 1, "--aura-opacity": 0.96, "--aura-scale": 1.22, "--glass-bloom": 1, duration: 2.85, ease: "none" }, 7.85)
            .to(phoneDrop, { "--metal-flare-opacity": 1, "--metal-flare-x": "142%", duration: 1.48, ease: "none" }, 8.02)
            .to(phoneDrop, { "--metal-flare-opacity": 0.16, "--glass-bloom": 0.34, duration: 1.08, ease: "none" }, 9.52)
            .to(".cinematic-light-left", { x: -30, y: 34, opacity: 0.72, duration: 3.2, ease: "none" }, 8)
            .to(".cinematic-light-right", { x: 58, y: -42, opacity: 0.96, duration: 3.2, ease: "none" }, 8)
            .to(phoneDrop, { y: mobileY.intro, rotationZ: 0, rotationX: 0, scale: 1, duration: 2.25, ease: "none" }, 10.2)
            .to("#glare-back", { x: "100%", duration: 3, ease: "none" }, 8)
            .to(".phone-back .scan-line, #glare-back", { opacity: 0.04, duration: 1.35, ease: "none" }, 9.0)
            .to("#text-final", { opacity: 0.72, y: -18, duration: 1.05, ease: "power2.out" }, 10.35)

            .set(phoneDrop, { "--metal-flare-x": "-125%" }, 11.58)
            .to(phoneDrop, { scale: 1.58, y: mobileY.final, "--ring-opacity": 0.98, "--edge-glow": 1, "--aura-scale": 1.34, "--glass-bloom": 1, "--metal-flare-opacity": 0.9, "--metal-flare-x": "126%", duration: 0.62, ease: "power2.inOut" }, 11.52)
            .to("#text-final", { opacity: 0, y: -82, filter: blurOut, duration: 0.48, ease: "power2.in" }, 11.52)
            .to(handoffElements, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.62, stagger: 0.06, ease: "power2.out" }, 11.56)
            .to("#transition-wash", { opacity: 1, duration: 0.4, ease: "power2.inOut" }, 11.74)
            .to(phoneDrop, { opacity: 0, scale: 2.18, filter: finalBlur, "--metal-flare-opacity": 0, duration: 0.38, ease: "power3.in" }, 12.08)
            .to(".cinematic-light", { opacity: 0, duration: 0.28 }, 12.08);
    }

    function initReveals() {
        qsa(".gs-reveal").forEach((element) => {
            if (element.closest("#experience")) {
                return;
            }

            ScrollTrigger.create({
                trigger: element,
                start: "top 84%",
                once: true,
                onEnter: () => {
                    gsap.fromTo(
                        element,
                        { y: 70, opacity: 0, scale: 0.97, filter: "blur(12px)" },
                        { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.25, ease: "expo.out" }
                    );
                }
            });
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
