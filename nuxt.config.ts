import { join } from 'path';

export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    '@nuxthub/core',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@storyblok/nuxt',
    '@nuxt/image',
    '@nuxt/fonts',
    'nuxt-svgo',
    '@hypernym/nuxt-gsap',
  ],

  build: {
    transpile: ['gsap'],
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  gsap: {
    extraPlugins: {
      scrollTrigger: true,
      text: true,
    },
  },

  svgo: {
    autoImportPath: '~/assets/icons',
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
  compatibilityDate: '2025-02-17',
});

