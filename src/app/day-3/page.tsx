"use client";

import BackButton from "@/components/BackButton";
import ScrollToExplore from "@/components/ScrollToExplore";
import { MODELS_IMAGES } from "@/constants/Models";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollSmoother);

const SmoothScrollTutorial = () => {
  const smoothWrapper = useRef(null);

  useGSAP(
    () => {
      ScrollSmoother.create({
        wrapper: smoothWrapper.current,
        content: "#smooth-content",
        smooth: 1.5,
        smoothTouch: 0.1,
        effects: true,
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
      <ScrollToExplore />

      <div id="smooth-content" className="bg-background text-foreground">
        <div className="min-h-dvh grid place-items-center relative primary-section">
          <h1
            className="text-4xl text-center md:text-8xl font-sans font-semibold leading-none z-10"
            data-lag="clamp(5)"
          >
            Explore SmoothScroller
          </h1>
        </div>
        <div className="flex min-h-dvh items-stretch justify-center my-10">
          {[1.7, 2.5, 1.5, 3].map((speed, idx) => (
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
