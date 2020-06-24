const path = require("path")
module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {},
  mini: {},
  h5: {
    esnextModules: ['taro-ui']
  },
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/api': path.resolve(__dirname, '..', 'src/api'),
    '@/url': path.resolve(__dirname, '..', 'src/url'),
    '@/model': path.resolve(__dirname, '..', 'src/model'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
  }
}
