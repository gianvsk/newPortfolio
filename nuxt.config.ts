// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@primevue/nuxt-module',
    '@storyblok/nuxt',
    '@nuxt/image',
    '@tresjs/nuxt',
    '@nuxt/fonts',
  ],
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
    plugins: [tailwindcss()],
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

