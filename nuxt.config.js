export default {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:8000'
  },

  server: {
    port: 8000
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nuxt-shpolka',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'normalize.css',
    '~/assets/styles/main.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/progress-bar/index.js',
    '~/plugins/vuelidate',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/svg-sprite',
    '@nuxtjs/style-resources',
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  svgSprite: {
    input: '~/assets/svg/'
  },

  styleResources: {
    scss: ['~/assets/styles/constants.scss', '~/assets/styles/mixins.scss']
  },

  // router: {
  //   middleware: 'auth'
  // }
}
