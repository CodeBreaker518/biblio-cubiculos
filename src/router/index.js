import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import AdminView from "../views/admin/AdminView.vue";
import AdminCubiculosView from "../views/admin/AdminCubiculosView.vue";
import AdminReservasView from "../views/admin/AdminReservasView.vue";

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
        component: AdminCubiculosView,
      },
      {
        path: "reservas",
        name: "Reservas",
        component: AdminReservasView,
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
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/InterUsuario",
    name: "InterUsuario",
    component: () => import("../views/InterUsuarioView.vue"),
  },
  {
    path: "/Ajustes",
    name: "Ajustes",
    component: () => import("../views/AjustesView.vue"),
  },
  {
    path: "/Recuperacion",
    name: "Recuperacion",
    component: () => import("../views/RecuperacionPasswordView.vue"),
  },
  { path: "/Reservar", 
    name: "Reservar", 
    component: () => import("../views/ReservarCubiculosView.vue")
  },
  {
    path: "/Historial",
    name: "Historial",
    component: () => import("../views/PerfilView.vue")
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
