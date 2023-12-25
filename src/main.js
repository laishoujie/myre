import { createApp } from 'vue'

import App from './App.vue'
import VueRouter from 'vue-router'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import http from './network/http'
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import Prism from 'prismjs';
import hljs from 'highlight.js';
const app = createApp(App)
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});
VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

app.use(VueRouter)
app.use(router)
app.use(ElementPlus)
// app.use(http)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.use(VueMarkdownEditor);
  app.use(VMdPreview);
app.mount('#app')
