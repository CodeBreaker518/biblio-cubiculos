import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import AdminView from '../views/admin/AdminView.vue'
import CubiculosView from '../views/admin/CubiculosView.vue'
import ReservasView from '../views/admin/ReservasView.vue'
import VistaInicio from '../views/VistaInicio.vue'

const routes = [
  {
      path: '/',
      name: 'Inicio',
      component: VistaInicio
    },
    {
      path: '/admin',
      name: 'Dashboard',
      children: [
        {
          path: 'cubiculos',
          name: 'Cubiculos',
          component: CubiculosView
        },
        {
          path: 'reservas',
          name: 'Reservas',
          component: ReservasView
        }
      ],
      component: AdminView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
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
