import { NuxtConfig } from "@nuxt/types";
import settings from "./settings";

const config: NuxtConfig = {
    ssr: false,
    generate: {
        fallback: "404.shtml"
    },
    router: {
        // trailingSlash: false,
        prefetchLinks: true
    },
    head: {
        title: "Pepijn van den Broek",
        htmlAttrs: {
            lang: "en"
        },
        meta: [
            { "http-equiv": "X-UA-Compatible", property: "http-equiv", content: "IE=edge" },
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },

            { hid: "author", name: "author", content: "Pepijn van den Broek" },
            { hid: "description", name: "description", content: "Personal portfolio website" },

            { hid: "theme-color", name: "theme-color", content: "#990000" },

            { hid: "twitter-image-src", property: "twitter:image:src", content: `${settings.host}/static/images/logo-1200x1200.png` },
            { hid: "twitter-site", property: "twitter:site", content: settings.host },
            { hid: "twitter-card", property: "twitter:card", content: "summary" },
            { hid: "twitter-title", property: "twitter:title", content: "Projekt RED" },
            { hid: "twitter-description", property: "twitter:description", content: "Personal portfolio website" },

            { hid: "og-image", property: "og:image", content: `${settings.host}/static/images/logo-1200x1200.png` },
            { hid: "og-image-secure_url", property: "og:image:secure_url", content: `${settings.host}/static/images/logo-1200x1200.png` },
            { hid: "og-site_name", property: "og:site_name", content: "Projekt RED" },
            { hid: "og-type", property: "og:type", content: "website" },
            { hid: "og-title", property: "og:title", content: "Projekt RED" },
            { hid: "og-url", property: "og:url", content: settings.host },
            { hid: "og-description", property: "og:description", content: "Personal portfolio website" },
            { hid: "og-locale", property: "og:locale", content: "en" },

            { hid: "application-name", property: "application-name", content: "Projekt RED" },
            { hid: "fragment", property: "fragment", content: "!" },

            { hid: "apple-mobile-web-app-capable", property: "apple-mobile-web-app-capable", content: "yes" },

            { hid: "msapplication-TileColor", name: "msapplication-TileColor", content: "#990000" },
            { hid: "msapplication-TileImage", name: "msapplication-TileImage", content: `${settings.host}/static/icons/mstile-144x144.png` },
            { hid: "msapplication-square70x70logo", name: "msapplication-square70x70logo", content: `${settings.host}/static/icons/mstile-70x70.png` },
            { hid: "msapplication-square150x150logo", name: "msapplication-square150x150logo", content: `${settings.host}/static/icons/mstile-150x150.png` },
            { hid: "msapplication-wide310x150logo", name: "msapplication-wide310x150logo", content: `${settings.host}/static/icons/mstile-310x150.png` },
            { hid: "msapplication-square310x310logo", name: "msapplication-square310x310logo", content: `${settings.host}/static/icons/mstile-310x310.png` },
            { hid: "msapplication-config", property: "msapplication-config", content: `${settings.host}/static/icons/browserconfig.xml` }
        ],
        link: [
            { rel: "apple-touch-icon-precomposed", sizes: "57x57", href: "/static/icons/apple-touch-icon-57x57.png" },
            { rel: "apple-touch-icon-precomposed", sizes: "114x114", href: "/static/icons/apple-touch-icon-114x114.png" },
            { rel: "apple-touch-icon-precomposed", sizes: "72x72", href: "/static/icons/apple-touch-icon-72x72.png" },
            { rel: "apple-touch-icon-precomposed", sizes: "144x144", href: "/static/icons/apple-touch-icon-144x144.png" },
            { rel: "apple-touch-icon-precomposed", sizes: "60x60", href: "/static/icons/apple-touch-icon-60x60.png" },
            { rel: "apple-touch-icon-precomposed", sizes: "120x120", href: "/static/icons/apple-touch-icon-120x120.png" },
            { rel: "apple-touch-icon-precomposed", sizes: "76x76", href: "/static/icons/apple-touch-icon-76x76.png" },
            { rel: "apple-touch-icon-precomposed", sizes: "152x152", href: "/static/icons/apple-touch-icon-152x152.png" },
            { rel: "icon", type: "image/x-icon", href: "/static/icons/favicon.ico" },
            { rel: "icon", type: "image/png", href: "/static/icons/favicon-196x196.png", sizes: "196x196" },
            { rel: "icon", type: "image/png", href: "/static/icons/favicon-96x96.png", sizes: "96x96" },
            { rel: "icon", type: "image/png", href: "/static/icons/favicon-32x32.png", sizes: "32x32" },
            { rel: "icon", type: "image/png", href: "/static/icons/favicon-16x16.png", sizes: "16x16" },
            { rel: "icon", type: "image/png", href: "/static/icons/favicon-128.png", sizes: "128x128" },
            { rel: "shortcut icon", href: "/static/icons/favicon.ico" },
            { rel: "manifest", href: "/static/icons/manifest.json" },
            { rel: "mask-icon", href: "/static/icons/android-chrome-512x512.png", color: "#4B86B4" },
            { rel: "fluid-icon", href: "/static/icons/android-chrome-512x512.png", title: "Projekt RED" },

            // External links
            { rel: "stylesheet", href: "https://use.fontawesome.com/releases/v5.12.1/css/all.css", integrity: "sha384-v8BU367qNbs/aIZIxuivaU55N5GPF89WBerHoGA4QTcbUjYiLQtKdrfXnqAcXyTv", crossorigin: "anonymous" }
        ],
        script: [
            { src: "https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver", body: true }
        ],
        noscript: [
            { innerHTML: "This website requires JavaScript." }
        ]
    },
    loading: { color: "#990000" },
    css: [
        "@/assets/css/theme.scss"
    ],
    plugins: [
        "@/plugins/utils.ts",
        "@/plugins/components.ts"
    ],
    buildModules: [
        "@nuxt/typescript-build", // Doc: https://typescript.nuxtjs.org/
        "@nuxtjs/eslint-module", // Doc: https://github.com/nuxt-community/eslint-module
        "@nuxtjs/google-analytics",
        "@nuxtjs/stylelint-module" // Doc: https://github.com/nuxt-community/stylelint-module
    ],
    modules: [
        "@nuxtjs/axios", // Doc: https://axios.nuxtjs.org/usage
        "@nuxtjs/component-cache",
        "@nuxtjs/dotenv", // Doc: https://github.com/nuxt-community/dotenv-module
        "@nuxtjs/pwa",
        "@nuxtjs/sentry",
        "@nuxtjs/sitemap",
        "nuxt-buefy" // Doc: https://buefy.github.io/#/documentation
    ],
    sentry: settings.sentry, // Doc: https://github.com/nuxt-community/sentry-module#readme
    googleAnalytics: settings.google.analytics,
    stylelint: {
        files: ["**/*.{vue,css,less,scss,sass}"],
        syntax: "scss"
    },
    buefy: {
        defaultIconPack: "fas"
    },
    sitemap: {
        hostname: settings.host,
        gzip: true,
        defaults: {
            changefreq: "daily",
            priority: 1,
            lastmod: new Date(),
            lastmodrealtime: true
        }
    },
    axios: {}, // Doc: https://axios.nuxtjs.org/options
    build: {
        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                if (config.module) {
                    config.module.rules.push({
                        enforce: "pre",
                        test: /\.(ts|js|vue)$/,
                        loader: "eslint-loader",
                        exclude: /(node_modules)/
                    });
                }
            }
        }
    }
};

export default config;
