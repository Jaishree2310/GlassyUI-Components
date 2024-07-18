module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
    },
  },
  variants: {
    extend: {
      backdropFilter: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}



