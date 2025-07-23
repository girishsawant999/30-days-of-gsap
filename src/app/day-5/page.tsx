"use client";
import BackButton from "@/components/BackButton";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import SplitText from "gsap/SplitText";
import { PointerEventHandler, useRef } from "react";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

const ScrambleTextTutorial = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      const splitHeading = new SplitText("h1", {
        type: "words, chars",
        smartWrap: true,
      });
      const paragraphSplit = new SplitText("p", {
        type: "words,chars",
      });

      gsap.set(paragraphSplit.words, { opacity: 0.3 });
      tl.from(splitHeading.words, {
        opacity: 0,
        y: 100,
        rotationX: 90,
        transformOrigin: "top center",
        duration: 0.8,
        ease: "back.out(1.7)",
        onComplete: () => {
          splitHeading.revert();
        },
      }).fromTo(
        paragraphSplit.words,
        {
          opacity: 0.3,
        },
        {
          opacity: 1,
          stagger: 0.03,
          ease: "power2.out",
          onComplete: () => {
            paragraphSplit.revert();
          },
        }
      );
    },
    {
      scope: container,
    }
  );

  let tl = useRef<gsap.core.Timeline | null>(null);
  const scramble: PointerEventHandler<HTMLElement> = (e) => {
    if (tl.current) {
      tl.current.revert();
      tl.current.kill();
    }
    tl.current = gsap.timeline();
    const target = e.currentTarget;
    const split = SplitText.create(target, {
      type: "words, chars",
    });
    split.words.forEach((word) => {
      tl.current?.to(word, {
        scrambleText: {
          text: word.textContent ?? "",
          chars: "random",
          revealDelay: 0.5,
          tweenLength: true,
        },
      });
    });
  };

  return (
    <section className="p-5 md:p-10 grid place-items-center min-h-dvh">
      <div className="flex items-center gap-3 md:fixed top-10 left-10 z-10">
        <BackButton />
      </div>
      <div className="max-w-3xl m-auto" ref={container}>
        <span className="text-center block mb-5">Hover over</span>
        <h1
          onPointerEnter={scramble}
          className="text-7xl md:text-8xl font-bold text-center mb-5 overflow-hidden cursor-default tabular-nums"
          aria-label="Scramble Text Animation Example"
        >
          Scramble Text Animation
        </h1>
        <p
          onPointerEnter={scramble}
          className="text-center text-lg cursor-default tabular-nums"
        >
          This example demonstrates GSAP's ScrambleText effect in action. Watch
          as the characters dynamically shuffle into place to form readable text
          — a great way to grab attention!
        </p>
      </div>
    </section>
  );
};

export default ScrambleTextTutorial;
