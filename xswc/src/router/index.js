import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/login',
      component:()=>import('@/views/login/loginPage.vue')
    },
    {
      path:'/',
      component:()=>import('@/views/layout/layout.vue'),
      redirect:'/activity/activity',
      children:[
        {
          path:'/activity/activity',
          component:()=>import('@/views/activity/activity.vue'),
        },
        {
          path:'/activity/recommend',
          component:()=>import('@/views/activity/recommend.vue'),
        },
        {
          path:'/notice/notice',
          component:()=>import('@/views/notice/notice.vue'),
        },
        {
          path:'/excellent/excellent',
          component:()=>import('@/views/excellent/excellent.vue'),
        },
      ]
    },
  ]
})

export default router
