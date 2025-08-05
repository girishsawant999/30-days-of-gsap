"use client";
import BackButton from "@/components/BackButton";
import ScrollToExplore from "@/components/ScrollToExplore";
import { LANDSCAPES_IMAGES } from "@/constants/Landscapes";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

const VignetteAnimation = () => {
  useGSAP(() => {
    const thumbnail = document.querySelectorAll(".thumbnail");
    if (!thumbnail[0]) return;

    gsap.set(".thumbnail", {
      autoAlpha: 1,
      x: window.innerWidth / 2 - thumbnail[0].clientWidth / 2,
      y: window.innerHeight / 2 - thumbnail[0].clientHeight / 2,
    });

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      gsap.to(thumbnail, {
        x: clientX - thumbnail[0].clientWidth / 2,
        y: clientY - thumbnail[0].clientHeight / 2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  });

  return (
    <section className="bg-background text-foreground cursor-none">
      <div className="fixed flex items-center gap-3 top-5 md:top-10 left-5 md:left-10 z-10">
        <BackButton />
      </div>
      <ScrollToExplore />
      {LANDSCAPES_IMAGES.map(({ src, thumbnail }, index) => (
        <div
          key={index}
          className="h-[120vh] [clip-path:_polygon(0_0,0_100%,100%_100%,100%_0)]"
        >
          <div className="h-full w-full relative ">
            <Image
              src={src}
              fill
              alt={`Landscape ${index + 1}`}
              className="object-cover object-center w-full"
            />
          </div>
          <div className="thumbnail w-[40vw] md:w-[22vw] invisible aspect-square fixed top-0 rounded-xl overflow-hidden [clip-path:_polygon(50%_0%,_83%_12%,_100%_43%,_94%_78%,_68%_100%,_32%_100%,_6%_78%,_0%_43%,_17%_12%)]">
            <Image
              src={thumbnail}
              fill
              priority
              alt={`Landscape ${index + 1}`}
              className="object-cover object-center w-full"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default VignetteAnimation;
