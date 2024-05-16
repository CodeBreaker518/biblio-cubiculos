<template>
  <div class="user-dashboard">
    <header class="header">
      <div class="profile" @click="toggleMenu">
        <img src="@/assets/escalinatas.png" alt="Imagen de perfil" class="profile-image">
      </div>
      <ul v-show="showMenu" class="profile-menu active">
        <li>{{ username }}</li>
        <li><router-link to="/Historial">Panel de avisos</router-link></li>
        <li><router-link to="/Ajustes">Ajustes</router-link></li>
        <li><button @click="logout">Cerrar sesión</button></li>
      </ul>
    </header>

    <main>
      <div class="user-welcome">
        <h1>Bienvenido, {{ username }}</h1>
      </div>
    </main>

    <div class="Cuerpo">
      <div class="fibonacci-container">
        <div class="fibonacci-item fibonacci1">
          <p>CUBICULOS</p>
          
          <!-- Sección de tarjetas añadida -->
          <div class="container py-2">
            <div class="row">
              <div class="col-md-10 col-lg-4" v-for="cubiculo in paginatedCubiculos" :key="cubiculo.id">
                <div class="card mb-4">
                  <div class="card-body">
                    <h5 class="card-title">{{ cubiculo.name }}</h5>
                    <p class="card-text">{{ cubiculo.descripcion }}</p>
                    <p v-if="cubiculo.usuario">Usuario: {{ cubiculo.usuario.name }}</p>
                    <p v-else>Usuario: Ninguno</p>

                    <p v-if="cubiculo.usuario">
                      Fecha de inicio: {{ cubiculo.start_date }}
                    </p>
                    <p v-if="cubiculo.usuario">Fecha de fin: {{ cubiculo.end_date }}</p>

                    <p :class="cubiculo.usuario ? 'text-danger' : 'text-success'">
                      {{ cubiculo.usuario ? "Ocupado" : "Disponible" }}
                    </p>
                    
                    <!-- Modal para la reserva -->
                    <div
                      class="modal fade"
                      id="createReservationModal"
                      tabindex="-1"
                      aria-labelledby="createReservationModal"
                      aria-hidden="true"
                      modal-dialog>
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="createReservationModal">
                              Reservar cubículo
                            </h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <div>
                              <label for="usuario">Usuario</label>
                              <select class="form-select" v-model="usuario">
                                <option
                                  v-for="user in usuarios"
                                  :key="user.id"
                                  :value="user.id">
                                  {{ user.name }}
                                </option>
                              </select>

                              <label for="fecha">Fecha</label>
                              <input type="date" class="form-control" v-model="fecha" />

                              <div class="row">
                                <div class="col">
                                  <label for="horaInicio">Hora de inicio</label>
                                  <input
                                    type="time"
                                    class="form-control"
                                    v-model="horaInicio" />
                                </div>
                                <div class="col">
                                  <label for="horaFin">Hora de finalización</label>
                                  <input
                                    type="time"
                                    class="form-control"
                                    v-model="horaFin" />
                                </div>
                              </div>

                              <button
                                class="btn btn-primary mt-2"
                                data-bs-dismiss="modal"
                                @click="reservarCubiculo(cubiculo)">
                                Reservar cubículo
                              </button>
                              <button
                                type="button"
                                class="btn btn-secondary ms-2 mt-2"
                                data-bs-dismiss="modal">
                                Cancelar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    
                  </div>
                </div>
              </div>
            </div>
            
            <div class="navigation-buttons">
              <button @click="previousPage" :disabled="currentPage === 1">Atrás</button>
              <button @click="nextPage" :disabled="currentPage === totalPages">Adelante</button>
            </div>
          </div>
        </div>
        <div class="fibonacci-item fibonacci3">
          <p>MI CUBÍCULO</p>
          <div v-if="!miCubiculo">
            <p>No tienes cubículo, puedes solicitar uno</p>
            <button @click="solicitarCubiculo">Solicitar cubículo</button>
          </div>
        </div>
        <div class="fibonacci-item fibonacci2">
          <p>SANCIONES</p>
          <div v-if="!sanciones.length">
            <p>No tienes sanciones</p>
          </div>
        </div>
        <div class="fibonacci-item fibonacci4">
          <p>LOGROS</p>
          <div v-if="!logros.length">
            <p>No tienes logros</p>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <p>&copy; 2024 Cubículos Biblioteca</p>
    </footer>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";

export default {
  data() {
    return {
      username: 'Usuario',
      showMenu: false,
      miCubiculo: null,
      sanciones: [], // Array para sanciones
      logros: [] // Array para logros
    };
  },
  setup() {
    const state = reactive({
      cubiculoActual: null,
      cubiculos: [
        { id: 1, name: "Cubículo 1", descripcion: "Cubículo de 4x4 metros", start_date: null, end_date: null, status: false, usuario: null },
        { id: 2, name: "Cubículo 2", descripcion: "Cubículo de 4x4 metros", start_date: null, end_date: null, status: false, usuario: null },
        { id: 3, name: "Cubículo 3", descripcion: "Cubículo de 4x4 metros", start_date: null, end_date: null, status: false, usuario: null },
        { id: 4, name: "Cubículo 4", descripcion: "Cubículo de 4x4 metros", start_date: null, end_date: null, status: false, usuario: null },
        { id: 5, name: "Cubículo 5", descripcion: "Cubículo de 4x4 metros", start_date: null, end_date: null, status: false, usuario: null },
        { id: 6, name: "Cubículo 6", descripcion: "Cubículo de 4x4 metros", start_date: null, end_date: null, status: false, usuario: null },
        { id: 7, name: "Cubículo 7", descripcion: "Cubículo de 4x4 metros", start_date: null, end_date: null, status: false, usuario: null },
        { id: 8, name: "Cubículo 8", descripcion: "Cubículo de 4x4 metros", start_date: null, end_date: null, status: false, usuario: null },
        { id: 9, name: "Cubículo 9", descripcion: "Cubículo de 4x4 metros", start_date: null, end_date: null, status: false, usuario: null },
        { id: 10, name: "Cubículo 10", descripcion: "Cubículo de 4x4 metros", start_date: null, end_date: null, status: false, usuario: null },
        { id: 11, name: "Cubículo 11", descripcion: "Cubículo de 4x4 metros", start_date: null, end_date: null, status: false, usuario: null },
        { id: 12, name: "Cubículo 12", descripcion: "Cubículo de 4x4 metros", start_date: null, end_date: null, status: false, usuario: null },
        { id: 13, name: "Cubículo 13", descripcion: "Cubículo de 4x4 metros", start_date: null, end_date: null, status: false, usuario: null },
        { id: 14, name: "Cubículo 14", descripcion: "Cubículo de 4x4 metros", start_date: null, end_date: null, status: false, usuario: null },
        { id: 15, name: "Cubículo 15", descripcion: "Cubículo de 4x4 metros", start_date: null, end_date: null, status: false, usuario: null }
      ],
      usuario: null,
      fecha: null,
      horaInicio: null,
      horaFin: null,
      currentPage: 1,
      itemsPerPage: 3
    });

    const totalPages = computed(() => Math.ceil(state.cubiculos.length / state.itemsPerPage));
    const paginatedCubiculos = computed(() => {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      return state.cubiculos.slice(start, end);
    });

    function abrirModalReserva(cubiculo) {
      state.cubiculoActual = cubiculo;
    }

    

    function nextPage() {
      if (state.currentPage < totalPages.value) {
        state.currentPage++;
      }
    }

    function previousPage() {
      if (state.currentPage > 1) {
        state.currentPage--;
      }
    }

    function solicitarCubiculo() {
      console.log("Solicitud de cubículo enviada");
    }

    return {
      ...toRefs(state),
      abrirModalReserva,
      nextPage,
      previousPage,
      paginatedCubiculos,
      totalPages,
      solicitarCubiculo
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    logout() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 25px 0;
}

nav ul {
  display: flex;
  list-style: none;
}

.profile {
  cursor: pointer;
}

.profile-menu {
  position: absolute;
  top: calc(100% + 100px);
  right: 0;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  display: none;
  list-style: none;
}

.profile-menu li {
  margin-bottom: 10px;
}

.profile:hover .profile-menu,
.profile-menu.active {
  display: block;
}

.profile-image {
  position: absolute;
  top: 10px;
  right: 28px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.Cuerpo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px); 
}

.fibonacci-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
}

.fibonacci-item {
  flex-grow: 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); 
}

.fibonacci1 {
  background-color: #CBA135;
  width: 100%;
}

.fibonacci2 {
  background-color: #F3D785;
  width: 25%;
}

.fibonacci3 {
  background-color: #E8C14E;
  width: 50%;
}

.fibonacci4 {
  background-color: #FDF2B1;
  width: 25%;
}

.container {
  padding-top: 20px;
}

.card {
  margin-bottom: 20px;
}

.card-body {
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.card-text {
  flex-grow: 1;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.text-danger {
  color: red;
}

.text-success {
  color: green;
}
</style>
