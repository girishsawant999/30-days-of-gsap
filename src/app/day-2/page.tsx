"use client";
import BackButton from "@/components/BackButton";
import ScrollToExplore from "@/components/ScrollToExplore";
import { MODELS_IMAGES } from "@/constants/Models";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ScrollTriggerTutorial = () => {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: container.current,
        start: "clamp(top top)",
        end: `clamp(+=${window.innerHeight * 5}px)`,
        scrub: true,
        pin: true,
        pinSpacing: true,
        onUpdate: ({ progress, ...self }) => {
          if (!container.current) return;

          if (progress <= 0.25) {
            const headings = document.querySelectorAll(
              ".intro-section h1 span"
            );
            const rect = container.current.getBoundingClientRect();

            const distance = rect.width * progress * 5;
            gsap.to(headings[0], {
              x: -distance,
            });
            gsap.to(headings[1], {
              x: distance,
            });
            gsap.to(".bg-image img", {
              scale: gsap.utils.normalize(0, 0.245, progress),
              y: gsap.utils.mapRange(0, 0.25, 150, 0, progress),
              ease: "power2.out",
            });
          }
          if (progress > 0.25 && progress <= 0.6) {
            gsap.to(".introduction", {
              opacity: gsap.utils.mapRange(0.25, 0.3, 0, 1, progress),
            });

            gsap.from(".introduction h2", {
              opacity: gsap.utils.mapRange(0.28, 0.35, 0, 1, progress),
              y: gsap.utils.clamp(
                0,
                100,
                gsap.utils.mapRange(0.28, 0.34, 100, 0, progress)
              ),
            });

            gsap.to(".introduction p", {
              opacity: gsap.utils.mapRange(0.34, 0.4, 0, 1, progress),
            });
          }

          gsap.to(".contacts", {
            yPercent: gsap.utils.mapRange(0.6, 1, 0, -100, progress),
          });
          gsap.from(".contacts h3", {
            opacity: gsap.utils.mapRange(0.8, 0.9, 0, 1, progress),
          });

          gsap.from(".contacts p", {
            opacity: gsap.utils.mapRange(0.85, 0.95, 0, 1, progress),
            stagger: {
              amount: 0.2,
              from: self.direction === -1 ? "end" : "start",
            },
          });

          gsap.to(".bg-image img", {
            filter: `grayscale(${gsap.utils.mapRange(
              0.6,
              0.75,
              0,
              1,
              progress
            )})`,
          });
        },
      });
    },
    {
      scope: container,
    }
  );
  return (
    <div
      ref={container}
      className="place-self-stretch min-h-dvh relative grid place-items-center overflow-hidden"
    >
      <div className="absolute top-5 md:top-10 left-5 md:left-10 z-20">
        <BackButton />
      </div>

      <ScrollToExplore />

      <div className="introduction absolute bottom-10 md:static  opacity-0 z-10 px-5 ">
        <h2 className="text-4xl mb-3 md:text-8xl font-semibold font-sans text-white md:absolute bottom-10 left-10">
          Hi, I'm
          <br />
          Jennie Watson
        </h2>
        <p className="md:text-end leading-snug text-gray-400 text-lg md:text-xl font-light max-w-md mx-auto md:absolute top-10 right-10">
          I'm a model, a storyteller, and a canvas of creativity. With every
          step and pose, I express confidence, elegance, and the art of visual
          emotion. Join me as we unfold a journey of style, strength, and
          self-expression.
        </p>
      </div>

      <div className="bg-image absolute inset-0">
        <Image
          src={MODELS_IMAGES[0]}
          className="h-full w-full object-cover object-top scale-0"
          alt="Profile"
          width={2000}
          height={2000}
          quality={100}
          loading="eager"
        />
      </div>
      <div className="intro-section absolute">
        <h1 className="flex gap-1.5 text-3xl  md:text-6xl font-semibold font-sans">
          <span>Explore</span>
          <span>ScrollTrigger</span>
        </h1>
      </div>

      <div className="contacts min-h-dvh w-full bg-background/70 backdrop-blur-[3px] text-foreground absolute top-full left-0 z-10 grid place-items-center px-5 md:px-10">
        <div className="max-w-3xl w-full space-y-6">
          <h3 className="font-sans text-4xl md:text-7xl font-bold mb-6">
            Contacts
          </h3>
          <address className="flex flex-col gap-3 text-xl md:text-2xl leading-relaxed ">
            <p className="flex items-center gap-2.5 overflow-hidden">
              <Phone />
              +1 (555) 123-4567
            </p>
            <p className="flex items-center gap-2.5 overflow-hidden">
              <Mail /> Jennie.watson@gmail.com
            </p>
            <p className="flex items-center gap-2.5 overflow-hidden">
              <MapPin /> 123 Main Street, Anytown USA
            </p>
          </address>
        </div>
      </div>
    </div>
  );
};

export default ScrollTriggerTutorial;
