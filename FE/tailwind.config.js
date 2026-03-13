/** @type {import('tailwindcss').Config} */
export default {
 content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' }, // Chạy lên một nửa danh sách (danh sách nhân đôi)
        }
      },
      animation: {
        'slide-up': 'slide-up 15s linear infinite',
      }
    },
  },
  plugins: [],
}

