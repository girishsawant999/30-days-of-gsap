export const code = `// 1. Register the plugin
gsap.registerPlugin(SplitText);

// 2. Split the heading text into words and characters
const headingSplit = SplitText.create("h1", {
  type: "words, chars",
});

// 3. Animate each character individually
gsap.from(headingSplit.chars, {
  y: 50,
  opacity: 0,
  stagger: 0.05,
  ease: "back.out(1.7)"
});`;
