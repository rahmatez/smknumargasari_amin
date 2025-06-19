import daisyui from "./node_modules/daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6148FF",
          dark: "#4F3BD4",
          light: "#7B6AFB",
          50: "#F2F0FF",
          100: "#E4E0FF",
          200: "#C9C1FF",
          300: "#AEA1FF",
          400: "#9483FF",
          500: "#6148FF",
          600: "#4F3BD4",
          700: "#3D2EAC",
          800: "#2C2184",
          900: "#1A1563",
        },
        secondary: {
          DEFAULT: "#EBF3FC",
          dark: "#D7E5F7",
        },
        darkblue: "#6148FF",
        check: {
          100: `#6148FF`,
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 10px rgba(97, 72, 255, 0.1)",
        "card-hover": "0 5px 15px rgba(97, 72, 255, 0.15)",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#6148FF",
          secondary: "#EBF3FC",
          accent: "#4F3BD4",
          "primary-focus": "#4F3BD4",
        },
      },
    ],
  },
  plugins: [
    daisyui,
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
        },
        ".scrollbar-thumb-rounded": {
          scrollbarWidth: "thin",
          scrollbarColor: "#6148FF transparent",
        },
        // Line clamp utilities
        ".line-clamp-1": {
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "1",
        },
        ".line-clamp-2": {
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "2",
        },
        ".line-clamp-3": {
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "3",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
