import type { Config } from "tailwindcss";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const svgToDataUri = require("mini-svg-data-uri");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette").default;

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // shadcn semantic tokens (mapped to CSS variables in globals.css)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Najd AI Solutions brand palette (official Helol Najd guidelines: navy + blue)
        najd: {
          blue: "#2699d6",
          "blue-light": "#4db4e6",
          "blue-bright": "#0098dd",
          "blue-deep": "#0f6fae",
          indigo: "#28295f",
          teal: "#215877",
          navy: "#172844",
          "navy-2": "#1d3052",
          "navy-deep": "#0f1f38",
          ink: "#070e1b",
          "ink-2": "#0b1626",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-thmanyah)", "system-ui", "sans-serif"],
        arabic: ["var(--font-thmanyah)", "system-ui", "sans-serif"],
        display: ["var(--font-thmanyah)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "najd-gradient": "linear-gradient(135deg, #2699d6 0%, #0f6fae 52%, #172844 100%)",
        "najd-gradient-soft": "linear-gradient(135deg, #4db4e6 0%, #2699d6 100%)",
      },
      animation: {
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
        "meteor-effect": "meteor 5s linear infinite",
        move: "move 5s linear infinite",
        shimmer: "shimmer 2s linear infinite",
        spotlight: "spotlight 2s ease 0.75s 1 forwards",
        aurora: "aurora 60s linear infinite",
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        gradient: "gradient 8s linear infinite",
      },
      keyframes: {
        moveHorizontal: {
          "0%": { transform: "translateX(-50%) translateY(-10%)" },
          "50%": { transform: "translateX(50%) translateY(10%)" },
          "100%": { transform: "translateX(-50%) translateY(-10%)" },
        },
        moveInCircle: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        moveVertical: {
          "0%": { transform: "translateY(-50%)" },
          "50%": { transform: "translateY(50%)" },
          "100%": { transform: "translateY(-50%)" },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { transform: "rotate(215deg) translateX(-500px)", opacity: "0" },
        },
        move: {
          "0%": { transform: "translateX(-200px)" },
          "100%": { transform: "translateX(200px)" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%,-40%) scale(1)" },
        },
        aurora: {
          from: { backgroundPosition: "50% 50%, 50% 50%" },
          to: { backgroundPosition: "350% 50%, 350% 50%" },
        },
        scroll: {
          to: { transform: "translate(calc(-50% - 0.5rem))" },
        },
        gradient: {
          to: { backgroundPosition: "200% center" },
        },
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("tailwindcss-animate"),
    addVariablesForColors,
    // Aceternity background utilities (grid / dot patterns)
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='none' stroke='${value}'><path d='M0 .5H31.5V32'/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' fill='none' stroke='${value}'><path d='M0 .5H31.5V32'/></svg>`
            )}")`,
          }),
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none'><circle fill='${value}' id='pattern-circle' cx='10' cy='10' r='1.6257413380501518'></circle></svg>`
            )}")`,
          }),
          "bg-dot-thick": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none'><circle fill='${value}' id='pattern-circle' cx='10' cy='10' r='2.5'></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};

// Adds each Tailwind color as a global CSS variable (e.g. --najd-blue),
// required by several Aceternity components that read CSS custom properties.
function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
  addBase({ ":root": newVars });
}

export default config;
