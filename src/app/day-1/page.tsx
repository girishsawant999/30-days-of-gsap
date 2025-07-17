"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(SplitText);

const SplitTextTutorial = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const headingSplit = SplitText.create("h1", {
        type: "words, chars",
      });
      const paragraphSplit = SplitText.create("p", {
        type: "chars",
      });

      const tl = gsap.timeline();
      tl.from(headingSplit.words, {
        opacity: 0,
        y: 100,
        stagger: 0.05,
        ease: "power2.out",
      });

      gsap.set(paragraphSplit.chars, { opacity: 0.4 });
      tl.to(paragraphSplit.chars, {
        opacity: 1,
        stagger: 0.05,
        ease: "power2.out",
      });
    },
    {
      scope: container,
    }
  );

  return (
    <section
      ref={container}
      className="grid w-full place-items-center h-dvh p-10"
    >
      <div className="max-w-3xl">
        <h1
          className="text-8xl font-bold text-center mb-5 overflow-hidden"
          aria-label="Animate Your Text Like a Pro"
        >
          Animate Your Text Like a Pro
        </h1>
        <p className="text-center text-lg">
          Welcome to this tutorial on the GSAP SplitText plugin — a powerful
          tool for creating impressive text animations. In this guide, you’ll
          learn how to break down your text into characters, words, or lines and
          animate them with ease using GSAP.
        </p>
      </div>
    </section>
  );
};

export default SplitTextTutorial;
