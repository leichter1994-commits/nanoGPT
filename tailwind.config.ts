import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e9f7ff',
          100: '#d4efff',
          200: '#aae0ff',
          300: '#7ccfff',
          400: '#45b8ff',
          500: '#009ee3',
          600: '#007dc4',
          700: '#005f96',
          800: '#0c4468',
          900: '#102f45'
        }
      },
      boxShadow: {
        soft: '0 20px 45px -24px rgba(16, 47, 69, 0.35)'
      }
    }
  },
  plugins: []
};

export default config;
