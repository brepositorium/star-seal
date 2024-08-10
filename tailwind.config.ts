import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    borderRadius: {
      sm: "2px",
      md: "6px",
      lg: "8px",
      xl: "12px",
      large: "28px",
    },
    extend: {
      colors: {
        primary: "#2880BB",
        secondary: "#DCB44A",
      },
      fontFamily: {
        poppins: ["poppins", "sans-serif"],
        pacifico: ["pacifico", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
