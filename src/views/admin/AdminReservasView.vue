<template>
  <div class="container py-2">
    <div class="row mb-4">
      <div class="col-md-6">
        <label for="filterStartDate" class="form-label">Fecha de inicio:</label>
        <input type="date" id="filterStartDate" v-model="filterStartDate" class="form-control" />
      </div>
      <div class="col-md-6">
        <label for="filterEndDate" class="form-label">Fecha de fin:</label>
        <input type="date" id="filterEndDate" v-model="filterEndDate" class="form-control" />
      </div>
    </div>

    <div class="row">
      <div
        class="col-md-10 col-lg-4"
        v-for="cubiculo in filteredCubiculos"
        :key="cubiculo.id">
        <div class="card mb-4 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ cubiculo.name }}</h5>
            <p class="card-text">{{ cubiculo.descripcion }}</p>
            <p v-if="cubiculo.usuario">Usuario: {{ cubiculo.usuario.name }}</p>
            <p v-else>Usuario: Ninguno</p>

            <p v-if="cubiculo.usuario">
              Fecha de inicio: {{ cubiculo.start_date }}
            </p>
            <p v-if="cubiculo.usuario">Fecha de fin: {{ cubiculo.end_date }}</p>

            <button
              type="button"
              class="btn btn-sm"
              :class="cubiculo.usuario ? 'btn-danger' : 'btn-outline-success'"
              data-bs-toggle="modal"
              data-bs-target="#createReservationModal"
              :disabled="cubiculo.usuario"
              @click="abrirModalReserva(cubiculo)">
              {{ cubiculo.usuario ? "Reservado" : "Reservar" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para Reservar Cubículo -->
    <div
      class="modal fade"
      id="createReservationModal"
      tabindex="-1"
      aria-labelledby="createReservationModalLabel"
      aria-hidden="true"
      modal-dialog>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createReservationModalLabel">
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
                  <input type="time" class="form-control" v-model="horaInicio" />
                </div>
                <div class="col">
                  <label for="horaFin">Hora de finalización</label>
                  <input type="time" class="form-control" v-model="horaFin" />
                </div>
              </div>

              <button
                class="btn btn-primary mt-2"
                data-bs-dismiss="modal"
                @click="reservarCubiculo(cubiculoActual)">
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
</template>

<script>
import { reactive, toRefs, computed } from "vue";

export default {
  setup() {
    const state = reactive({
      cubiculoActual: null,
      cubiculos: [
        {
          id: 1,
          name: "Cubículo 1",
          descripcion: "Cubículo de 4x4 metros",
          start_date: null,
          end_date: null,
          status: false,
          usuario: null,
        },
        {
          id: 2,
          name: "Cubículo 2",
          descripcion: "Cubículo de 4x4 metros",
          start_date: null,
          end_date: null,
          status: false,
          usuario: null,
        },
        // Más datos de cubículos aquí
      ],
      usuario: null,
      fecha: null,
      horaInicio: null,
      horaFin: null,
      usuarios: [
        { id: 1, name: "Usuario 1" },
        { id: 2, name: "Usuario 2" },
      ],
      filterStartDate: null,
      filterEndDate: null,
    });

    function abrirModalReserva(cubiculo) {
      state.cubiculoActual = cubiculo;
    }

    function reservarCubiculo() {
      const usuario = state.usuarios.find((u) => u.id === state.usuario);
      if (!usuario || !state.fecha || !state.horaInicio || !state.horaFin) {
        return;
      }
      state.cubiculoActual.start_date = state.fecha + " " + state.horaInicio;
      state.cubiculoActual.end_date = state.fecha + " " + state.horaFin;
      state.cubiculoActual.status = true;
      state.cubiculoActual.usuario = usuario;
    }

    const filteredCubiculos = computed(() => {
      return state.cubiculos.filter((cubiculo) => {
        if (!cubiculo.start_date || !cubiculo.end_date) {
          return true;
        }
        const cubiculoStartDate = new Date(cubiculo.start_date).getTime();
        const cubiculoEndDate = new Date(cubiculo.end_date).getTime();
        const filterStartDate = state.filterStartDate
          ? new Date(state.filterStartDate).getTime()
          : null;
        const filterEndDate = state.filterEndDate
          ? new Date(state.filterEndDate).getTime()
          : null;

        if (filterStartDate && filterEndDate) {
          return (
            cubiculoStartDate >= filterStartDate &&
            cubiculoEndDate <= filterEndDate
          );
        } else if (filterStartDate) {
          return cubiculoStartDate >= filterStartDate;
        } else if (filterEndDate) {
          return cubiculoEndDate <= filterEndDate;
        }
        return true;
      });
    });

    return {
      ...toRefs(state),
      abrirModalReserva,
      reservarCubiculo,
      filteredCubiculos,
    };
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  background: #002f6c;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin: 20px auto;
  color: #ffffff;
}

.btn-outline-primary {
  color: #002f6c;
  border-color: #002f6c;
}

.btn-outline-primary:hover {
  color: #ffffff;
  background-color: #002f6c;
  border-color: #002f6c;
}

.btn-primary {
  color: #ffffff;
  background-color: #c9a400;
  border-color: #c9a400;
}

.btn-primary:hover {
  background-color: #bfa303;
  border-color: #bfa303;
}

.btn-outline-success {
  color: #28a745;
  border-color: #28a745;
}

.btn-outline-success:hover {
  color: #ffffff;
  background-color: #28a745;
  border-color: #28a745;
}

.btn-danger {
  color: #ffffff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}

.btn-secondary {
  color: #ffffff;
  background-color: #007bff;
  border-color: #007bff;
}

.btn-secondary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.card {
  background-color: #ffffff;
  border: 1px solid #ced4da;
  border-radius: 8px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  color: #002f6c;
}

.card-text {
  color: #6c757d;
}

.modal-content {
  background-color: #ffffff;
  border-radius: 8px;
}

.modal-title {
  color: #002f6c;
}
</style>
