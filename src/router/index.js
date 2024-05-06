import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import AdminView from "../views/admin/AdminView.vue";
import CubiculosView from "../views/admin/CubiculosView.vue";
import AchievementsView from "../views/admin/AchievementsView.vue";

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
        path: "",
        name: "admin",
        component: CubiculosView,
      },
      {
        path: "cubiculos",
        name: "Cubiculos",
        component: CubiculosView,
      },
      {
        path: "achievements",
        name: "Logros",
        component: AchievementsView,
      },
    ],
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
