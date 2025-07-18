"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";
import { LenisRef, ReactLenis } from "lenis/react";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const SmoothScrollWrapper = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<LenisRef | null>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      {children}
    </>
  );
};

export default SmoothScrollWrapper;
