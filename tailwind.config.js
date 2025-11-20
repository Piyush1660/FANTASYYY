/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Street Brutal Design System
        'street': {
          'black': '#0A0A0A',         // Pure black - main background
          'asphalt': '#1A1A1A',       // Dark asphalt
          'concrete': '#2D2D2D',      // Concrete gray
          'metal': '#404040',         // Metal gray
          'dust': '#888888',          // Street dust
          'white': '#E8E8E8',         // Dirty white
          'cream': '#F4F4E8',         // Old paper/cream
        },
        'gang': {
          'green': '#4A7C4E',         // Money green
          'gold': '#D4AF37',          // Gold chain
          'red': '#C41E3A',           // Blood red
          'orange': '#FF6B35',        // Sunset orange
          'purple': '#6B46C1',        // Saints purple
        },
        'spray': {
          'yellow': '#FFD700',        // Spray paint yellow
          'pink': '#FF1493',          // Tag pink
          'blue': '#1E90FF',          // Electric blue
          'lime': '#32CD32',          // Neon lime
        },
        'status': {
          'online': '#4A7C4E',        // Money green
          'offline': '#8B0000',       // Dark red
          'warning': '#FFA500',       // Warning orange
        },
        // Gritty overlay colors
        'overlay': {
          'dark': 'rgba(0, 0, 0, 0.8)',
          'smoke': 'rgba(0, 0, 0, 0.6)',
          'haze': 'rgba(0, 0, 0, 0.4)',
          'dust': 'rgba(136, 136, 136, 0.1)',
        }
      },
      fontFamily: {
        'stencil': ['Bebas Neue', 'sans-serif'],      // Stencil/military style
        'street': ['Oswald', 'sans-serif'],           // Street/urban headers
        'body': ['Roboto', 'sans-serif'],             // Body text
        'tag': ['Permanent Marker', 'cursive'],       // Graffiti style
        'stamp': ['Courier New', 'monospace'],        // Typewriter/stamp
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'progress': 'progress 2s ease-out',
        'float-smooth': 'floatSmooth 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'wave': 'wave 3s ease-in-out infinite',
        'gradient-flow': 'gradientFlow 8s ease infinite',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'morph': 'morph 10s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        floatSmooth: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.8)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
        },
        gradientFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
      },
      backgroundImage: {
        'street-gradient': 'linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)',
        'asphalt': 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
        'graffiti-overlay': 'linear-gradient(45deg, transparent 30%, rgba(212, 175, 55, 0.1) 50%, transparent 70%)',
        'concrete-texture': 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)',
        'chain-link': 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 11px), repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 11px)',
      },
      boxShadow: {
        'brutal': '8px 8px 0px rgba(0, 0, 0, 1)',
        'brutal-sm': '4px 4px 0px rgba(0, 0, 0, 1)',
        'brutal-lg': '12px 12px 0px rgba(0, 0, 0, 1)',
        'street': '0 4px 20px rgba(0, 0, 0, 0.8)',
        'neon': '0 0 20px rgba(212, 175, 55, 0.5), inset 0 0 20px rgba(212, 175, 55, 0.1)',
        'graffiti': '2px 2px 4px rgba(0, 0, 0, 0.8), 4px 4px 8px rgba(0, 0, 0, 0.6)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}