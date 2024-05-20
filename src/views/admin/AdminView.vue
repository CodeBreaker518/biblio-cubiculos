<template>
  <div>
    <header class="navbar navbar-dark d-flex bg-primary">
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
        <nav
          id="sidebar"
          class="col-md-3 col-lg-2 d-md-block bg-light sidebar py-4"
        >
          <div class="position-sticky">
            <ul class="nav flex-column gap-2">
              <li
                v-for="link in links"
                :key="link.to"
                class="nav-item"
              >
                <router-link
                  :to="link.to"
                  class="nav-link d-flex align-items-center gap-2"
                  :class="{ active: $route.path === link.to }"
                >
                  <i :class="link.icon"></i>
                  {{ link.text }}
                </router-link>
              </li>
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
import { RouterLink, RouterView, useRouter } from 'vue-router'

const router = useRouter();

const logout = () => {
  router.push('/');
}

const links = [
  { to: '/admin', text: 'Inicio', icon: 'bi bi-house' },
  { to: '/admin/cubiculos', text: 'Cubículos', icon: 'bi bi-box' },
  { to: '/admin/reservas', text: 'Reservas', icon: 'bi bi-calendar' },
  { to: '/admin/avisos', text: 'Avisos', icon: 'bi bi-bookmark' },
  { to: '/admin/achievements', text: 'Logros', icon: 'bi bi-trophy' }  // Añadido desde el otro código
]
</script>

<style scoped>
.navbar {
  background-color: #002f6c !important;
}

.navbar-brand {
  color: #c9a400 !important;
  font-weight: bold;
}

.btn-outline-light {
  color: #ffffff;
  border-color: #c9a400;
}

.btn-outline-light:hover {
  color: #002f6c;
  background-color: #c9a400;
  border-color: #c9a400;
}

#sidebar {
  background-color: #e3f2fd;
  max-width: 200px;
  height: calc(100vh - 72px);
  padding-top: 1rem;
}

.nav-link {
  color: #002f6c;
  font-weight: bold;
  transition: 300ms all;
  border-radius: 5px;
}

.nav-link:hover {
  color: #ffffff !important;
  background-color: #c9a400 !important;
}

.nav-link.active {
  color: #ffffff !important;
  background-color: #bfa303 !important;
}

.nav-link i {
  font-size: 1.2rem;
}

.main-content {
  padding: 20px;
}

.container {
  padding: 20px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  margin: 20px auto;
}
</style>
