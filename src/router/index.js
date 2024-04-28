import { createRouter, createWebHistory } from 'vue-router'
import VistaInicio from '../views/VistaInicio.vue'

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: VistaInicio
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/InterUsuario',
    name: 'InterUsuario',
    component: () => import('../views/InterUsuarioView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
