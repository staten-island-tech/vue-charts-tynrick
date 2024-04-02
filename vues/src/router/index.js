import { createRouter, createWebHistory } from 'vue-router'
import LineView from '../views/LineView.vue'
import PieView from '../views/PieView.vue'
import BarView from '../views/chartView.vue'
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
      component: PieView
    },
    {
      path: '/bar',
      name: 'bar',
      component: BarView
    },
  ]
})

export default router
