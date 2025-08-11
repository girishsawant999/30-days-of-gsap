import { useEffect, useState } from "react";

function useMediaLoaded(selector: string = "img, video, audio"): boolean {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const elements: NodeListOf<
      HTMLImageElement | HTMLVideoElement | HTMLAudioElement
    > = document.querySelectorAll(selector);

    const loadPromises: Promise<void>[] = Array.from(elements).map((el) => {
      return new Promise<void>((resolve) => {
        if (el.tagName === "IMG") {
          const img = el as HTMLImageElement;
          if (img.complete) return resolve();
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        } else if (el.tagName === "VIDEO" || el.tagName === "AUDIO") {
          const media = el as HTMLMediaElement;
          if (media.readyState >= 3) return resolve();
          media.addEventListener("canplaythrough", () => resolve(), {
            once: true,
          });
          media.addEventListener("error", () => resolve(), { once: true });
        } else {
          resolve();
        }
      });
    });

    Promise.all(loadPromises).then(() => setIsLoaded(true));
  }, [selector]);

  return isLoaded;
}

export default useMediaLoaded;
