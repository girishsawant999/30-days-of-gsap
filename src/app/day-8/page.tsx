"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import IceCubeImage from "./assets/ice-cube.png";
import LogoImage from "./assets/logo.png";
import PepsiCanImage from "./assets/pepsi-can.png";
import Smoke2 from "./assets/smoke-1.svg";
import Smoke1 from "./assets/smoke.svg";

gsap.registerPlugin(ScrollTrigger);

const PepsiLandingPage = () => {
  useGSAP(() => {
    const canContainer = document.getElementById("pepsi-can-container");
    const introSection = document.getElementById("intro");
    const productsSection = document.getElementById("products");
    const smoke1 = document.getElementById("smoke-1");
    const smoke2 = document.getElementById("smoke-2");
    const productPlaceholder = document.getElementById("product-placeholder");
    const buyNowSection = document.getElementById("buy-now-section");
    const buyProductPlaceholder = document.getElementById(
      "buy-product-placeholder"
    );
    const iceContainer = document.getElementById("ice-container");

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
        !buyProductPlaceholder
      ) {
        console.warn("One or more required elements not found.");
        return;
      }

      const ccRect = canContainer.getBoundingClientRect();
      const ppRect = productPlaceholder.getBoundingClientRect();
      const bppRect = buyProductPlaceholder.getBoundingClientRect();

      gsap.set(canContainer, {
        opacity: 1,
        x: vw * 0.5 - ccRect.width * 0.5,
        y: vh - ccRect.height * 0.75,
      });

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
          start: "clamp(top bottom)",
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
        x: ppRect.left - ccRect.left,
        y: ppRect.top - ccRect.top,
        pin: canContainer,
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
        x: bppRect.left - ccRect.left,
        y: bppRect.top - ccRect.top,
        pin: canContainer,
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
        className="absolute opacity-0 pointer-events-none z-40 origin-center"
      >
        <div className="relative grid place-items-center isolate">
          <Image
            src={Smoke1}
            alt="Smooke"
            id="smoke-1"
            width={560}
            height={750}
            className="absolute z-10  -translate-x-1/8 md:-translate-x-1/4"
          />
          <Image
            src={Smoke2}
            alt="Smooke"
            id="smoke-2"
            width={750}
            height={656}
            className="absolute z-10 translate-x-1/8 md:translate-x-1/4"
          />
          <Image
            src={PepsiCanImage}
            alt="Pepsi Can"
            width={554}
            height={713}
            className="z-20"
            priority
          />
        </div>
      </div>

      <header className="flex sticky top-0 items-center gap-5 justify-between mx-auto max-w-[min(90vw,1200px)] py-6 ">
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
        className="mx-auto max-w-[min(90vw,1200px)] grid min-h-[calc(100dvh_-_108px)] relative mb-36"
      >
        <div className="flex items-center md:items-start md:justify-center gap-5 flex-col z-50 mt-10 md:mt-0">
          <h1 className="text-6xl md:text-8xl text-center md:text-start text-white font-bold font-sans">
            Get more <br /> with
          </h1>
          <a
            href="#"
            className="text-xl text-left text-white font-sans border border-white rounded-md px-4 py-1 flex items-center justify-between backdrop-blur-sm"
          >
            Browse <ArrowRight />
          </a>
        </div>

        <div id="ice-container" className="absolute bottom-0 w-full left-0">
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
        className=" grid relative bg-[linear-gradient(153.46deg,_#003885_24.59%,_#094b77_83.35%)]"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-5 py-10 place-items-stretch mx-auto max-w-[min(90vw,1200px)]">
          <div className="aspect-[554/713] hue-rotate-15 grid place-items-center">
            <Image
              src={PepsiCanImage}
              alt="Pepsi Can"
              width={554}
              height={713}
            />
          </div>
          <div className="aspect-[554/713] hue-rotate-30 grid place-items-center">
            <Image
              src={PepsiCanImage}
              alt="Pepsi Can"
              width={554}
              height={713}
            />
          </div>
          <div className="aspect-[554/713] hue-rotate-60 grid place-items-center">
            <Image
              src={PepsiCanImage}
              alt="Pepsi Can"
              width={554}
              height={713}
            />
          </div>
          <div className="aspect-[554/713] hue-rotate-90 grid place-items-center">
            <Image
              src={PepsiCanImage}
              alt="Pepsi Can"
              width={554}
              height={713}
            />
          </div>
          <div className="aspect-[554/713] hue-rotate-180 grid place-items-center">
            <Image
              src={PepsiCanImage}
              alt="Pepsi Can"
              width={554}
              height={713}
            />
          </div>
          <div
            id="product-placeholder"
            className="aspect-[554/713] hue-rotate-[320deg] grid place-items-center"
          ></div>
          <div className="aspect-[554/713] hue-rotate-[235deg] grid place-items-center">
            <Image
              src={PepsiCanImage}
              alt="Pepsi Can"
              width={554}
              height={713}
            />
          </div>
          <div className="aspect-[554/713] hue-rotate-[20deg] grid place-items-center">
            <Image
              src={PepsiCanImage}
              alt="Pepsi Can"
              width={554}
              height={713}
            />
          </div>
        </div>
      </section>

      <section
        id="buy-now-section"
        className="min-h-screen bg-[linear-gradient(153.46deg,_#003885_24.59%,_#094b77_83.35%)] relative grid place-items-center"
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
                  <span className="px-1 text-white/80 font-light text-base text-center">
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
                  <span className="px-1 text-white/80 font-light text-base text-center">
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
                  <span className="px-1 text-white/80 font-light text-base text-center">
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
                  <span className="px-1 text-white/80 font-light text-base text-center">
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
            className="aspect-[554/713] flex-1 mb-5 md:mb-0"
          ></div>
        </div>
      </section>
    </section>
  );
};

export default PepsiLandingPage;
