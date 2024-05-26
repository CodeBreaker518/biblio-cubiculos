import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import InterUsuarioView from "../views/InterUsuarioView.vue";
import AjustesView from "../views/AjustesView.vue";
import RecuperacionPasswordView from "../views/RecuperacionPasswordView.vue";
import PerfilView from "../views/PerfilView.vue";
import ReservarCubiculosView from "../views/ReservarCubiculosView.vue";
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
    component: AdminView,
    children: [
      {
        path: "cubiculos",
        name: "Cubiculos",
        component: AdminCubiculosView,
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
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/InterUsuario",
    name: "InterUsuario",
    component: InterUsuarioView,
  },
  {
    path: "/Ajustes",
    name: "Ajustes",
    component: () => import("../views/AjustesView.vue"),
  },  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
