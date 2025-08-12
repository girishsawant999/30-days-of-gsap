"use client";
import BackButton from "@/components/BackButton";
import ScrollToExplore from "@/components/ScrollToExplore";
import { LANDSCAPES_IMAGES } from "@/constants/Landscapes";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const CardStacks = () => {
  const scaleMap = gsap.utils.mapRange(0, 1, 2, 1);
  useGSAP(() => {
    const cards = gsap.utils.toArray(".card");

    cards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card as HTMLElement,
        start: "start, bottom",
        end: "start, top",
        scrub: true,
        onUpdate: ({ progress, ...args }) => {
          gsap.set((card as HTMLElement).querySelector("img"), {
            scale: scaleMap(progress),
          });
        },
        onLeave: () => {
          gsap.to(card as HTMLElement, {
            scale: 1 - (cards.length - index) * 0.02,
          });
        },
        onEnterBack: () => {
          gsap.to(card as HTMLElement, {
            scale: 1,
          });
        },
      });
    });
  });

  return (
    <section className="pt-[50vh] pb-[100vh] bg-background text-foreground">
      <div className="fixed flex items-center gap-3 top-5 md:top-10 left-5 md:left-10 z-10">
        <BackButton />
      </div>
      <ScrollToExplore />
      {LANDSCAPES_IMAGES.map(({ src, thumbnail }, index) => (
        <div
          className="sticky top-0 h-screen grid place-items-center card origin-top"
          key={index}
        >
          <div
            className="relative p-5 rounded-lg bg-foreground shadow-lg"
            style={{
              top: `calc(-5% + ${index * 25}px)`,
            }}
          >
            <div className="overflow-hidden rounded-md">
              <Image
                src={src}
                width={800}
                height={500}
                alt={`Landscape ${index + 1}`}
                className="object-cover w-[min(80vw,800px)]"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CardStacks;
