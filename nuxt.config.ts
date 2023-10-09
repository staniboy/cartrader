// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image-edge",
    "@vueuse/nuxt",
    "@vee-validate/nuxt",
    "@nuxtjs/supabase",
    "nuxt-icon",
  ],
  routeRules: {
    // Use client-side rendering for all routes
    "/**": { ssr: false },
  },
});
