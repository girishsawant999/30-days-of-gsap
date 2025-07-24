"use client";
import BackButton from "@/components/BackButton";
import { MODELS_IMAGES } from "@/constants/Models";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import SplitText from "gsap/SplitText";
import TextPlugin from "gsap/TextPlugin";
import Image from "next/image";
import { useRef, useState } from "react";

gsap.registerPlugin(Flip, TextPlugin, SplitText);

const TextReplaceTutorial = () => {
  const container = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (!container.current) return;
      const containerRect = container.current.getBoundingClientRect();
      const imageContainerRect = container.current
        .querySelector("#image-container")
        ?.getBoundingClientRect();
      if (!imageContainerRect) return;
      console.log("container.current", container.current.parentElement?.style);
      const x = containerRect.right - imageContainerRect.width;
      const y = containerRect.bottom - imageContainerRect.height;
      const headingSplit = SplitText.create(".intro h1", {
        type: "words, chars",
        smartWrap: true,
      });
      const descriptionSplit = SplitText.create(".intro p", {
        type: "words, chars",
        smartWrap: true,
        wordsClass: "word",
      });

      const tl = gsap.timeline({
        // scrollTrigger: {
        //   trigger: container.current,
        //   scrub: true,
        //   markers: true,
        //   start: "clamp(top top)",
        //   end: "+=4000px",
        //   pin: true,
        // },
      });
      tl.to("#image-container img", {
        scale: 1,
        borderBottomLeftRadius: 20,
        stagger: 0.2,
        duration: 0.5,
        ease: "power2.out",
      });
      tl.to("#image-container img", {
        x: -x,
        y: y,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 20,
        stagger: {
          amount: 0.5,
          from: "end",
        },
        duration: 0.8,
      });

      tl.to(".intro", { opacity: 1 })
        .fromTo(
          headingSplit.words,
          {
            y: -50,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.02,
          },
          {
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.02,
          },
          "<"
        )
        .fromTo(
          descriptionSplit.words,
          {
            opacity: 0.3,
            stagger: 0.03,
            ease: "power2.out",
            duration: 0.8,
          },
          {
            opacity: 1,
            stagger: 0.03,
            ease: "power2.out",
            duration: 0.8,
          }
        );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="bg-background relative  text-foreground min-h-dvh grid place-items-center"
    >
      <div className="fixed flex items-center gap-3 top-5 md:top-10 left-5 md:left-10 z-10">
        <BackButton />
      </div>
      <div
        id="image-container"
        className="absolute w-3/5 md:w-1/4 top-0 right-0  aspect-[3/4] "
      >
        {MODELS_IMAGES.map((image, index) => (
          <Image
            key={index}
            src={image}
            fill
            alt={`Image ${index}`}
            data-flip-id={`img-${image}`}
            className="absolute w-full object-cover object-top scale-0"
          />
        ))}
      </div>

      <div className="intro text-center mt-10 absolute  z-10 opacity-0 p-10">
        <h1 className="text-4xl text-center font-sans md:text-6xl font-semibold text-primary mb-2">
          Explore Timeline
        </h1>
        <p className="text-lg text-center font-sans leading-snug  max-w-md [&_.word]:opacity-30 text-gray-600 dark:text-gray-400 ">
          Dive into an interactive animation experience powered by GSAP. Scroll
          through the visuals and watch as elements transform in real-time.
        </p>
      </div>
    </section>
  );
};

export default TextReplaceTutorial;
