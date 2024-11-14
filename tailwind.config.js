/** @type {(tailwindConfig: object) => object} */
// const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./public/index.html",
  ],
  // corePlugins: {
  //   preflight: false,
  // },
  // important: '#root',
  purge: ["./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
    ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    screens: { lg: { max: "1440px" }, md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        amber: { 500: "var(--amber_500)" },
        black: { 900: "var(--black_900)", "900_01": "var(--black_900_01)", "900_3f": "var(--black_900_3f)" },
        blue: {
          400: "var(--blue_400)",
          700: "var(--blue_700)",
          a100_54: "var(--blue_a100_54)",
          a400: "var(--blue_a400)",
          a700: "var(--blue_a700)",
        },
        blue_gray: {
          100: "var(--blue_gray_100)",
          400: "var(--blue_gray_400)",
          800: "var(--blue_gray_800)",
          900: "var(--blue_gray_900)",
          "100_4c": "var(--blue_gray_100_4c)",
          "400_01": "var(--blue_gray_400_01)",
          "900_01": "var(--blue_gray_900_01)",
          "900_4c": "var(--blue_gray_900_4c)",
        },
        deep_purple: { a100: "var(--deep_purple_a100)" },
        gray: {
          50: "var(--gray_50)",
          100: "var(--gray_100)",
          200: "var(--gray_200)",
          300: "var(--gray_300)",
          400: "var(--gray_400)",
          500: "var(--gray_500)",
          600: "var(--gray_600)",
          800: "var(--gray_800)",
          900: "var(--gray_900)",
          "100_00": "var(--gray_100_00)",
          "100_01": "var(--gray_100_01)",
          "100_59": "var(--gray_100_59)",
          "200_01": "var(--gray_200_01)",
          "50_01": "var(--gray_50_01)",
          "600_75": "var(--gray_600_75)",
          "900_01": "var(--gray_900_01)",
        },
        green: {
          800: "var(--green_800)",
          900: "var(--green_900)",
          "800_01": "var(--green_800_01)",
          a700: "var(--green_a700)",
        },
        indigo: {
          "400_7f": "var(--indigo_400_7f)",
          "50_a0": "var(--indigo_50_a0)",
          a100: "var(--indigo_a100)",
          a100_01: "var(--indigo_a100_01)",
          a200: "var(--indigo_a200)",
          a700: "var(--indigo_a700)",
          a700_01: "var(--indigo_a700_01)",
        },
        light_blue: { a200: "var(--light_blue_a200)", a700: "var(--light_blue_a700)" },
        light_green: { 300: "var(--light_green_300)", 900: "var(--light_green_900)", a700: "var(--light_green_a700)" },
        lime: { 300: "var(--lime_300)" },
        pink: { 300: "var(--pink_300)", 700: "var(--pink_700)", a100: "var(--pink_a100)" },
        purple: { 700: "var(--purple_700)" },
        white: { a700: "var(--white_a700)" },
        yellow: { 500: "var(--yellow_500)", 800: "var(--yellow_800)" },
      },
      boxShadow: { bs: "inset 0 4px 4px 0 #0000003f" },
      backgroundImage: {
        gradient: "linear-gradient(180deg, #ffffff,#96adf1,#1145e0)",
        gradient1: "linear-gradient(90deg, #536bb57f,#f8f5f500)",
      },
      fontFamily: { helvetica: "Helvetica", inter: "Inter" },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}

