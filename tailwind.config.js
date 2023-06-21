/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                jua: ["'Jua', sans-serif"],
                gb: ["'Gowun Batang', serif;"],
                suit: ["'SUIT', sans-serif;"],
            },
        },
    },
    plugins: [require('tailwind-scrollbar')({nocompatible: true})],
};
