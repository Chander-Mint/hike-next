/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marqueeReverse 30s linear infinite",
        sparkle1: "sparkle1 1s ease-out forwards",
        sparkle2: "sparkle2 1.2s ease-out forwards",
        sparkle3: "sparkle3 1.3s ease-out forwards",
        sparkle4: "sparkle4 1.1s ease-out forwards",
        sparkle5: "sparkle5 1.4s ease-out forwards",
        sparkle6: "sparkle6 1.2s ease-out forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        sparkle1: {
          "0%": { transform: "translate(0, 0)", opacity: 1 },
          "100%": { transform: "translate(-50px, -50px)", opacity: 0 },
        },
        sparkle2: {
          "0%": { transform: "translate(0, 0)", opacity: 1 },
          "100%": { transform: "translate(50px, -60px)", opacity: 0 },
        },
        sparkle3: {
          "0%": { transform: "translate(0, 0)", opacity: 1 },
          "100%": { transform: "translate(-30px, -80px)", opacity: 0 },
        },
        sparkle4: {
          "0%": { transform: "translate(0, 0)", opacity: 1 },
          "100%": { transform: "translate(60px, -40px)", opacity: 0 },
        },
        sparkle5: {
          "0%": { transform: "translate(0, 0)", opacity: 1 },
          "100%": { transform: "translate(-40px, -60px)", opacity: 0 },
        },
        sparkle6: {
          "0%": { transform: "translate(0, 0)", opacity: 1 },
          "100%": { transform: "translate(30px, -90px)", opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
