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
      path: '/prediction',
      name: 'prediction',
      component: () => import('../views/PredictionView.vue')
    },
    {
      path: '/prediction-with-template',
      name: 'prediction-with-template',
      component: () => import('../views/PredictionWithTemplateView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
