"use client";
import BackButton from "@/components/BackButton";
import ReloadButton from "@/components/ReloadButton";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useRef, useState } from "react";

gsap.registerPlugin(SplitText);

const SplitTextTutorial = () => {
  const [flag, setFlag] = useState(false);
  const container = useRef(null);

  const { context } = useGSAP(
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
        rotationX: 90,
        transformOrigin: "top center",
        stagger: 0.05,
        ease: "back.out(1.7)",
        duration: 0.8,
      });

      gsap.set(paragraphSplit.chars, { opacity: 0.3 });
      tl.to(paragraphSplit.chars, {
        opacity: 1,
        stagger: 0.03,
        ease: "power2.out",
      });
    },
    {
      scope: container,
      dependencies: [flag],
    }
  );

  return (
    <section className="grid md:grid-cols-2 gap-10 relative w-full place-items-center h-dvh p-10">
      <div className="flex items-center gap-3 absolute top-10 left-10">
        <BackButton />
        <ReloadButton
          onReload={() => {
            context.revert();
            setFlag((prev) => !prev);
          }}
        />
      </div>

      <div className="max-w-3xl" ref={container}>
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

      <div className="p-4 bg-zinc-200 dark:bg-zinc-800 rounded-lg place-self-stretch overflow-y-auto no-scrollbar">
        <h1 className="text-2xl font-semibold mb-6">
          GSAP SplitText Plugin Overview
        </h1>
        <p className="mb-6">
          The <strong>SplitText</strong> plugin is a powerful tool from GSAP
          (GreenSock Animation Platform) that helps you break down text into
          smaller parts — like <em>lines</em>, <em>words</em>, or{" "}
          <em>characters</em>. This is extremely helpful when you want to
          animate individual elements of your text, such as having each word fly
          in separately or each letter fade in one after another.
        </p>
        <p className="mb-6">
          This kind of effect is especially useful for creating modern, engaging
          UI/UX experiences — think landing pages, hero sections, or any content
          where attention to detail matters. With SplitText, you get
          fine-grained control over your animations that would be very tedious
          to do manually.
        </p>
        <p className="mb-6">
          Here’s a simple example of how you can use the plugin to animate a
          heading. We'll split it into <code>words</code> and <code>chars</code>{" "}
          (characters), then animate each character to slide in from the bottom
          with a fading effect.
        </p>
        <pre className="bg-background text-foreground p-4 rounded text-sm overflow-auto mb-6">
          <code>
            {`// 1. Register the plugin
gsap.registerPlugin(SplitText);

// 2. Split the heading text into words and characters
const headingSplit = SplitText.create("h1", {
  type: "words, chars",
});

// 3. Animate each character individually
gsap.from(headingSplit.chars, {
  y: 50,
  opacity: 0,
  stagger: 0.05,
  ease: "back.out(1.7)"
});`}
          </code>
        </pre>
        <p className="mb-6">
          <strong>Important Note:</strong> Always ensure the element you're
          splitting (like <code>h1</code> or <code>p</code>) is already visible
          and present in the DOM when the SplitText function runs. Otherwise,
          the plugin may not work as expected.
        </p>
        <p>
          SplitText doesn’t ship with GSAP by default — it’s a paid plugin
          offered through GreenSock’s Club. You’ll need a membership to use it
          in production, but you can try it locally for learning and demos.
        </p>
      </div>
    </section>
  );
};

export default SplitTextTutorial;
