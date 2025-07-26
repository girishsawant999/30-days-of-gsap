"use client";
import BackButton from "@/components/BackButton";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";
import { useRef } from "react";

gsap.registerPlugin(Draggable, InertiaPlugin);

const DraggableTutorial = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ball = ballRef.current;
      const container = containerRef.current;
      if (!ball || !container) return;
      let vh = container.clientHeight;
      let vw = container.clientWidth;

      const getBallProp = gsap.getProperty(ball);
      const getContainerProp = gsap.getProperty(container);
      const friction = -0.5;

      gsap.defaults({
        overwrite: true,
      });

      const setBallToCenter = () => {
        vh = container.clientHeight;
        vw = container.clientWidth;

        const textBlock = document.querySelector(".text-block");
        if (!textBlock) return;
        const textBlockRect = textBlock.getBoundingClientRect();

        gsap.set(ball, {
          xPercent: -50,
          yPercent: -50,
          opacity: 1,
          x: textBlockRect.left + textBlockRect.width / 2,
          y: textBlockRect.bottom + ball.clientHeight + 30,
        });
      };

      setBallToCenter();

      const checkBounds = () => {
        let vx = InertiaPlugin.getVelocity(ball!, "x");
        let vy = InertiaPlugin.getVelocity(ball!, "y");

        const r = (getBallProp("width") as number) / 2;
        const x = getBallProp("x") as number;
        const y = getBallProp("y") as number;
        let xPos = x;
        let yPos = y;

        let hitting = false;
        if (x + r > vw) {
          xPos = x - r;
          vx = vx * friction;
          hitting = true;
        } else if (x - r < 0) {
          xPos = x + r;
          vx = vx * friction;
          hitting = true;
        }

        if (y + r > vh) {
          yPos = y - r;
          vy = vy * friction;
          hitting = true;
        } else if (y - r < 0) {
          yPos = y + r;
          vy = vy * friction;
          hitting = true;
        }

        if (hitting) {
          animateBounce(xPos, yPos, vx, vy);
        }
      };

      const animateBounce = (
        x: string | number = "+=0",
        y: string | number = "+=0",
        vx: string | number = "auto",
        vy: string | number = "auto"
      ) => {
        gsap.fromTo(
          ball,
          { x, y, rotate: 0 },
          {
            rotate:
              Math.sqrt((vx as number) ** 2 + (vy as number) ** 2) * Math.PI,
            inertia: {
              x: vx,
              y: vy,
            },
            onUpdate: checkBounds,
          }
        );
      };

      const draggable = Draggable.create(ball, {
        bounds: container,
        inertia: true,
        type: "x,y",
        onPress: () => {
          gsap.killTweensOf(ball);
        },
        onDragEnd: animateBounce,
        onDragEndParams: [],
      });

      window.addEventListener("resize", setBallToCenter);
      return () => window.removeEventListener("resize", setBallToCenter);
    },
    {
      scope: containerRef,
    }
  );

  return (
    <section ref={containerRef} className="min-h-dvh relative overflow-hidden">
      <div className="fixed flex items-center gap-3 top-5 md:top-10 left-5 md:left-10 z-20">
        <BackButton />
      </div>
      <div className="absolute text-block  top-1/2 left-1/2 -translate-1/2 flex place-items-center flex-col gap-1 z-10 pointer-events-none">
        <h1 className="font-sans text-4xl md:text-7xl font-bold text-center w-max [-webkit-stroke-color:#f00] [-webkit-text-stroke:2px] ">
          Draggable & Inertia
        </h1>
        <span className="text-center text-lg text-gray-600 dark:text-gray-400">
          Drag the ball
        </span>
      </div>
      <div
        ref={ballRef}
        className={clsx(
          "ball opacity-0 size-24 bg-green-600 rounded-full overflow-hidden",
          "before:absolute before:size-24 before:rounded-full before:border-4 before:border-solid before:border-white before:-top-16",
          "after:absolute after:size-24 after:rounded-full after:border-4 after:border-solid after:border-white after:-bottom-16"
        )}
      />
    </section>
  );
};

export default DraggableTutorial;
