import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

const CodeBlock = ({ code }: { code: React.ReactNode }) => {
  let animating = false;
  const onCopy = () => {
    if (animating) return;
    if (
      window.navigator &&
      window.navigator.clipboard &&
      window.isSecureContext &&
      typeof code === "string"
    ) {
      animating = true;
      gsap.to("#copy-icon", {
        duration: 0.4,
        repeatDelay: 0.4,
        morphSVG: {
          shape: "#check-icon",
          type: "rotational",
        },
        ease: "power2.out",
        repeat: 1,
        yoyo: true,

        onComplete: () => {
          navigator.clipboard.writeText(code);
          animating = false;
        },
      });
    }
  };
  return (
    <pre className="bg-background text-foreground p-4 rounded text-sm overflow-auto mb-6 relative">
      {typeof code === "string" && (
        <button
          onClick={onCopy}
          className="absolute top-2 right-2 rounded-md p-1 bg-gray-300 dark:bg-gray-700 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path
              id="copy-icon"
              d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"
            ></path>

            <path
              className="hidden"
              id="check-icon"
              d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"
            ></path>
          </svg>
        </button>
      )}
      <code>{code}</code>
    </pre>
  );
};

export default CodeBlock;
