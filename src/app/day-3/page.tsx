"use client";

import BackButton from "@/components/BackButton";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ChevronsDown } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollSmoother);

const SmoothScrollTutorial = () => {
  const smoothWrapper = useRef(null);

  useGSAP(
    () => {
      gsap.to("#scroll-down", {
        y: 30,
        ease: "power2.in",
        duration: 0.5,
        repeat: -1,
        yoyo: true,
      });
      const smoother = ScrollSmoother.create({
        wrapper: smoothWrapper.current,
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
      });
      const sctr = ScrollTrigger.create({
        trigger: smoothWrapper.current,
        pin: true,
        pinSpacing: false,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate(self) {
          const { progress } = self;
          console.log("pr", progress);
        },
      });

      document.querySelectorAll(".img-container").forEach((group) => {
        group.addEventListener("mouseenter", () => {
          gsap.to(group, {
            flex: 2,
            duration: 0.6,
            ease: "power2.out",
          });
        });

        group.addEventListener("mouseleave", () => {
          gsap.to(group, {
            flex: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      });

      return () => {
        // Kill ScrollSmoother
        const existingSmoother = ScrollSmoother.get();
        if (existingSmoother) existingSmoother.kill();

        // Kill all ScrollTriggers
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    {
      scope: smoothWrapper,
    }
  );

  return (
    <section
      ref={smoothWrapper}
      className="bg-background text-foreground relative"
    >
      <div className="absolute top-5 md:top-10 left-5 md:left-10 z-20">
        <BackButton />
      </div>

      <div id="smooth-content">
        <div className="min-h-dvh grid place-items-center relative primary-section">
          <h1 className="text-4xl text-center md:text-8xl font-sans font-semibold leading-none">
            Explore SmoothScroller
          </h1>

          <div
            id="scroll-down"
            className="absolute bottom-10 flex flex-col items-center gap-1 justify-center"
          >
            <span className="text-lg font-normal">Scroll down</span>
            <ChevronsDown size={18} />
          </div>
        </div>
        <div className="flex min-h-dvh items-stretch justify-center my-10">
          <div className="flex-1 img-container" data-speed="clamp(1.7)">
            <img
              className="w-full h-full object-cover object-top"
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453"
              alt="Image 1"
            />
          </div>
          <div className="flex-1 img-container" data-speed="clamp(2.5)">
            <img
              className="w-full h-full object-cover object-top"
              src="https://images.unsplash.com/photo-1630255732364-a69ade0f0543"
              alt="Image 2"
            />
          </div>
          <div className="flex-1 img-container" data-speed="clamp(1.5)">
            <img
              className="w-full h-full object-cover object-top"
              src="https://images.unsplash.com/photo-1607699032287-f58742a2693d"
              alt=""
            />
          </div>
          <div className="flex-1 img-container" data-speed="clamp(2.7)">
            <img
              className="w-full h-full object-cover object-top"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb"
              alt=""
            />
          </div>
        </div>
        <div className="min-h-dvh"></div>
      </div>
    </section>
  );
};

export default SmoothScrollTutorial;
