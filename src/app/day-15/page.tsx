"use client";
import BackButton from "@/components/BackButton";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RotateCcw } from "lucide-react";
import { useRef, useState } from "react";

const YearSwitchAnimation = () => {
  const container = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const countdownContainerRef = useRef<HTMLDivElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [currentYear, setCurrentYear] = useState("2025");
  const [hasStarted, setHasStarted] = useState(false);

  const createParticles = () => {
    const particlesContainer = particlesRef.current;
    if (particlesContainer) {
      particlesContainer.innerHTML = "";
      for (let i = 0; i < 40; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 4 + 2}px;
          height: ${Math.random() * 4 + 2}px;
          background: currentColor;
          left: 50%;
          top: 50%;
          border-radius: 50%;
          opacity: 0;
        `;
        particlesContainer.appendChild(particle);
      }
    }
  };

  const triggerYearSwitch = () => {
    createParticles();

    const tl = gsap.timeline();

    // Year shrinks and fades
    tl.to(yearRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    });

    // Particles scatter from center to all over the page
    tl.to(
      ".particle",
      {
        x: () => (Math.random() - 0.5) * window.innerWidth,
        y: () => (Math.random() - 0.5) * window.innerHeight,
        opacity: 0.6,
        scale: () => Math.random() * 1.5 + 0.5,
        duration: 0.8,
        stagger: { amount: 0.2, from: "random" },
        ease: "power2.out",
      },
      "<"
    );

    // Update year and bring back
    tl.call(() => setCurrentYear("2026"));
    tl.to(yearRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });

    // Fade particles
    tl.to(".particle", { opacity: 0, duration: 0.3 }, "-=0.3");

    // Show message
    tl.to(
      messageRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.2"
    );

    // Letter animation
    tl.fromTo(
      ".message-letter",
      { y: 15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.3,
        stagger: 0.02,
        ease: "power2.out",
      },
      "<"
    );
  };

  const startCountdown = () => {
    if (hasStarted) return;
    setHasStarted(true);

    const tl = gsap.timeline();

    // Show countdown container
    tl.set(countdownContainerRef.current, { display: "flex" });

    // Countdown: 5, 4, 3, 2, 1
    for (let i = 5; i >= 1; i--) {
      tl.call(() => {
        if (countdownRef.current) {
          countdownRef.current.textContent = String(i);
        }
      });
      tl.fromTo(
        countdownRef.current,
        { scale: 1.3, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.25, ease: "power2.out" }
      );
      tl.to(countdownRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.4,
        delay: 0.35,
        ease: "power2.in",
      });
    }

    // Hide countdown and trigger year switch
    tl.to(countdownContainerRef.current, { opacity: 0, duration: 0.3 });
    tl.set(countdownContainerRef.current, { display: "none" });
    tl.call(() => triggerYearSwitch());
  };

  const resetTimeline = () => {
    // Kill ALL running GSAP animations
    gsap.globalTimeline.clear();

    // Reset states
    setCurrentYear("2025");
    setHasStarted(false);

    // Reset DOM elements
    gsap.set(yearRef.current, { scale: 1, opacity: 1 });
    gsap.set(messageRef.current, { opacity: 0, y: 20 });
    gsap.set(countdownContainerRef.current, { display: "none", opacity: 1 });
    gsap.set(".message-letter", { y: 0, opacity: 1 });

    // Clear countdown text
    if (countdownRef.current) countdownRef.current.textContent = "";

    // Clear particles
    if (particlesRef.current) particlesRef.current.innerHTML = "";

    // Restart countdown after a brief delay
    setTimeout(() => startCountdown(), 100);
  };

  useGSAP(
    () => {
      // Initial setup
      gsap.set(messageRef.current, { opacity: 0, y: 20 });

      // Start countdown automatically
      startCountdown();
    },
    { scope: container }
  );

  const message = "Happy New Year!";

  return (
    <section
      ref={container}
      className="bg-background text-foreground min-h-dvh flex flex-col items-center justify-center overflow-hidden relative"
    >
      {/* Navigation */}
      <div className="fixed top-5 md:top-10 left-5 md:left-10 z-10 flex items-center gap-3">
        <BackButton />
        <button
          onClick={resetTimeline}
          className="bg-zinc-200 dark:bg-zinc-800 rounded-md p-1.5 cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Reset animation"
        >
          <RotateCcw size={24} />
        </button>
      </div>

      {/* Particles */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none text-foreground"
      />

      {/* Content */}
      <div className="flex flex-col items-center">
        {/* Year */}
        <div
          ref={yearRef}
          className="text-[100px] md:text-[180px] font-bold tracking-tighter leading-none"
        >
          {currentYear}
        </div>

        {/* Countdown */}
        <div
          ref={countdownContainerRef}
          className="flex-col items-center mt-4 hidden"
        >
          <span className="text-sm md:text-base font-medium opacity-40 mb-2 countdown-label">
            Countdown to 2026
          </span>
          <div
            ref={countdownRef}
            className="text-4xl md:text-6xl font-medium tracking-wide opacity-60"
          />
        </div>

        {/* Message */}
        <div
          ref={messageRef}
          className="text-xl md:text-3xl font-medium mt-6 tracking-wide"
        >
          {message.split("").map((letter, index) => (
            <span key={index} className="message-letter inline-block">
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YearSwitchAnimation;
