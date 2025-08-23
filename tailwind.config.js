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
        'cyber-blue': '#2B6CB0',  // Primary security blue
        'safe-green': '#00AA44',
        'alert-red': '#DC143C',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'cyber-pulse': 'cyberPulse 2s ease-in-out infinite',
        'secure-bounce': 'secureBounce 1s ease-in-out infinite',
        'button-pulse': 'buttonPulse 1.5s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        cyberPulse: {
          '0%': { 
            boxShadow: '0 0 0 0 rgba(43, 108, 176, 0.4)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 20px 10px rgba(43, 108, 176, 0.1)',
            transform: 'scale(1.02)'
          },
          '100%': { 
            boxShadow: '0 0 0 0 rgba(43, 108, 176, 0)',
            transform: 'scale(1)'
          },
        },
        secureBounce: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-8px)' },
          '60%': { transform: 'translateY(-4px)' },
        },
        buttonPulse: {
          '0%': { boxShadow: '0 0 0 0 rgba(135, 206, 235, 0.4)' },
          '70%': { boxShadow: '0 0 0 10px rgba(135, 206, 235, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(135, 206, 235, 0)' },
        },
      },
    },
  },
  plugins: [],
}