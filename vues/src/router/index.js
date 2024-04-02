import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    

    {
      path: '/pie',
      name: 'pie',
      component: () => import('../views/PieView.vue')
    },
    {
      path: '/bar',
      name: 'bar',
      component: () => import('../views/chartView.vue')
    },
  ]
})

export default router
