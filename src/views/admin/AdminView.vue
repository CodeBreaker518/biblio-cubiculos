<template>
  <!-- Header -->
  <div>
    <header class="navbar navbar-dark d-flex" style="background-color: #002f6c;">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Panel de Administrador</a>
        <div>
          <button @click="logout" class="btn btn-outline-light" type="button">Cerrar Sesión</button>
        </div>
      </div>
    </header>

    <!-- Sidebar -->
    <div class="container-fluid">
      <div class="row">
        <nav id="sidebar" class="col-md-3 col-lg-2 d-md-block bg-light sidebar py-4" style="background-color: #e3f2fd">
          <div class="position-sticky">
            <ul class="nav d-flex flex-column gap-2 list-group">
              <RouterLink v-for="link in links" :key="link.to" :to="link.to" class="nav-item nav-link text-dark list-group-item transition-colors rounded-3 d-flex align-items-center gap-2" :class="{ active: $route.path === link.to }">
                <i :class="link.icon"></i>
                <p class="p-0 m-0">{{ link.text }}</p>
              </RouterLink>
            </ul>
          </div>
        </nav>

        <!-- Main Content -->
        <main class="col-md-9 col-lg-10 px-md-4">
          <div class="pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">{{ $route.name }}</h1>
          </div>
          <div class="container">
            <router-view />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  router.push('/');
};

const links = [
  { to: '/admin', text: 'Inicio', icon: 'bi bi-house' },
  { to: '/admin/cubiculos', text: 'Cubículos', icon: 'bi bi-box' },
  { to: '/admin/reservas', text: 'Reservas', icon: 'bi bi-calendar' },
  { to: '/admin/avisos', text: 'Avisos', icon: 'bi bi-bookmark' },
  { to: '/admin/achievements', text: 'Logros', icon: 'bi bi-trophy' }
];
</script>

<style scoped>
.active {
  background-color: #c9a400; /* Dorado */
}

#sidebar {
  max-width: 200px;
  height: calc(100vh - 72px);
}

@media (max-width: 768px) {
  #sidebar {
    max-width: 100%;
    height: 100%;
  }
}

.nav-items-list {
  height: 100%;
}

.nav-item {
  list-style-type: none;
  transition: 300ms all;
  background-color: #f8f9fa;
  box-shadow: 0;
  border: 1px solid #f8f9fa;
  border-radius: 10px;
  margin-bottom: 10px;
}

.nav-item:hover {
  background-color: #c9a400; /* Dorado */
  color: #002f6c !important;
}

.nav-item.active {
  color: #002f6c !important;
  border: 1px solid #c9a400; /* Dorado */
  background-color: #c9a400; /* Dorado */
}

.btn-aceptar {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-cancelar {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-aceptar:hover,
.btn-cancelar:hover {
  background-color: #218838;
  border-color: #218838;
}

.navbar-dark .navbar-brand {
  color: #c9a400; /* Dorado */
}

.navbar-dark .btn-outline-light {
  color: #c9a400; /* Dorado */
  border-color: #c9a400; /* Dorado */
}

.navbar-dark .btn-outline-light:hover {
  color: #002f6c;
  background-color: #c9a400; /* Dorado */
  border-color: #c9a400; /* Dorado */
}
</style>
