/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1DA1F2', // Example primary color (Twitter blue)
                secondary: '#FFD700', // Example secondary color (Gold)
            },
        },
    },
    plugins: [],
}