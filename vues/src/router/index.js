import { createRouter, createWebHistory } from 'vue-router'
import LineView from '../views/LineView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'line',
      component: LineView
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
