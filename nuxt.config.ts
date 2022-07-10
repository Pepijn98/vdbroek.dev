import { defineNuxtConfig } from "nuxt";

const lifecycle = process.env.npm_lifecycle_event;

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    meta: {
        title: "Pepijn van den Broek",
        meta: [
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: "Personal website" }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            { preload: true, prefetch: true, preconnect: true, rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" }
        ]
    },
    target: "static",
    runtimeConfig: {
        public: {
            ENV: process.env.ENV,
            SENTRY_DSN: process.env.SENTRY_DSN,
            GTAG: process.env.GTAG
        }
    },
    modules: [
        //! Google fonts doesn't work atm
        // "@nuxtjs/google-fonts"
    ],
    build: {
        transpile: lifecycle === "build" || lifecycle === "generate" ? ["element-plus"] : []
    },
    typescript: {
        strict: true,
        shim: false
    },
    components: true,
    //! Google fonts doesn't work atm
    // googleFonts: {
    //     prefetch: true,
    //     preconnect: true,
    //     preload: true,
    //     families: {
    //         Ubuntu: true,
    //         Roboto: true,
    //         "Open Sans": true
    //     }
    // },
    vueuse: {
        ssrHandlers: true
    },
    unocss: {
        uno: true,
        attributify: true,
        icons: {
            scale: 1.2
        },
        shortcuts: [
            [
                "btn",
                "px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50"
            ]
        ]
    }
});
