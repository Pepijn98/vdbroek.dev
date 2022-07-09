/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./components/**/*.{vue,js,jsx,ts,tsx}",
        "./layouts/**/*.{vue,js,jsx,ts,tsx}",
        "./pages/**/*.{vue,js,jsx,ts,tsx}",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}"
    ],
    theme: {
        extend: {}
    },
    plugins: []
};
