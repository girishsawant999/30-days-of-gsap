"use client";
import gsap from "gsap";
import { RotateCw } from "lucide-react";
import { useRef } from "react";

const ReloadButton = ({ onReload }: { onReload: () => void }) => {
  const iconRef = useRef(null);

  const toggle = () => {
    const tl = gsap.timeline();
    tl.to(iconRef.current, {
      rotate: 90,
      duration: 0.2,
      ease: "power2.in",
      onComplete() {
        onReload();
      },
    }).to(iconRef.current, {
      rotate: 0,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  return (
    <button
      className="bg-zinc-200 dark:bg-zinc-800 rounded-md p-1.5 cursor-pointer hover:opacity-80 transition-opacity"
      aria-label="Reload animation"
      onClick={toggle}
    >
      <RotateCw ref={iconRef} size={24} />
    </button>
  );
};

export default ReloadButton;
