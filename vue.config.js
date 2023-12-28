const { defineConfig } = require('@vue/cli-service')
// const AutoImport = require('unplugin-auto-import/webpack')
// const Components = require('unplugin-vue-components/webpack')
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  // plugins: [
  //   AutoImport({
  //     resolvers: [ElementPlusResolver()],
  //   }),
  //   Components({
  //     resolvers: [ElementPlusResolver()],
  //   }),
  // ],
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy: {
      '/api': {
        target: 'http://117.50.163.249:3335',
        ws:true,
        changeOrigin: true,
      }
    },
    client:{
      overlay:false
    }
  }
}
