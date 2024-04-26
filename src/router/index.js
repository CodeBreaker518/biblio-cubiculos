import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import AdminView from '../views/admin/AdminView.vue'
import CubiculosView from '../views/admin/CubiculosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin',
      name: 'Dashboard',
      children: [
        {
          path: 'cubiculos',
          name: 'Cubiculos',
          component: CubiculosView
        }
      ],
      component: AdminView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ]
})

export default router
