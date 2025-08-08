"use client";
import { MODELS_IMAGES } from "@/constants/Models";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const TimelineWithCarousel = () => {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({});

    tl.fromTo(
      ".img-container",
      {
        opacity: 0,
        x: (idx, curr, total) => {
          const l = total.length;
          const multiplier = idx === l / 2 ? 0 : idx < l / 2 ? -1 : 1;
          const baseDistance = window.innerWidth;
          const extraDistance = Math.abs(idx - l / 2) * baseDistance;
          return multiplier * (baseDistance + extraDistance);
        },
      },
      {
        opacity: 1,
        x: 0,
        duration: (idx, curr, total) => 0.05 * total.length,
        ease: "power2.out",
        stagger: {
          amount: 0.4,
          from: "center",
        },
      },
      "<"
    );

    tl.to(".wrapper", {
      y: 0,
      scale: 1,
    }).to(
      ".main-container",
      {
        backgroundColor: "#fff",
      },
      "<"
    );
  });

  return (
    <section
      ref={container}
      className="bg-[#632222] text-foreground overflow-hidden h-dvh main-container"
    >
      <div className="px-4 py-5 flex items-center gap-1.5 text-gray-800">
        <Menu />
        Menu
      </div>
      <div className="wrapper flex justify-center translate-y-1/2 scale-[0.35]">
        {[
          ...MODELS_IMAGES,
          ...MODELS_IMAGES,
          ...MODELS_IMAGES,
          ...MODELS_IMAGES,
          ...MODELS_IMAGES,
        ]
          .slice(1)
          .map((model, index) => (
            <div
              className="shrink-0 relative w-3/6 md:w-2/12 aspect-[2/3] opacity-0 img-container"
              key={index}
            >
              <Image
                src={model}
                alt={`Model ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
      </div>
    </section>
  );
};

export default TimelineWithCarousel;
