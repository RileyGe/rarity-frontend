const linguiConfig = require('./lingui.config.js')
const { locales, sourceLocale } = linguiConfig
const runtimeCaching = require('next-pwa/cache')
const withPWA = require('next-pwa')

const nextConfig = {
    webpack: (config) => {
        config.module.rules = [
            ...config.module.rules,
            {
                resourceQuery: /raw-lingui/,
                type: 'javascript/auto',
            },
        ]

        return config
    },
    pwa: {
        dest: 'public',
        runtimeCaching,
        disable: process.env.NODE_ENV === 'development',
    },
    reactStrictMode: true,
    i18n: {
        locales: ["zh_CN"],
        // defaultLocale: "zh-CN",
        // localeDetection: true,
        // locales,
        defaultLocale: 'zh_CN',
    },
    async redirects() {
        return [
            {
                source: '/adventures',
                destination: '/play',
                permanent: true,
            },
            {
                source: '/daily',
                destination: '/play',
                permanent: true,
            },
            {
                source: '/skills',
                destination: '/play',
                permanent: true,
            },
            {
                source: '/global',
                destination: '/analytics',
                permanent: true,
            },
            {
                source: '/stats',
                destination: '/analytics',
                permanent: true,
            },
        ]
    },
}

module.exports = withPWA(nextConfig)
