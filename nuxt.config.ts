// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@primevue/nuxt-module',
    '@storyblok/nuxt',
    '@nuxt/image',
    '@nuxt/fonts',
    'nuxt-svgo',
    '@hypernym/nuxt-gsap',
  ],

  plugins: [],
  build: {
    transpile: ['gsap'],
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  css: ['~/assets/css/main.css'],
  fonts: {
    experimental: {
      processCSSVariables: true,
    },
  },
  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './'), // Map '~' to the root of the project
      },
    },
    plugins: [tailwindcss()],
  },
  gsap: {
    extraPlugins: {
      scrollTrigger: true,
      text: true,
    },
  },
  svgo: {
    autoImportPath: './assets/icons',
    componentPrefix: 'Icons',
  },
  storyblok: {
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
    bridge: true,
    devtools: true,
  },
  hub: {
    ai: true,
  },
});

