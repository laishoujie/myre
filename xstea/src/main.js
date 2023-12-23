import { createApp } from 'vue'

import App from './App.vue'
import VueRouter from 'vue-router'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import http from './network/http'
const app = createApp(App)
app.use(VueRouter)
app.use(router)
app.use(ElementPlus)
// app.use(http)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.mount('#app')
