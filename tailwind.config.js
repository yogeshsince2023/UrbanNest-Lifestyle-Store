/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--color-paper, #EDEAE1)",
        ink: "var(--color-ink, #26261F)",
        moss: {
          DEFAULT: "var(--color-moss, #5C6B4F)",
          dark: "var(--color-moss-dark, #45513A)",
          light: "var(--color-moss-light, #768666)",
        },
        clay: {
          DEFAULT: "var(--color-clay, #B5652D)",
          dark: "var(--color-clay-dark, #964F20)",
          light: "var(--color-clay-light, #CE7C44)",
        },
        brass: {
          DEFAULT: "var(--color-brass, #A98544)",
          dark: "var(--color-brass-dark, #8D6E34)",
          light: "var(--color-brass-light, #C39F5D)",
        },
        cloud: "var(--color-cloud, #F7F5EF)",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Work Sans", "system-ui", "sans-serif"],
        sans: ["Work Sans", "system-ui", "sans-serif"],
        utility: ["Space Mono", "monospace"],
        mono: ["Space Mono", "monospace"],
      },
      borderRadius: {
        parcel: "0.875rem",
        tag: "0.375rem",
      },
      boxShadow: {
        parcel: "var(--shadow-parcel, 0 10px 30px -10px rgba(38, 38, 31, 0.08))",
        "parcel-hover": "var(--shadow-parcel-hover, 0 20px 40px -15px rgba(38, 38, 31, 0.15))",
        peel: "var(--shadow-peel, 2px 2px 0 0 rgba(38, 38, 31, 0.08))",
      },
    },
  },
  plugins: [],
};
