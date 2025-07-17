import gsap from "gsap";
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
        router.back();
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
      <svg
        ref={iconRef}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <path d="M228,128a12,12,0,0,1-12,12H69l51.52,51.51a12,12,0,0,1-17,17l-72-72a12,12,0,0,1,0-17l72-72a12,12,0,0,1,17,17L69,116H216A12,12,0,0,1,228,128Z"></path>
      </svg>
    </button>
  );
};

export default BackButton;
