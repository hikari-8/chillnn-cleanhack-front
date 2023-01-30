const envPath = `env/app/${process.env.ENV || 'dev'}.env`
require('dotenv').config({
    path: envPath,
})

export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,
    env: {
        ENV: process.env.ENV,
        // Input
        ...process.env,
    },
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'CLEAN HACK',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content:
                    'CHILLNNで用いている基本的な機能を全て盛り込んだサービスです。毎週のチームのお掃除場所決めをサポートします。',
            },
            {
                hid: 'og:site_name',
                property: 'og:site_name',
                content: 'CHILLNN',
            },
            {
                hid: 'og:type',
                name: 'og:type',
                content: 'website',
            },
            {
                hid: 'og:title',
                name: 'og:title',
                content: 'CLEAN HACK',
            },
            {
                hid: 'og:description',
                name: 'og:description',
                content:
                    'CHILLNNの基本的な技術スタックを利用したお掃除くじアプリケーション',
            },
            {
                hid: 'og:image',
                property: 'og:image',
                content: '/icon.png',
            },
            {
                hid: 'twitter:card',
                name: 'twitter:card',
                content: 'summary_large_image',
            },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.png' }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        './assets/css/main.css', //
    ],
    loading: '~/components/Organisms/Loading.vue',
    srcDir: './client/',

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [{ src: '~/plugins/amplify.ts', ssr: false }],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        '@nuxt/postcss8',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        [
            '@nuxtjs/dotenv',
            {
                filename: `../${envPath}`,
            },
        ],
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        '@nuxtjs/style-resources',
    ],

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'ja',
        },
        icon: false,
    },

    styleResources: {
        stylus: [
            '~/assets/styles/color.styl',
            '~/assets/styles/variables.styl',
        ],
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        postcss: {
            plugins: {
                tailwindcss: {},
                autoprefixer: {},
            },
        },
    },
}
