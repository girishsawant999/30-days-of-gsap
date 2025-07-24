"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ChevronsDown } from "lucide-react";

const ScrollToExplore = ({
  label = "Scroll to explore",
}: {
  label?: string;
}) => {
  useGSAP(() => {
    gsap.to("#scroll-down", {
      y: 30,
      ease: "power2.in",
      duration: 0.5,
      repeat: -1,
      yoyo: true,
    });

    ScrollTrigger.create({
      trigger: "#scroll-down",
      start: "clamp(top bottom)",
      end: "clamp(top 500px)",
      onEnter: () => {
        gsap.to("#scroll-down", { opacity: 1 });
      },
      onEnterBack: () => {
        gsap.to("#scroll-down", { opacity: 1 });
      },
      onLeave: () => {
        gsap.to("#scroll-down", { opacity: 0 });
      },
    });
  });

  return (
    <div
      id="scroll-down"
      className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 justify-center z-40"
    >
      <span className="text-lg font-normal">{label}</span>
      <ChevronsDown size={18} />
    </div>
  );
};

export default ScrollToExplore;
