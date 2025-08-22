/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Indian Flag Colors - Primary
        'saffron': '#FF9933',
        'white': '#FFFFFF',
        'indian-green': '#138808',
        
        // Traditional Indian Colors
        'deep-saffron': '#FF7722',
        'turmeric': '#E09900',
        'marigold': '#FFAB00',
        'henna': '#B85450',
        'terracotta': '#C65D07',
        
        // Sacred & Cultural Colors
        'lotus-pink': '#F8BBD9',
        'peacock-blue': '#005F69',
        'indigo-blue': '#4B0082',
        'royal-purple': '#663399',
        'sandalwood': '#DEB887',
        
        // Nature & Heritage Colors
        'forest-green': '#228B22',
        'mango-yellow': '#FFCC5C',
        'rose-gold': '#E8B4B8',
        'coral-red': '#FF6B6B',
        'ivory': '#FFFFF0',
        
        // Modern Indian Tech Colors
        'digital-orange': '#FF6600',
        'tech-blue': '#0066CC',
        'safe-green': '#00AA44',
        'alert-red': '#DC143C',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'hindi': ['Noto Sans Devanagari', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}