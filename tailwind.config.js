module.exports = {
  daisyui: {
    themes: ["dark"],
  },
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",

  ],
  theme: {
    extend: {},
  },
  plugins: [ require('flowbite-react')],
}