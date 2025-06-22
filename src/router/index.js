import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReservationView from '../views/ReservationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/rezervace',
      name: 'reservation',
      component: ReservationView
    },
    {
      path: '/o-nas',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/stalo-se',
      name: 'past',
      component: () => import('../views/PastView.vue')
    },
    {
      path: '/akce',
      name: 'events',
      component: () => import('../views/EventsView.vue')
    },
    {
      path: '/kontakt',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    }
  ]
})

export default router 