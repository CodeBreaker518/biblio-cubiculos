<script setup>
import { RouterLink, RouterView } from 'vue-router'

// put bootstrap icons in the links

const links = [
  { to: '/admin', text: 'Inicio', icon: 'bi bi-house' },
  { to: '/admin/cubiculos', text: 'Cubiculos', icon: 'bi bi-box' },
  { to: '/admin/reservas', text: 'Reservas', icon: 'bi bi-calendar' }
  // { to: '/admin/usuarios', text: 'Usuarios', icon: 'bi bi-person' },
]
</script>

<template>
  <!-- Header -->
  <div class="">
    <header class="navbar navbar-dark d-flex bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Panel de Administrador</a>

        <div class="">
          <button class="btn btn-outline-light" type="button">Cerrar Sesion</button>
        </div>
      </div>
    </header>

    <!-- Sidebar -->
    <div class="container-fluid">
      <div class="row">
        <nav
          id="sidebar"
          class="col-md-3 col-lg-2 d-md-block bg-light sidebar py-4"
          style="background-color: #e3f2fd"
        >
          <div class="position-sticky">
            <ul class="nav d-flex flex-column gap-2 list-group">
              <!-- add the class 'active' to the active link -->
              <RouterLink
                v-for="link in links"
                :key="link.to"
                :to="link.to"
                class="nav-item nav-link text-dark list-group-item transition-colors rounded-3 d-flex align-items-center gap-2"
                :class="{ active: $route.path === link.to }"
              >
                <i :class="link.icon"></i>
                <p class="p-0 m-0">
                  {{ link.text }}
                </p>
              </RouterLink>
            </ul>
          </div>
        </nav>

        <!-- Main Content -->
        <main class="col-md-9 col-lg-10 px-md-4">
          <div class="pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">{{ $route.name }}</h1>
          </div>
          <!-- Aquí puedes poner el contenido principal de tu página -->
          <div class="container">
            <RouterView />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active {
  background-color: #c9a400;
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
}

.nav-item:hover {
  background-color: #c9a400;
  color: white !important;
}
.nav-item.active {
  color: white !important;
  border: 1px solid #c9a400;
  background-color: #c9a400;
}

.transition-colors {
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
}
</style>
