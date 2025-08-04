"use client";
import BackButton from "@/components/BackButton";
import { MODELS_IMAGES } from "@/constants/Models";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const imagesPositionAndScale = [
  {
    src: MODELS_IMAGES[6],
    scaleFn: gsap.utils.mapRange(0, 1, 1, 4),
    style: {
      height: "25vh",
      width: "25vw",
    },
  },
  {
    src: MODELS_IMAGES[1],
    scaleFn: gsap.utils.mapRange(0, 1, 1, 5),
    style: {
      height: "35vh",
      width: "25vw",
      right: "-28vw",
      top: "12vh",
    },
  },
  {
    src: MODELS_IMAGES[2],
    scaleFn: gsap.utils.mapRange(0, 1, 1, 6),
    style: {
      height: "35vh",
      width: "25vw",
      left: "-28vw",
      top: "-15vh",
    },
  },
  {
    src: MODELS_IMAGES[3],
    scaleFn: gsap.utils.mapRange(0, 1, 1, 7),
    style: {
      height: "36vh",
      width: "25vw",
      top: "-28vh",
      left: "28vw",
    },
  },

  {
    src: MODELS_IMAGES[4],
    scaleFn: gsap.utils.mapRange(0, 1, 1, 8),
    style: {
      height: "28vh",
      width: "25vw",
      bottom: "-22vh",
      left: "-28vw",
    },
  },
  {
    src: MODELS_IMAGES[5],
    scaleFn: gsap.utils.mapRange(0, 1, 1, 9),
    style: {
      height: "25vh",
      width: "19vw",
      top: "-28vh",
    },
  },
  {
    src: MODELS_IMAGES[0],
    scaleFn: gsap.utils.mapRange(0, 1, 1, 7),
    style: {
      height: "25vh",
      width: "25vw",
      top: "28vh",
    },
  },
];

const ScrollZoomEffect = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      if (!container.current) return;

      gsap.to("img", {
        autoAlpha: 1,
        ease: "power2.in",
      });

      ScrollTrigger.create({
        trigger: container.current,
        scrub: true,
        start: "clamp(top top)",
        end: "clamp(+=3000px)",
        pin: true,
        onUpdate: ({ progress }) => {
          imagesPositionAndScale.forEach(({ scaleFn }, index) => {
            gsap.to(`[data-img-container="${index}"]`, {
              scale: scaleFn(progress),
            });
          });
        },
      });
    },
    {
      scope: container,
    }
  );

  return (
    <section className="bg-background text-foreground">
      <div className="fixed flex items-center gap-3 top-5 md:top-10 left-5 md:left-10 z-10">
        <BackButton />
      </div>
      <div className="h-[70vh] grid place-items-center relative">
        <div className="p-5 md:p-10">
          <h1 className="text-4xl text-center md:text-8xl font-sans font-semibold leading-none">
            ScrollTrigger Zoom
          </h1>
          <p className="text-center text-base md:text-xl text-current/70 mt-3 leading-snug  max-w-lg mx-auto">
            A ScrollTrigger-powered pinning section where images fluidly scale
            as you navigate through the scroll.
          </p>
        </div>
      </div>
      <div
        ref={container}
        className="grid place-items-center h-screen w-full relative overflow-hidden"
      >
        {imagesPositionAndScale.map(({ src, style }, index) => (
          <div
            key={index}
            data-img-container={index}
            className="absolute grid place-items-center"
          >
            <div style={style} className="relative overflow-hidden">
              <Image
                src={src}
                alt={`Model ${index + 1}`}
                key={index}
                fill
                priority
                quality={index === 0 ? 100 : 75}
                className="object-cover object-center invisible"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="h-screen" />
    </section>
  );
};

export default ScrollZoomEffect;
