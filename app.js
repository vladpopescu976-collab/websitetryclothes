(() => {
    const qs = (selector, scope = document) => scope.querySelector(selector);
    const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
    const siteVersion = "smooth-scroll-2026-05-20";

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

        if (!phoneDrop || !phone || !hero) {
            return;
        }

        const isMobile = window.matchMedia("(max-width: 640px)").matches;
        const isTablet = window.matchMedia("(min-width: 641px) and (max-width: 1024px)").matches;
        const timelineEnd = isMobile ? "+=950%" : isTablet ? "+=1250%" : "+=1650%";
        const scrubValue = isMobile ? 0.35 : isTablet ? 0.7 : 1.15;
        const blurIn = isMobile ? "blur(0px)" : "blur(4px)";
        const blurOut = isMobile ? "blur(0px)" : "blur(10px)";
        const finalBlur = isMobile ? "blur(8px)" : "blur(20px)";
        const mobileY = isMobile ? { intro: -58, float: -92, final: -112 } : { intro: -88, float: -128, final: -150 };

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
            "--edge-glow": 0
        });

        gsap.set(phone, { rotationY: 0, rotationX: 0 });
        gsap.set(".phone-back .screen-img, .phone-back .scan-line", { opacity: 1 });
        gsap.set("#glare-front, #glare-back", { opacity: 1, x: 0 });
        gsap.set(".cinematic-light-left", { opacity: 0, x: -100, y: 50, scale: 0.8 });
        gsap.set(".cinematic-light-right", { opacity: 0, x: 100, y: -50, scale: 0.8 });

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

            .to(phone, { rotationY: 180, duration: 5, ease: "none" }, 3)
            .to(phoneDrop, { y: mobileY.float, rotationZ: -4, rotationX: 6, duration: 2.5, ease: "none" }, 3)
            .to(phoneDrop, { "--ring-rotation": "190deg", "--ring-opacity": 0.54, "--edge-glow": 0.92, "--aura-scale": 1.08, duration: 3.2, ease: "none" }, 3)
            .to(".cinematic-light-left", { x: 90, y: -38, opacity: 0.9, duration: 3.2, ease: "none" }, 3)
            .to(".cinematic-light-right", { x: -70, y: 26, opacity: 0.84, duration: 3.2, ease: "none" }, 3)
            .to(phoneDrop, { y: mobileY.intro, rotationZ: 0, rotationX: 0, duration: 2.5, ease: "none" }, 5.5)
            .to("#glare-front", { x: "100%", duration: 3, ease: "none" }, 3)
            .to("#glare-front, .phone-back .scan-line, #glare-back", { opacity: 0.04, duration: 1.35, ease: "none" }, 3.2)
            .to(".phone-back .scan-line, #glare-back", { opacity: 1, duration: 0.9, ease: "none" }, 6.15)
            .to("#text-mid", { opacity: 0.68, y: -18, duration: 1.2, ease: "power2.out" }, 4.5)
            .to("#text-mid", { opacity: 0, y: -60, filter: blurOut, duration: 1.5, ease: "power2.in" }, 6.5)
            .to(phoneDrop, { "--original-screen-opacity": 0, duration: 0.5, ease: "none" }, 5.0)
            .set(phoneDrop, { "--result-screen-opacity": 1 }, 6)

            .to(phone, { rotationY: 360, duration: 5, ease: "none" }, 8)
            .to(phoneDrop, { y: mobileY.float, rotationZ: 4, rotationX: -6, duration: 2.5, ease: "none" }, 8)
            .to(phoneDrop, { "--ring-rotation": "374deg", "--ring-opacity": 0.66, "--edge-glow": 1, "--aura-opacity": 0.9, "--aura-scale": 1.16, duration: 3.2, ease: "none" }, 8)
            .to(".cinematic-light-left", { x: -30, y: 34, opacity: 0.72, duration: 3.2, ease: "none" }, 8)
            .to(".cinematic-light-right", { x: 58, y: -42, opacity: 0.96, duration: 3.2, ease: "none" }, 8)
            .to(phoneDrop, { y: mobileY.intro, rotationZ: 0, rotationX: 0, duration: 2.5, ease: "none" }, 10.5)
            .to("#glare-back", { x: "100%", duration: 3, ease: "none" }, 8)
            .to(".phone-back .scan-line, #glare-back", { opacity: 0.04, duration: 1.35, ease: "none" }, 9.0)
            .to("#text-final", { opacity: 0.68, y: -18, duration: 1.2, ease: "power2.out" }, 10.5)

            .to(phoneDrop, { scale: 1.4, y: mobileY.final, "--ring-opacity": 0.9, "--edge-glow": 1, "--aura-scale": 1.24, duration: 2, ease: "power2.inOut" }, 13.5)
            .to("#text-final", { opacity: 0, y: -80, filter: blurOut, duration: 1.5, ease: "power2.in" }, 13.5)
            .to("#transition-wash", { opacity: 1, duration: 1.5, ease: "power2.inOut" }, 14)
            .to(phoneDrop, { opacity: 0, scale: 2, filter: finalBlur, duration: 1.5, ease: "power3.in" }, 14.5)
            .to(".cinematic-light", { opacity: 0, duration: 1 }, 14.5)
            .to({}, { duration: 1 });
    }

    function initReveals() {
        qsa(".gs-reveal").forEach((element) => {
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

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const email = new FormData(form).get("email");

            if (!email) {
                return;
            }

            alert("Te-am adăugat pe lista VIP. Vei primi un email curând.");
            form.reset();
        });
    }

    window.TryClothesSite = {
        version: siteVersion
    };
})();
