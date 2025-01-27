import fontFamily from './configs/tailwind/fontFamily';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './my-nuxt-app/components/**/*.{ts,vue}',
    './my-nuxt-app/layouts/*.{ts,vue}',
    './my-nuxt-app/pages/**/*.{ts,vue}',
  ],
  theme: {
    extend: {
      fontFamily,
    },
  },
  plugins: [],
};

