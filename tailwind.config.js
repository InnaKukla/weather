module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        rain: {
          '0%': { 'background-position': '0 0' },
          '100%': { 'background-position': '0 100%' },
        },
      },
      animation: {
        rain: 'rain 1s linear infinite',
      },
    },
  },
  plugins: [],
}