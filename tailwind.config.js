/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    fontFamily: {
      "Poppins": ["Poppins"]
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        // ### Primary

        "Purple": 'hsl(259, 100%, 65%)',
        "Light-red": 'hsl(0, 100%, 67%)',

        // ### Neutral
        "White": 'hsl(0, 0%, 100%)',
        "Off-white": 'hsl(0, 0%, 94%)',
        "Light-grey": 'hsl(0, 0%, 86%)',
        "Smokey-grey": 'hsl(0, 1%, 44%)',
        "Off-black": 'hsl(0, 0%, 8%)'
      }
    },
  },
  plugins: [],
}

