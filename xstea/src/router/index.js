import { createRouter, createWebHistory } from 'vue-router'
import activity from '@/views/activity'
import login from '@/views/loginPage.vue'
import layout from '@/views/layout'
import recommend from '@/views/recommend'
import notice from '@/views/notice'
import excellent from '@/views/excellent'
import { useStore } from "vuex";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path:'/login',
      component:login
    },
    {
      path:'/',
      component:layout,
      redirect:'/activity',
      children:[
        {
          path:'/activity',
          component:activity
        },
        {
          path:'/recommend',
          component:recommend
        },
        {
          path:'/notice',
          component:notice
        },
        {
          path:'/excellent',
          component:excellent
        },
      ]
    },
  ]
})
router.beforeEach((to) => {
  // 如果没有token，且访问的是非登录页，拦截到登录，其他情况正常放行
  const store=useStore()
  if (!window.localStorage["token"] && to.path !== '/login') return '/login'
  return true
})
export default router
