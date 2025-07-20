"use client";
import gsap from "gsap";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const BackButton = () => {
  const router = useRouter();
  const iconRef = useRef(null);

  const toggle = () => {
    const tl = gsap.timeline();
    tl.to(iconRef.current, {
      x: -90,
      duration: 0.2,
      ease: "power2.in",
      onComplete() {
        router.push("/");
      },
    }).to(iconRef.current, {
      x: 0,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  return (
    <button
      className="bg-zinc-200 dark:bg-zinc-800 rounded-md p-1.5 cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
      aria-label="Reload animation"
      onClick={toggle}
    >
      <MoveLeft ref={iconRef} size={24} />
    </button>
  );
};

export default BackButton;
