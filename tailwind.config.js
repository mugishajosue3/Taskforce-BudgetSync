/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Custom Colors
      colors: {
        primary: '#1D4ED8', // Deep blue
        secondary: '#9333EA', // Purple
        success: '#16A34A', // Green
        warning: '#F59E0B', // Amber
        danger: '#DC2626', // Red
        neutral: '#6B7280', // Gray
      },

      // Custom Screens (Breakpoints)
      screens: {
        xs: '475px', // Extra Small screens
        sm: '640px', // Small
        md: '768px', // Medium
        lg: '1200px', // Large
        xl: '1280px', // Extra Large
        '2xl': '1536px', // Extra Extra Large
      },

      // Custom Fonts
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['Courier New', 'monospace'],
      },

      // Custom Spacing
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
      },

      // Custom Border Radius
      borderRadius: {
        '4xl': '2rem',
      },

      // Custom Box Shadows
      boxShadow: {
        custom: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },

      // Custom Animation
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },

      // Keyframes
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'), // For styling forms
    // require('@tailwindcss/typography'), // For better typography
    // require('@tailwindcss/aspect-ratio'), // For aspect ratios
  ],
};
