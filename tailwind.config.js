/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
      ],
  theme: {
    fontFamily:{
        poppins: ["Poppins","Arial"]
    },
    colors: {
        richblack:{
            5: "#3A3A3E",
            10: "rgba(0, 0, 0, 0.15)",
            20: "rgba(36,36,41,0.8)",
            30: "#757575",
            40: "#2F2F33",
            50: "#242428",
            80: "#121315",
            90: "#121315"
        },
        richwhite:{
            100: "#FFFFFF",
            50: "#ccc",
            20: "rgba(255,255,255,0.175)",
            10: "rgba(255,255,255,0.101)",
            5: "#91AAA0"
        },
        richyellow:{
            50: "#FFDD78",
            40: "#FFDD95",
            10: "rgba(249,218,153,0.08)"
        },
        socialMedia:{
            discord: "#6F85D5",
            telegram: "#0088CC",
            reddit: "#FF3C1F",
            twitter: "#1D9BF0"
        }
    },
    extend: {
        aspectRatio: {
          '3/5': '3 / 5',
        },
      }
  },
  plugins: [
  ],
}

