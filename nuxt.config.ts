// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
    ],
    css: [
        "~/assets/css/main.css"
    ],
    nitro: {
        externals: {
            inline: ['uuid']
        }
    }
})
