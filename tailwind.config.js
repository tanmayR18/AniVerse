/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
      ],
  theme: {
    fontFamily:{
        poppins: ["Poppins","Arial"]
    },
    colors: {
        richblack:{
            40: "#2F2F33",
            50: "#242428",
            80: "#121315",
            90: "#121315"
        },
        richwhite:{
            100: "#FFFFFF",
            50: "#ccc",
            10: "rgba(255,255,255,0.101)",
            5: "#91AAA0"
        },
        richyellow:{
            50: "#FFDD78",
            40: "#FFDD95"
        }
    }
  },
  plugins: [],
}

