"use client";

import BackButton from "@/components/BackButton";
import { MODELS_IMAGES } from "@/constants/Models";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ChevronsDown } from "lucide-react";
import Image from "next/image";
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
        smoothTouch: 0.1,
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
    <div ref={smoothWrapper} className="place-self-stretch relative">
      <div className="fixed top-5 md:top-10 left-5 md:left-10 z-20">
        <BackButton />
      </div>

      <div id="smooth-content" className="bg-background text-foreground">
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
          {[1.7, 2.5, 1.5, 2.7].map((speed, idx) => (
            <div
              key={idx}
              className="flex-1 img-container"
              data-speed={`clamp(${speed})`}
            >
              <Image
                className="w-full h-full object-cover object-top"
                src={MODELS_IMAGES[idx + 1]}
                alt="Image 1"
                width={1000}
                height={1000}
                loading="eager"
              />
            </div>
          ))}
        </div>
        <div className="min-h-dvh"></div>
      </div>
    </div>
  );
};

export default SmoothScrollTutorial;
