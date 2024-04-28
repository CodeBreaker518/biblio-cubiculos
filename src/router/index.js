import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import AdminView from "../views/admin/AdminView.vue";
import CubiculosView from "../views/admin/CubiculosView.vue";
// import VistaInicio from '../views/HomeView.vue'

const routes = [
  {
    path: "/",
    name: "Inicio",
    component: HomeView,
  },
  {
    path: "/admin",
    name: "Dashboard",
    children: [
      {
        path: "cubiculos",
        name: "Cubiculos",
        component: CubiculosView,
      },
    ],
    component: AdminView,
  },
  {
    path: "/Register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/InterUsuario",
    name: "InterUsuario",
    component: () => import("../views/InterUsuarioView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
