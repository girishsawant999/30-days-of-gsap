"use client";
import BackButton from "@/components/BackButton";
import { MODELS_IMAGES } from "@/constants/Models";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import {
  BugIcon,
  ChevronsDown,
  Heart,
  RotateCcw,
  Triangle,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(Flip);

const KillBugsGame = () => {
  const [bugIndexes, setBugIndexes] = useState<number[]>([]);
  const [bugSpeed, setBugSpeed] = useState(2500);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  useEffect(() => {
    if (lives === 0) return setBugIndexes([]);
    let intervalId: NodeJS.Timeout;

    function startInterval() {
      intervalId = setInterval(() => {
        setBugIndexes(
          Array.from({ length: 3 }, () => Math.floor(Math.random() * 64))
        );
      }, bugSpeed);
    }

    startInterval();

    return () => {
      clearInterval(intervalId);
    };
  }, [bugSpeed, lives]);

  const switchPosition = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const movingObject = document.querySelector("#moving-object");
    if (!movingObject) return;
    const state = Flip.getState(movingObject);

    target.appendChild(movingObject);

    const targetIndex = Array.from(
      document.querySelectorAll(".targets")
    ).indexOf(target);
    const isHit = bugIndexes.includes(targetIndex);

    gsap.to(movingObject, {
      backgroundColor: isHit ? "#22c55e" : "#ef4444",
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

    if (isHit) {
      gsap.to(target, {
        scale: 0.8,
        opacity: 0.8,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
      });
      setBugIndexes((prev) => prev.filter((idx) => idx !== targetIndex));
      setBugSpeed((prev) => Math.max(prev - 50, 700));
      setScore((prev) => prev + 1);
    } else {
      setLives((prev) => Math.max(prev - 1, 0));
      gsap.fromTo(
        target,
        { scale: 1 },
        {
          scale: 1.1,
          backgroundColor: "#f87171",
          yoyo: true,
          repeat: 1,
          duration: 0.2,
        }
      );
    }

    Flip.from(state, {
      duration: 0.5,
      ease: "power2.inOut",
      absolute: true,
      scale: true,
    });
  };

  const handleReset = () => {
    setBugIndexes(
      Array.from({ length: 3 }, () => Math.floor(Math.random() * 64))
    );
    setBugSpeed(1500);
    setScore(0);
    setLives(3);
  };

  return (
    <div className="grid min-h-dvh snap-start place-items-center relative primary-section w-full">
      <div className="w-full max-w-xl flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          {Array.from({ length: lives }).map((_, i) => (
            <Heart
              key={i}
              className="text-red-500"
              size={20}
              fill="currentColor"
            />
          ))}
        </div>
        <div className="text-sm font-semibold">Score: {score}</div>
        <button
          onClick={handleReset}
          className="cursor-pointer flex items-center gap-1 px-2 py-1 text-sm border rounded bg-background hover:bg-background/50 border-foreground"
        >
          {lives === 0 ? (
            <>
              <Triangle className="rotate-90" size={14} />
              Start
            </>
          ) : (
            <>
              <RotateCcw size={14} />
              Reset
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-8 grid-rows-8 place-items-stretch w-full max-w-xl">
        {Array.from({ length: 64 }).map((_, i) => (
          <div
            onClick={switchPosition}
            className="targets cursor-grab  relative grid place-items-center bg-foreground/10 border border-solid border-foreground/40 aspect-square"
            key={i}
          >
            {i === 28 && (
              <div
                id="moving-object"
                className="w-2/3 aspect-square bg-foreground rounded-full"
              />
            )}

            {bugIndexes.map((idx, j) => {
              if (idx !== i) return null;
              return (
                <BugIcon
                  data-bug={j}
                  key={j}
                  className="absolute w-1/2 aspect-square text-red-600 dark:text-rose-400 rounded-full"
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const FlipTutorial = () => {
  const bigLayout = { col: 1, row: 1, colSpan: 6, rowSpan: 6 };
  const smallLayout = { col: "", row: "", colSpan: 3, rowSpan: 3 };

  const container = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
      scope: container,
    }
  );

  const switchToBigGrid = (idx: number) => () => {
    const state = Flip.getState("[data-grid]");
    setActiveIndex(idx);
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.5,
        ease: "power2.inOut",
        fade: true,
      });
    });
  };

  return (
    <section
      ref={container}
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
          <span className="text-lg font-normal">Scroll down & click</span>
          <ChevronsDown size={18} />
        </div>
      </div>

      <div className="min-h-dvh  w-full grid place-items-center ">
        <div className="grid grid-cols-9 grid-rows-9 gap-1 md:gap-4 max-w-2xl w-full aspect-square bg-white border-4 md:border-[16px] border-white">
          {MODELS_IMAGES.map((url, index) => {
            const {
              col = "",
              row = "",
              colSpan,
              rowSpan,
            } = index === activeIndex ? bigLayout : smallLayout;

            return (
              <figure
                key={index}
                data-grid={index}
                onClick={switchToBigGrid(index)}
                className={`col-span-${colSpan} row-span-${rowSpan} col-start-${col} row-start-${row} ${
                  index !== 0 ? "cursor-zoom-in" : ""
                }`}
              >
                <Image
                  src={url}
                  className="h-full w-full object-cover object-top"
                  alt={`Profile ${index}`}
                  width={1200}
                  height={1200}
                  quality={100}
                  loading="eager"
                />
              </figure>
            );
          })}
        </div>
      </div>

      <KillBugsGame />
    </section>
  );
};

export default FlipTutorial;
