import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      colors: {
        // Coffee-themed color palette
        cream: {
          50: '#F9F8F6',  // Lightest cream
          100: '#EFE9E3', // Light cream
          200: '#D9CFC7', // Medium cream
          300: '#C9B59C', // Warm cream/tan
        },
        // Semantic color names for easier usage
        primary: {
          light: '#F9F8F6',
          DEFAULT: '#EFE9E3',
          dark: '#C9B59C',
        },
        secondary: {
          light: '#D9CFC7',
          DEFAULT: '#C9B59C',
        },
      },
      backgroundColor: {
        base: '#F9F8F6',
        elevated: '#EFE9E3',
      },
      textColor: {
        base: '#2D2D2D', // Dark text for readability (you can adjust this)
        muted: '#6B6B6B',
      },
      borderColor: {
        default: '#D9CFC7',
        light: '#EFE9E3',
      },
    },
  },
  plugins: [],
};

export default config;
