<script setup>
import { RouterLink, RouterView } from 'vue-router'

const links = [
  { to: '/admin', text: 'Inicio', icon: 'bi bi-house' },
  { to: '/admin/cubiculos', text: 'Cubículos', icon: 'bi bi-box' },
  { to: '/admin/achievements', text: 'Logros', icon: 'bi bi-trophy' }
]
</script>

<template>
  <!-- Header -->
  <header class="navbar navbar-dark bg-primary d-flex">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Panel de Administrador</a>
      <button class="btn btn-outline-light" type="button">Cerrar Sesión</button>
    </div>
  </header>

  <!-- Sidebar -->
  <div class="container-fluid">
    <div class="row">
      <nav
        id="sidebar"
        class="col-md-3 col-lg-2 d-md-block sidebar py-4"
      >
        <ul class="nav flex-column gap-2">
          <RouterLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="nav-item nav-link d-flex align-items-center gap-2"
            :class="{ active: $route.path === link.to }"
          >
            <i :class="link.icon"></i>
            <p class="p-0 m-0">{{ link.text }}</p>
          </RouterLink>
        </ul>
      </nav>

      <!-- Main Content -->
      <main class="col-md-9 col-lg-10 px-md-4">
        <div class="pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2">{{ $route.name }}</h1>
        </div>
        <div class="container">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Header Styles */
.navbar {
  background-color: #004085;
  color: white;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.btn-outline-light {
  background-color: transparent;
  border: 2px solid white;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.btn-outline-light:hover {
  background-color: white;
  color: #004085;
}

/* Sidebar Styles */
#sidebar {
  max-width: 200px;
  background-color: #e3f2fd;
  padding: 2rem;
  border-right: 1px solid #dee2e6;
  height: 100vh;
}

.nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  list-style: none;
  background-color: #f8f9fa;
  border: 1px solid #f8f9fa;
  border-radius: 5px;
  transition: all 0.3s;
  padding: 0.5rem;
}

.nav-item:hover {
  background-color: #c9a400;
  color: white;
}

.nav-item.active {
  background-color: #c9a400;
  color: white;
}

.transition-colors {
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

/* Icon Styles */
.bi {
  margin-right: 0.5rem;
}
</style>
