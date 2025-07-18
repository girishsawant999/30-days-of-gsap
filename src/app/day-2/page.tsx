"use client";
import BackButton from "@/components/BackButton";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ScrollTriggerTutorial = () => {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const scrollToExploreAnimation = gsap.to(".scroll-to-explore", {
        y: 20,
        yoyo: true,
        ease: "expo.in",
        repeat: -1,
        duration: 0.5,
      });

      ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: `+=${window.innerHeight * 5}px`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        onUpdate: ({ progress, ...self }) => {
          if (!container.current) return;

          if (progress <= 0) {
            gsap.killTweensOf("*"); // Kill all tweens immediately
            return;
          }

          if (progress <= 0.25) {
            if (progress > 0.02) {
              gsap.to(".scroll-to-explore", {
                opacity: 0,
                display: "none",
              });
              scrollToExploreAnimation.revert();
            }
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
              scale: gsap.utils.mapRange(0, 0.25, 0, 1, progress),
              y: gsap.utils.mapRange(0, 0.25, 150, 0, progress),
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
          if (progress > 0.25 && progress <= 0.5) {
            gsap.to(".introduction-heading", {
              opacity: gsap.utils.mapRange(0.25, 0.35, 0, 1, progress),
            });
            gsap.to(".introduction-description", {
              opacity: gsap.utils.mapRange(0.3, 0.4, 0, 1, progress),
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
    <SmoothScrollWrapper>
      <div
        ref={container}
        className="place-self-stretch min-h-full relative grid place-items-center overflow-hidden"
      >
        <div className="absolute top-10 left-10 z-10">
          <BackButton />
        </div>

        <div className="scroll-to-explore z-10 absolute opacity-80  bottom-10 inset-x-0 flex flex-col place-items-center pointer-events-none">
          <span>Scroll to explore</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M213.66,130.34a8,8,0,0,1,0,11.32l-80,80a8,8,0,0,1-11.32,0l-80-80a8,8,0,0,1,11.32-11.32L128,204.69l74.34-74.35A8,8,0,0,1,213.66,130.34Zm-91.32,11.32a8,8,0,0,0,11.32,0l80-80a8,8,0,0,0-11.32-11.32L128,124.69,53.66,50.34A8,8,0,0,0,42.34,61.66Z"></path>
          </svg>
        </div>

        <div className="absolute bottom-20  opacity-0 introduction-heading z-10">
          <h2 className="text-4xl md:text-6xl font-semibold font-sans text-white">
            Hi, I'm
            <br />
            Jennie Watson
          </h2>
        </div>

        <div className="absolute right-20 top-20 introduction-description  opacity-0 introduction-section z-10">
          <p className="text-end text-gray-400 text-lg md:text-xl font-light max-w-xl mx-auto">
            I'm a model, a storyteller, and a canvas of creativity. With every
            step and pose, I express confidence, elegance, and the art of visual
            emotion. Join me as we unfold a journey of style, strength, and
            self-expression.
          </p>
        </div>

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
    </SmoothScrollWrapper>
  );
};

export default ScrollTriggerTutorial;
