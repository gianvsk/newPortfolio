export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@storyblok/nuxt',
    '@nuxt/image',
    '@nuxt/fonts',
    'nuxt-svgo',
    '@hypernym/nuxt-gsap',
  ],

  ssr: true,

  build: {
    transpile: ['gsap'],
  },

  components: [
    {
      path: '~/components/',
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

  vite: {
    optimizeDeps: { include: ['gsap'] },
  },

  storyblok: {
    accessToken:
      process.env.iS_PRODUCTION === 'true'
        ? process.env.STORYBLOK_ACCESS_TOKEN_PUBLIC
        : process.env.STORYBLOK_ACCESS_TOKEN,
    bridge: true,
    devtools: true,
  },

  image: {
    storyblok: {
      baseURL: 'https://a.storyblok.com',
    },
  },

  nitro: {
    experimental: {
      openAPI: true,
    },
    compressPublicAssets: true,
  },
  compatibilityDate: '2025-02-17',
});

