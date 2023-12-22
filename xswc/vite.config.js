import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '^/api': {
        target: 'http://124.220.216.249:3166', //目标源，目标服务器，真实请求地址
        changeOrigin: true, //支持跨域
        ws:true,
        rewrite: (path) => path.replace(/^\/api/, ""), //重写真实路径,替换/api
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dirs:['src/components'],
      resolvers: [ElementPlusResolver()],
      
    })
  ],
  base:'./',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
