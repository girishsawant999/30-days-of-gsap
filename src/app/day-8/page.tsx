"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import IceCubeImage from "./assets/ice-cube.png";
import LogoImage from "./assets/logo.png";
import Pepsi1 from "./assets/pepsi/image 1.png";
import Pepsi2 from "./assets/pepsi/image 2.png";
import Pepsi3 from "./assets/pepsi/image 3.png";
import Pepsi4 from "./assets/pepsi/image 4.png";
import Pepsi5 from "./assets/pepsi/image 5.png";
import Pepsi6 from "./assets/pepsi/image 6.png";
import Pepsi7 from "./assets/pepsi/image 7.png";
import Pepsi8 from "./assets/pepsi/image 8.png";
import Smoke2 from "./assets/smoke-1.svg";
import Smoke1 from "./assets/smoke.svg";

gsap.registerPlugin(ScrollTrigger);

const PepsiLandingPage = () => {
  // --- Begin refs ---
  const canContainerRef = useRef<HTMLDivElement>(null);
  const introSectionRef = useRef<HTMLElement>(null);
  const productsSectionRef = useRef<HTMLElement>(null);
  const smoke1Ref = useRef<HTMLImageElement>(null);
  const smoke2Ref = useRef<HTMLImageElement>(null);
  const productPlaceholderRef = useRef<HTMLDivElement>(null);
  const buyNowSectionRef = useRef<HTMLElement>(null);
  const buyProductPlaceholderRef = useRef<HTMLDivElement>(null);
  const iceContainerRef = useRef<HTMLDivElement>(null);
  const pepsiBlackContainerRef = useRef<HTMLDivElement>(null);
  const pepsiBlackPlaceholderRef = useRef<HTMLDivElement>(null);
  // --- End refs ---

  useGSAP(() => {
    const canContainer = canContainerRef.current;
    const introSection = introSectionRef.current;
    const productsSection = productsSectionRef.current;
    const smoke1 = smoke1Ref.current;
    const smoke2 = smoke2Ref.current;
    const productPlaceholder = productPlaceholderRef.current;
    const buyNowSection = buyNowSectionRef.current;
    const buyProductPlaceholder = buyProductPlaceholderRef.current;
    const iceContainer = iceContainerRef.current;
    const pepsiBlackContainer = pepsiBlackContainerRef.current;
    const pepsiBlackPlaceholder = pepsiBlackPlaceholderRef.current;

    let vh = window.innerHeight;
    let vw = window.innerWidth;

    const refreshScrollTrigger = () => {
      vh = window.innerHeight;
      vw = window.innerWidth;
      ScrollTrigger.refresh();
    };

    requestAnimationFrame(() => {
      if (
        !canContainer ||
        !introSection ||
        !productsSection ||
        !smoke1 ||
        !smoke2 ||
        !productPlaceholder ||
        !buyProductPlaceholder ||
        !pepsiBlackContainer ||
        !pepsiBlackPlaceholder
      ) {
        console.warn("One or more required elements not found.");
        return;
      }

      // Calculate rects before any GSAP transformation

      gsap.set(canContainer, {
        opacity: 1,
        x: vw * 0.5 - canContainer.clientWidth * 0.5,
        y: vh - canContainer.clientHeight * 0.75,
      });

      // Recalculate after setting to observe difference
      const ppRect = productPlaceholder.getBoundingClientRect();
      const bppRect = buyProductPlaceholder.getBoundingClientRect();
      const pbpRect = pepsiBlackPlaceholder.getBoundingClientRect();
      const pbcRect = pepsiBlackContainer.getBoundingClientRect();

      gsap.from(smoke1, {
        scaleX: 0.5,
        scaleY: 0.7,
        opacity: 0.8,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        duration: 2,
      });

      gsap.from(smoke2, {
        scaleX: 0.5,
        scaleY: 0.7,
        opacity: 0.8,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        duration: 2,
      });

      const ices = gsap.utils.selector(iceContainer);
      const iceTween = gsap
        .to(ices("img"), {
          yPercent: -vh,
          rotate: 360,
          opacity: 0,
          stagger: {
            amount: 0.1,
            from: "random",
          },
          duration: 1,
          ease: "power2.inOut",
        })
        .pause(0);

      const pptl = gsap.timeline({
        scrollTrigger: {
          trigger: productsSection,
          start: "clamp(top bottom-=50px)",
          end: "clamp(top top)",
          scrub: true,
        },
        onStart() {
          iceTween.play();
        },
        onReverseComplete() {
          iceTween.reverse();
        },
      });

      pptl.to(canContainer, {
        scale: 1,
        rotate: 360,
        width: productPlaceholder.clientWidth,
        x: ppRect.left,
        y: ppRect.top,
      });

      // Buy now page
      const bptl = gsap.timeline({
        scrollTrigger: {
          trigger: buyNowSection,
          start: "clamp(top center)",
          end: "clamp(top top)",
          scrub: true,
        },
      });

      bptl.to(canContainer, {
        scale: 1,
        rotate: 0,
        width: bppRect.width,
        x: bppRect.x,
        y: bppRect.y,
      });

      // Buy  now 2 page
      const bp2tl = gsap.timeline({
        scrollTrigger: {
          trigger: buyNowSection,
          start: "clamp(top 30%)",
          end: "clamp(bottom top)",
          scrub: true,
          markers: true,
        },
      });

      bp2tl.to(pepsiBlackContainer, {
        rotate: 360,
        x: pbpRect.x - pbcRect.x,
        y: pbpRect.y - pbcRect.y + (pbpRect.height - pbcRect.height) / 2,
        width: pbpRect.width,
      });
    });

    window.addEventListener("resize", refreshScrollTrigger);
    return () => {
      window.removeEventListener("resize", refreshScrollTrigger);
    };
  });

  return (
    <section
      id="smooth-content"
      className="min-h-screen bg-[linear-gradient(153.46deg,_#003885_24.59%,_#094b77_83.35%)] relative overflow-hidden"
    >
      <div
        id="pepsi-can-container"
        ref={canContainerRef}
        className="absolute opacity-0 pointer-events-none z-40 origin-center"
      >
        <div className="relative grid place-items-center isolate">
          <Image
            src={Smoke1}
            alt="Smooke"
            id="smoke-1"
            ref={smoke1Ref}
            width={560}
            height={750}
            className="absolute z-10  -translate-x-1/8 md:-translate-x-1/4"
          />
          <Image
            src={Smoke2}
            alt="Smooke"
            id="smoke-2"
            ref={smoke2Ref}
            width={750}
            height={656}
            className="absolute z-10 translate-x-1/8 md:translate-x-1/4"
          />
          <Image
            src={Pepsi6}
            alt="Pepsi Can"
            width={440}
            height={520}
            className="z-20"
            priority
          />
        </div>
      </div>

      <header className="flex items-center gap-5 justify-between mx-auto max-w-[min(90vw,1200px)] py-6 ">
        <Link href="/">
          <Image
            width={184}
            height={60}
            className={clsx("mix-blend-normal -ms-5")}
            src={LogoImage}
            alt="Logo"
          />
        </Link>
        <nav className="gap-10 items-center hidden md:flex">
          <a
            href="#products"
            className="text-xl text-left text-white font-sans"
          >
            Products
          </a>
          <a
            href="#whats-new"
            className="text-xl text-left text-white font-sans"
          >
            What's New
          </a>
          <a
            href="#contact-us"
            className="text-xl text-left text-white font-sans"
          >
            Contact Us
          </a>

          <a
            href="#"
            className="text-xl text-left text-white font-sans border border-white rounded-md px-4 py-1"
          >
            Notify Me
          </a>
        </nav>
      </header>

      <section
        id="intro"
        ref={introSectionRef}
        className="mx-auto max-w-[min(90vw,1200px)] grid min-h-[calc(100dvh_-_108px)] relative mb-36"
      >
        <div className="flex items-center md:items-start md:justify-center gap-5 flex-col z-50 mt-10 md:mt-0">
          <h1 className="text-6xl md:text-8xl text-center md:text-start text-white font-bold font-sans">
            Get more <br /> with
          </h1>
          <a
            href="#"
            autoFocus
            className="text-xl text-left text-white font-sans border border-white rounded-md px-4 py-1 flex items-center justify-between backdrop-blur-sm"
          >
            Browse <ArrowRight />
          </a>
        </div>

        <div
          id="ice-container"
          ref={iceContainerRef}
          className="absolute bottom-0 w-full left-0"
        >
          <Image
            className="absolute -bottom-36 -left-40 scale-50"
            src={IceCubeImage}
            alt="Ice Cube"
            width={614}
            height={409}
          />
          <Image
            className="absolute -bottom-36 -left-10 scale-50"
            src={IceCubeImage}
            alt="Ice Cube"
            width={614}
            height={409}
          />
          <Image
            className="absolute -bottom-28 left-10 scale-70 -rotate-45"
            src={IceCubeImage}
            alt="Ice Cube"
            width={614}
            height={409}
          />
          <Image
            className="absolute -bottom-28 left-48 scale-80 -rotate-45"
            src={IceCubeImage}
            alt="Ice Cube"
            width={614}
            height={409}
          />
          <Image
            className="absolute -bottom-28 right-52 scale-80 rotate-12"
            src={IceCubeImage}
            alt="Ice Cube"
            width={614}
            height={409}
          />
          <Image
            className="absolute -bottom-28 right-10 scale-70 rotate-12"
            src={IceCubeImage}
            alt="Ice Cube"
            width={614}
            height={409}
          />
          <Image
            className="absolute -bottom-36 -right-40 scale-50 rotate-12"
            src={IceCubeImage}
            alt="Ice Cube"
            width={614}
            height={409}
          />
        </div>
      </section>

      <section
        id="products"
        ref={productsSectionRef}
        className=" grid relative"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-5 py-10 place-items-stretch mx-auto max-w-[min(90vw,1200px)]">
          <div className="aspect-[440/520] grid place-items-center">
            <Image src={Pepsi1} alt="Pepsi Can" width={440} height={520} />
          </div>
          <div className="aspect-[440/520] grid place-items-center">
            <Image src={Pepsi2} alt="Pepsi Can" width={440} height={520} />
          </div>
          <div className="aspect-[440/520] grid place-items-center">
            <Image src={Pepsi3} alt="Pepsi Can" width={440} height={520} />
          </div>
          <div className="aspect-[440/520] grid place-items-center">
            <Image src={Pepsi4} alt="Pepsi Can" width={440} height={520} />
          </div>
          <div className="aspect-[440/520] grid place-items-center">
            <Image src={Pepsi5} alt="Pepsi Can" width={440} height={520} />
          </div>
          <div
            id="product-placeholder"
            ref={productPlaceholderRef}
            className="aspect-[440/520]  grid place-items-center"
          ></div>
          <div className="aspect-[440/520] grid place-items-center">
            <Image src={Pepsi7} alt="Pepsi Can" width={440} height={520} />
          </div>
          <div
            ref={pepsiBlackContainerRef}
            className="aspect-[440/520] grid place-items-center z-30"
          >
            <Image src={Pepsi8} alt="Pepsi Can" width={440} height={520} />
          </div>
        </div>
      </section>

      <section
        id="buy-now-section"
        ref={buyNowSectionRef}
        className="min-h-screen relative grid place-items-center"
      >
        <div className="flex flex-col-reverse md:flex-row  mx-auto max-w-[min(90vw,1200px)] py-20  w-full">
          <div className="flex flex-col gap-8 justify-center">
            <h2 className="text-8xl font-bold font-sans text-white">Pepsi</h2>
            <p className="text-white/60 font-sans text-xl max-w-xl">
              Carbonated Water, High fructose, Corn Syrup, Caramel Color,
              Sugar,Phosphoric Acid, Caffine, Citric Acid, Natural Flavour
            </p>
            <div className="flex flex-col gap-4">
              <span className="text-white font-bold text-xl">
                NUTRITION FACT
              </span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-stretch">
                <div className="flex flex-col gap-4 bg-white/20 items-center pt-3">
                  <span className="px-3 text-white/80 font-light text-base text-center">
                    Amount per serving
                  </span>
                  <span className="font-semibold text-white text-2xl mt-auto text-center">
                    150 cl
                  </span>
                  <div className="mt-auto bg-white/20 text-white font-light text-base self-stretch text-center py-1.5">
                    7.5%
                  </div>
                </div>

                <div className="flex flex-col gap-4 bg-white/20 items-center pt-3">
                  <span className="px-3 text-white/80 font-light text-base text-center">
                    Total Fat
                  </span>
                  <span className="font-semibold text-white text-2xl mt-auto text-center">
                    0g
                  </span>
                  <div className="mt-auto bg-white/20 text-white font-light text-base self-stretch text-center py-1.5">
                    0%
                  </div>
                </div>
                <div className="flex flex-col gap-4 bg-white/20 items-center pt-3">
                  <span className="px-3 text-white/80 font-light text-base text-center">
                    Sodium
                  </span>
                  <span className="font-semibold text-white text-2xl mt-auto text-center">
                    30mg
                  </span>
                  <div className="mt-auto bg-white/20 text-white font-light text-base self-stretch text-center py-1.5">
                    1%
                  </div>
                </div>
                <div className="flex flex-col gap-4 bg-white/20 items-center pt-3">
                  <span className="px-3 text-white/80 font-light text-base text-center">
                    Protein
                  </span>
                  <span className="font-semibold text-white text-2xl mt-auto text-center">
                    0g
                  </span>
                  <div className="mt-auto bg-white/20 text-white font-light text-base self-stretch text-center py-1.5">
                    0%
                  </div>
                </div>
              </div>
            </div>

            <p className="opacity-[0.66] text-xl text-left text-white font-sans">
              <span className="opacity-[0.66] text-xl text-left text-white font-sans">
                Not a significant source of other Nutrients .
              </span>
              <br />
              <span className="opacity-[0.66] text-xl text-left text-white font-sans">
                *Percent daily Values are based on a 2,000 calorie diet.
              </span>
            </p>

            <a
              href="#"
              className="text-xl w-fit text-left text-white font-sans border border-white rounded-md px-4 py-1 flex items-center gap-3"
            >
              Buy Now <ArrowRight />
            </a>
          </div>

          <div
            id="buy-product-placeholder"
            ref={buyProductPlaceholderRef}
            className="aspect-[440/520] flex-1 mb-5 md:mb-0"
          ></div>
        </div>
      </section>
      <section
        id="buy-now-section-2"
        className="min-h-screen relative grid place-items-center bg-gradient-to-b from-[#07477a]  to-50% to-black"
      >
        <div className="flex flex-col-reverse md:flex-row-reverse  mx-auto max-w-[min(90vw,1200px)] py-20  w-full">
          <div className="flex flex-col gap-8 justify-center">
            <h2 className="text-8xl font-bold font-sans text-white">
              Pepsi Black
            </h2>
            <p className="text-white/60 font-sans text-xl max-w-xl">
              Carbonated Water, High fructose, Corn Syrup, Caramel Color,
              Sugar,Phosphoric Acid, Caffine, Citric Acid, Natural Flavour
            </p>
            <div className="flex flex-col gap-4">
              <span className="text-white font-bold text-xl">
                NUTRITION FACT
              </span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-stretch">
                <div className="flex flex-col gap-4 bg-white/20 items-center pt-3">
                  <span className="px-3 text-white/80 font-light text-base text-center">
                    Amount per serving
                  </span>
                  <span className="font-semibold text-white text-2xl mt-auto text-center">
                    0 cl
                  </span>
                  <div className="mt-auto bg-white/20 text-white font-light text-base self-stretch text-center py-1.5">
                    0%
                  </div>
                </div>

                <div className="flex flex-col gap-4 bg-white/20 items-center pt-3">
                  <span className="px-3 text-white/80 font-light text-base text-center">
                    Total Fat
                  </span>
                  <span className="font-semibold text-white text-2xl mt-auto text-center">
                    0g
                  </span>
                  <div className="mt-auto bg-white/20 text-white font-light text-base self-stretch text-center py-1.5">
                    0%
                  </div>
                </div>
                <div className="flex flex-col gap-4 bg-white/20 items-center pt-3">
                  <span className="px-3 text-white/80 font-light text-base text-center">
                    Sodium
                  </span>
                  <span className="font-semibold text-white text-2xl mt-auto text-center">
                    30mg
                  </span>
                  <div className="mt-auto bg-white/20 text-white font-light text-base self-stretch text-center py-1.5">
                    1%
                  </div>
                </div>
                <div className="flex flex-col gap-4 bg-white/20 items-center pt-3">
                  <span className="px-3 text-white/80 font-light text-base text-center">
                    Protein
                  </span>
                  <span className="font-semibold text-white text-2xl mt-auto text-center">
                    0g
                  </span>
                  <div className="mt-auto bg-white/20 text-white font-light text-base self-stretch text-center py-1.5">
                    0%
                  </div>
                </div>
              </div>
            </div>

            <p className="opacity-[0.66] text-xl text-left text-white font-sans">
              <span className="opacity-[0.66] text-xl text-left text-white font-sans">
                Not a significant source of other Nutrients .
              </span>
              <br />
              <span className="opacity-[0.66] text-xl text-left text-white font-sans">
                *Percent daily Values are based on a 2,000 calorie diet.
              </span>
            </p>

            <a
              href="#"
              className="text-xl w-fit text-left text-white font-sans border border-white rounded-md px-4 py-1 flex items-center gap-3"
            >
              Buy Now <ArrowRight />
            </a>
          </div>

          <div
            ref={pepsiBlackPlaceholderRef}
            className="aspect-[440/520] flex-1 mb-5 md:mb-0"
          ></div>
        </div>
      </section>
    </section>
  );
};

export default PepsiLandingPage;
