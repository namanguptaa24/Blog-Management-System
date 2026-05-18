/** @type {import('tailwindcss').Config} */
// darkMode: "class",
module.exports = {

  content: [

    "./src/**/*.{js,jsx,ts,tsx}",

  ],

  theme: {

    extend: {},

  },

  plugins: [],

}
module.exports = {

   darkMode:"class",

   content:[

      "./src/**/*.{js,jsx,ts,tsx}"

   ],

   theme:{

      extend:{},

   },

   plugins:[

      require("@tailwindcss/typography")

   ],

}