// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["vuetify/lib/styles/main.sass"],
  build: {
    transpile: ["vuetify"],
  },
  modules: ["@pinia/nuxt"],
  runtimeConfig: {
    deeplApiKey: "",
  },
  app: {
    // TODO: Social previews
    head: {
      title: "MDR Translator",
      link: [{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }],
    },
  },
});
