"use client";
import BackButton from "@/components/BackButton";
import ScrollToExplore from "@/components/ScrollToExplore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const QUOTES = [
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    quote: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  {
    quote: "Stay hungry, stay foolish.",
    author: "Steve Jobs",
  },
  {
    quote:
      "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    quote: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
  },
  {
    quote: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
  {
    quote: "Be the change you wish to see in the world.",
    author: "Mahatma Gandhi",
  },
  {
    quote: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
  {
    quote: "I have a dream that one day this nation will rise up.",
    author: "Martin Luther King Jr.",
  },
  {
    quote:
      "The biggest adventure you can take is to live the life of your dreams.",
    author: "Oprah Winfrey",
  },
  {
    quote: "Your most unhappy customers are your greatest source of learning.",
    author: "Bill Gates",
  },
  {
    quote:
      "When something is important enough, you do it even if the odds are not in your favor.",
    author: "Elon Musk",
  },
  {
    quote: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
  {
    quote:
      "We delight in the beauty of the butterfly, but rarely admit the changes it has gone through.",
    author: "Maya Angelou",
  },
];

const COLORS = [
  "#3b1513", // dark red-brown
  "#2d1b3d", // deep purple
  "#1a2f3a", // dark teal
  "#3d2b1f", // dark chocolate
  "#1f3d2b", // forest green
  "#3a1a2f", // burgundy
  "#2b3d1f", // olive
  "#1f2b3d", // navy
  "#3d1f2b", // maroon
  "#2f3a1a", // moss
  "#1b2d3d", // midnight blue
  "#3d2f1a", // umber
  "#2b1f3d", // indigo
  "#1a3d2f", // dark emerald
];

const Day16 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const horizontal = horizontalRef.current;

    if (!container || !horizontal) return;

    const scrollWidth = horizontal.scrollWidth - window.innerWidth;

    gsap.to(horizontal, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: 0,
        pin: true,
        anticipatePin: 1,
        snap: {
          snapTo: 1 / (QUOTES.length - 1),
          duration: { min: 0.1, max: 0.3 },
          ease: "power1.inOut",
        },
      },
    });
  });

  return (
    <section
      ref={containerRef}
      className="min-h-dvh bg-background text-foreground overflow-hidden"
    >
      <div className="fixed flex items-center gap-3 top-5 md:top-10 left-5 md:left-10 z-10">
        <BackButton />
      </div>
      <ScrollToExplore />
      <div
        ref={horizontalRef}
        id="horizontal-scroll"
        className="bg-background text-foreground flex h-screen"
      >
        {QUOTES.map((item, index) => (
          <div
            key={index}
            style={{ backgroundColor: COLORS[index % COLORS.length] }}
            className="min-w-[100vw] h-screen w-full flex flex-col items-center justify-center px-8 md:px-16 lg:px-32 shrink-0 text-white"
          >
            <p className="text-2xl md:text-4xl lg:text-5xl font-light text-center leading-relaxed max-w-4xl">
              "{item.quote}"
            </p>
            <p className="mt-8 text-lg md:text-xl text-white/60 font-medium">
              — {item.author}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Day16;
