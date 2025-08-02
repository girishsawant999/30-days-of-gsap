"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Observer from "gsap/dist/Observer";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Image7 from "./assets/Frame 10.png";
import Image8 from "./assets/Frame 11.png";
import Image9 from "./assets/Frame 12.png";
import Image10 from "./assets/Frame 13.png";
import Image11 from "./assets/Frame 14.png";
import Image12 from "./assets/Frame 15.png";
import Image13 from "./assets/Frame 16.png";
import Image1 from "./assets/Frame 4.png";
import Image2 from "./assets/Frame 5.png";
import Image3 from "./assets/Frame 6.png";
import Image4 from "./assets/Frame 7.png";
import Image5 from "./assets/Frame 8.png";
import Image6 from "./assets/Frame 9.png";

const plantImages = [
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
  Image8,
  Image9,
  Image10,
  Image11,
  Image12,
  Image13,
];

gsap.registerPlugin(Observer);

const ObserverTutorial = () => {
  const container = useRef<HTMLDivElement>(null);
  const carousel = useRef<HTMLDivElement>(null);
  const animating = useRef(false);

  const { contextSafe } = useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        "header",
        {
          y: -100,
          opacity: 0,
          duration: 0.5,
        },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
        }
      );
      tl.fromTo(
        ".content",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
        },
        "-=0.2"
      );
    },
    { scope: container }
  );

  const slide = (direction: -1 | 1) => {
    if (animating.current) return;
    animating.current = true;
    contextSafe(() => {
      gsap.to("img", {
        xPercent: `+=${direction * 100}`,
        modifiers: {
          xPercent: gsap.utils.wrap(
            direction * (plantImages.length - 2) * 100,
            0
          ),
        },
        ease: "power2.out",
        duration: 0.6,
        onComplete: () => {
          animating.current = false;
        },
      });
    })();
  };

  useEffect(() => {
    const observer = Observer.create({
      target: container.current,
      type: "touch, wheel, scroll",
      onUp: () => {
        slide(1);
      },
      onDown: () => {
        slide(-1);
      },
      onLeft: () => {
        slide(1);
      },
      onRight: () => {
        slide(-1);
      },
    });

    return () => {
      observer.kill();
    };
  }, []);

  return (
    <section
      ref={container}
      className="bg-background flex flex-col relative h-lvh overflow-hidden text-[#243734] dark:text-[#7CA38E] cursor-ns-resize "
    >
      <div className="grid-cols-6 w-full max-w-[min(1400px,92vw)] mx-auto gap-5">
        <header className="header col-span-6 flex items-center gap-5 justify-between mt-4 md:mt-10 font-sans w-full">
          <div className="flex items-center gap-10">
            <Link href="/">
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                className="size-14 md:size-[100px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M63.1729 22.6646C41.5917 38.0688 47.8667 65.2605 47.8667 65.2605L52.5479 56.3959L63.1729 22.6646ZM63.1729 22.6646C72.0167 47.6605 51.2833 66.3355 51.2833 66.3355L52.5333 56.3896L63.1729 22.6646ZM25.4583 27.5105C36.6125 28.2396 45.9083 39.5959 45.9083 39.5959C43.124 46.1507 42.3608 53.3878 43.7167 60.3792C33.3833 51.3313 23.8 41.948 25.4562 27.5105H25.4583ZM6.14166 62.3292C18.8723 70.6718 33.4279 75.8196 48.5729 77.3355C40.9937 59.7917 27.525 53.5021 6.14166 62.3292V62.3292ZM51.5604 77.2396C74.5292 76.0751 93.8354 62.6313 93.8583 62.5001C74.3167 54.073 60.1229 58.7521 51.5604 77.2396Z"
                  stroke="currentColor"
                  strokeWidth="2.08333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <nav className="items-center gap-5 hidden md:flex">
              <a href="#plants" className="text-xl text-current font-medium">
                Plants
              </a>
              <a href="#pots" className="text-xl text-current font-medium">
                Pots
              </a>
              <a href="#gifts" className="text-xl text-current font-medium">
                Gifts
              </a>
            </nav>
          </div>
          <div className=" flex justify-end gap-5 items-center">
            <input
              className="border-current border-2 hidden md:block text-current bg-transparent placeholder:text-current/80 px-3 py-1.5 md:px-4 md:py-3.5 outline-current"
              type="text"
              placeholder="Search"
            />
            <a
              href="#plants"
              className="text-xl bg-current px-3 py-1.5 md:px-4 md:py-3.5"
            >
              <span className="text-white dark:text-black text-lg  md:text-xl">
                Shop Plants
              </span>
            </a>
          </div>
        </header>

        <div className="content min-h-1/3 flex flex-col gap-4 py-20 justify-center items-center w-full">
          <h1 className="text-center text-4xl  md:text-[50px] font-semibold font-sans">
            Indoor plants made easy
          </h1>
          <p className="text-center text-lg  md:text-xl text-current font-sans max-w-lg">
            Patch plants makes it easy for you to find a find a plant that fits
            your home environment
          </p>
          <a
            href="#plants"
            className="text-xl bg-current px-3 py-1.5 md:px-4 md:py-3.5 mt-4"
          >
            <span className="text-white dark:text-black text-lg  md:text-xl ">
              Shop Plants
            </span>
          </a>
        </div>
      </div>

      <div className="mt-auto relative overflow-hidden">
        <div className="bg-background absolute inset-x-0 rounded-[100%] top-0 h-12 md:h-32 z-10 -translate-y-1/2" />
        <div className="bg-background absolute inset-x-0 rounded-[100%] bottom-0 h-12 md:h-32 z-10 translate-y-1/2" />

        <div
          ref={carousel}
          className="flex items-center gap-5 md:gap-10 justify-center"
        >
          {[...plantImages, ...plantImages].map((url, index) => (
            <div
              key={index}
              className="min-w-[220px] md:min-w-[332px] h-[423px] z-0"
            >
              <Image
                src={url}
                alt={`Model-${index}`}
                width={332}
                height={423}
                className="object-cover object-top h-full aspect-square"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ObserverTutorial;
