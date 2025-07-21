"use client";
import BackButton from "@/components/BackButton";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import { ChevronsDown } from "lucide-react";

gsap.registerPlugin(Flip);

const FlipTutorial = () => {
  useGSAP(
    () => {
      gsap.to("#scroll-down", {
        y: 30,
        ease: "power2.in",
        duration: 0.5,
        repeat: -1,
        yoyo: true,
      });
    },
    {
      scope: "#container",
    }
  );

  const switchPosition = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const movingObject = document.querySelector("#moving-object");
    if (!movingObject) return;
    const state = Flip.getState(movingObject);

    target.appendChild(movingObject);

    gsap.to(movingObject, {
      //   backgroundColor: `#${Math.floor(Math.random() * 0xff00ff)
      //     .toString(16)
      //     .padStart(6, "0")}`,
      borderRadius: gsap.utils.mapRange(
        0,
        1,
        0,
        target.clientWidth * 0.4,
        Math.random()
      ),
      rotate: gsap.utils.mapRange(0, 1, 0, 360, Math.random()),
      duration: 0.5,
      ease: "power2.out",
    });
    Flip.from(state, {
      duration: 0.5,
      ease: "power2.inOut",
      absolute: true,
      scale: true,
    });
  };

  return (
    <section
      id="container"
      className="bg-background text-foreground min-h-dvh p-5 md:p-10 flex flex-col place-items-center scroll-smooth snap-y snap-mandatory"
    >
      <div className="fixed top-5 md:top-10 left-5 md:left-10 z-20">
        <BackButton />
      </div>

      <div className="grid min-h-dvh place-items-center relative primary-section">
        <h1 className="text-4xl text-center md:text-8xl font-sans font-semibold leading-none">
          Explore Flip
        </h1>
        <div
          id="scroll-down"
          className="absolute bottom-10 flex flex-col items-center gap-1 justify-center"
        >
          <span className="text-lg font-normal">Scroll down</span>
          <ChevronsDown size={18} />
        </div>
      </div>
      <div className="grid min-h-dvh snap-start place-items-center relative primary-section w-full">
        <div className="grid grid-cols-8 grid-rows-8 place-items-stretch w-full max-w-xl">
          {Array.from({ length: 64 }).map((_, i) => (
            <div
              onClick={switchPosition}
              className="targets grid place-items-center bg-foreground/10 border border-solid border-foreground/40 aspect-square"
              key={i}
            >
              {i === 28 && (
                <div
                  id="moving-object"
                  className="w-2/3 aspect-square bg-indigo-600 dark:bg-indigo-400"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlipTutorial;
