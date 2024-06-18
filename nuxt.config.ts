// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/google-fonts", "@nuxtjs/tailwindcss", '@vee-validate/nuxt'],
  css: ['~/assets/css/globals.scss'],
  googleFonts: {
    families: {
      Poppins: ['400', '700', '800'],
    },
  },
});