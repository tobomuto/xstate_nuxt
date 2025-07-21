// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss'
  ],
  imports: {
    dirs: [
      'machines', // Directory where your XState machines are located
    ],
  },
  fonts: {
    families: [
      { name: 'Marcellus', provider: 'google'}
    ]
  },
})