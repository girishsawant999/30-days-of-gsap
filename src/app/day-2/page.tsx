"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ScrollTriggerTutorial = () => {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: `+=${window.innerHeight * 5}px`,
        scrub: true,
        pin: true,
        onUpdate: ({ progress, ...self }) => {
          if (!container.current) return;
          if (progress > 0 && progress < 0.25) {
            const headings = document.querySelectorAll(
              ".intro-section h1 span"
            );
            const rect = container.current.getBoundingClientRect();

            const distance = rect.width * progress * 5;
            console.log("distance", distance, self);
            gsap.to(headings[0], {
              x: -distance,
            });
            gsap.to(headings[1], {
              x: distance,
            });
            gsap.to(".bg-image img", {
              scale: gsap.utils.mapRange(0, 0.24, 0, 1, progress),
              y: gsap.utils.mapRange(0, 0.24, 150, 0, progress),
              ease: "power2.out",
              filter: `grayscale(${gsap.utils.mapRange(
                0,
                0.25,
                1,
                0,
                progress
              )})`,
            });
          }
        },
      });
    },
    {
      scope: container,
    }
  );
  return (
    <div
      ref={container}
      className="place-self-stretch min-h-full relative grid place-items-center overflow-hidden"
    >
      <div className="bg-image absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1532170579297-281918c8ae72?q=80&w=1484&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="h-full w-full object-cover object-top scale-0"
        />
      </div>
      <div className="intro-section absolute">
        <h1 className="flex gap-1.5 text-3xl  md:text-6xl font-semibold font-sans">
          <span>Explore</span>
          <span>ScrollTrigger</span>
        </h1>
      </div>
    </div>
  );
};

export default ScrollTriggerTutorial;
