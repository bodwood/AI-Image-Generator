/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background-image-ai-app': "url('/images/background-image-ai-app.jpeg')",
      },
    },
    colors: {
      'bara-red': '#EC4E6E',
      'custom-white': '#FFFFFF',
    },
  },
  plugins: [],
};
