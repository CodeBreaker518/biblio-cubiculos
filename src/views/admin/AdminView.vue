<script setup>
import { RouterLink, RouterView } from 'vue-router'

const links = [
  { to: '/admin/', text: 'Dashboard' },
  { to: 'cubiculos', text: 'Cubículos' }
  // { to: 'reservas', text: 'Reservas' },
  // { to: 'usuarios', text: 'Usuarios' },
  // { to: 'reportes', text: 'Reportes' },
  // { to: 'configuracion', text: 'Configuración' }
]
</script>

<template>
  <!-- Header -->
  <div class="">
    <header class="navbar navbar-dark bg-dark">
      <div class="d-flex p-2">
        <a class="navbar-brand" href="#">Panel de Administrador</a>
      </div>
    </header>

    <!-- Sidebar -->
    <div class="container-fluid">
      <div class="row">
        <nav id="sidebar" class="col-md-3 col-lg-2 d-md-block bg-light sidebar">
          <div class="position-sticky">
            <ul class="nav d-flex flex-column gap-2 nav-items-list">
              <RouterLink v-for="link in links" :key="link.to" :to="link.to" class="nav-item">
                <a class="nav-link text-dark text-decoration-none">
                  <div class="p-2 rounded hover:bg-light hover:text-primary transition-colors">
                    {{ link.text }}
                  </div>
                </a>
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
}

.nav-item:hover {
  background-color: #0d6efd;
}

.hover\:text-primary:hover {
  color: #0d6efd;
}

.transition-colors {
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
}
</style>
