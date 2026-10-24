/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        'junge': ['Junge', 'serif'],
        'bree-serif': ['"Bree Serif"', 'serif'],
        'ledger': ['Ledger', 'serif'],
        'neuton': ['Neuton', 'serif']
      },
      blur:{
        '1': '1px',
        '2': '2px',
        '3': '3px'
      },
      fontSize:{
      '16': [
        '16px', {
          lineHeight:'20px',
          letterSpacing:'0.5px',
        }
      ],
      '18': [
        '18px', {
          lineHeight:'26px',
          //letterSpacing:'0.5px',
        }
      ],
      '20': [
        '20px', {
          lineHeight:'24px',
          letterSpacing:'0.5px',
        }
      ],
      '22': [
        '22px', {
          lineHeight:'26px',
          letterSpacing:'0.5px',
        }
      ],
      '24': [
        '24px', {
          lineHeight:'28px',
          letterSpacing:'0.6px',
        }
      ],
      '32': [
        '32px', {
          lineHeight:'36px',
          letterSpacing:'0.6px',
        }
      ],
      '36': [
        '36px', {
          lineHeight:'40px',
          letterSpacing:'0.6px',
        }
      ],
      '44': [
        '44px', {
          lineHeight:'48px',
          letterSpacing:'0.6px',
        }
      ],
      '48': [
        '48px', {
          lineHeight:'52px',
          letterSpacing:'0.7px',
        }
      ],
      '56': [
        '56px', {
          lineHeight:'60px',
          letterSpacing:'0.8px',
        }
      ],
      '72': [
        '72px', {
          lineHeight:'76px',
          letterSpacing:'1px',
        }
      ],
      '86': [
        '86px', { 
          lineHeight:'100px',
          letterSpacing:'1.2px',
        }
      ]
      },
      colors: {
        headlinesColor: 'rgba(71, 72, 83, 1)'
      },
      textShadow:{
        'custom-medium': '4px 5px 5px rgba(0, 0, 0, 0.5)'
      },
      boxShadow:{
         'custom-heavy':'10px 10px 10px rgba(0, 0, 0, 0.9)'
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
}

