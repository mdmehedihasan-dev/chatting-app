/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C0FDFC',
        secondary:'#3FDBF0',
        Tertiary:'#78ACF1',
        quaternary:'#10029A',
        quinary:'#F932CF',
        logbg:'#F78CB9',
        chat:"#D9E1FF",
        perfect:"#6044fc",
      },
      maxWidth: {
        400:'400px',
        500: '500px',
        600:'600px',
      },
      spacing: {
        80: '80px',
        300:'300px',
        500:'500px',
      },




    },
  },
  plugins: [],
}