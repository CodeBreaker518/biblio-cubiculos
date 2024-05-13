<template>
  <!-- Header -->
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
            <!-- Verificar si estamos en la sección de inicio y mostrar las tarjetas de cubículos -->
            <div v-if="$route.path === '/admin'">
              <h2>Listado de Cubículos</h2>
              <div class="row">
                <div
                  class="col-md-4"
                  v-for="cubiculo in cubiculos"
                  :key="cubiculo.id"
                >
                  <div class="card mb-3">
                    <div class="card-body">
                      <h5 class="card-title">{{ cubiculo.name }}</h5>
                      <p class="card-text">
                        {{ cubiculo.estudiante ? 'Estudiante: ' + cubiculo.estudiante : 'Disponible' }}
                      </p>
                      <p class="card-text">
                        {{ cubiculo.tiempo ? 'Tiempo: ' + cubiculo.tiempo : '' }}
                      </p>
                      <button @click="aceptarSolicitud(cubiculo.id)" class="btn btn-aceptar">Aceptar</button>
                      <button @click="cancelarSolicitud(cubiculo.id)" class="btn btn-cancelar">Cancelar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Sistema de solicitudes de cubículos -->
            <router-view v-else />
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
  { to: '/admin/cubiculos', text: 'Cubiculos', icon: 'bi bi-box' },
  { to: '/admin/reservas', text: 'Reservas', icon: 'bi bi-calendar' },
  { to: '/admin/avisos', text: 'Avisos', icon: 'bi bi-bookmark'},
]

const cubiculos = [
  { id: 1, name: 'Cubículo 1', estudiante: 'Juan Pérez', tiempo: '2 horas' },
  { id: 2, name: 'Cubículo 2', estudiante: 'Diego Diaz', tiempo: '2 horas' },
  { id: 3, name: 'Cubículo 3', estudiante: 'María López', tiempo: '1 hora' },
  // Agrega más cubículos si es necesario
]

</script>

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
  list-style-type: none; /* Eliminar los puntos de la lista */
  transition: 300ms all;
  background-color: #f8f9fa;
  box-shadow: 0;
  border: 1px solid #f8f9fa;
  border-radius: 10px; /* Añadir bordes redondeados */
  margin-bottom: 10px; /* Espacio entre elementos de la lista */
}

.nav-item:hover {
  background-color: #bfa303; /* Cambiar el color de fondo al pasar el ratón */
  color: white !important;
}
.nav-item.active {
  color: white !important;
  border: 1px solid #bfa303; /* Cambiar el borde activo */
  background-color: #bfa303;
}

/* Estilos para los botones de aceptar y cancelar */
.btn-aceptar {
  background-color: #28a745; /* Color verde */
  border-color: #28a745;
}

.btn-cancelar {
  background-color: #dc3545; /* Color rojo */
  border-color: #dc3545;
}

.btn-aceptar:hover,
.btn-cancelar:hover {
  background-color: #218838; /* Cambio de tono al pasar el ratón */
  border-color: #218838;
}
</style>
