"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const InformationBlockWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const block = useRef(null);

  useGSAP(() => {
    gsap.from(block.current, {
      opacity: 0,
      x: 500,
      duration: 0.3,
      ease: "power2.inOut",
    });
  });
  return (
    <div
      ref={block}
      className="p-4 information-section bg-zinc-200 dark:bg-zinc-800 rounded-lg place-self-stretch overflow-y-auto no-scrollbar"
    >
      {children}
    </div>
  );
};

export default InformationBlockWrapper;
