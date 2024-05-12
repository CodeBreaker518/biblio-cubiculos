<template>
  <div class="container py-2">
    <div class="row">
      <div
        class="col-md-10 col-lg-4"
        v-for="cubiculo in cubiculos"
        :key="cubiculo.id">
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

            <!-- MODAL TRIGGER TO CREATE A RESERVATION -->
            <button
              type="button"
              class="btn btn-sm"
              :class="cubiculo.usuario ? 'btn-danger' : 'btn-outline-success'"
              data-bs-toggle="modal"
              data-bs-target="#createReservationModal"
              data-bs-whatever="Reservar cubículo"
              :disabled="cubiculo.usuario"
              @click="abrirModalReserva(cubiculo)">
              {{ cubiculo.usuario ? "Reservado" : "Reservar" }}
            </button>

            <!-- MODAL TO CREATE A RESERVATION -->
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
                      <!-- Combobox para seleccionar usuario -->
                      <label for="usuario">Usuario</label>
                      <select class="form-select" v-model="usuario">
                        <option
                          v-for="user in usuarios"
                          :key="user.id"
                          :value="user.id">
                          {{ user.name }}
                        </option>
                      </select>

                      <!-- Campo de fecha -->
                      <label for="fecha">Fecha</label>
                      <input type="date" class="form-control" v-model="fecha" />

                      <!-- Campos de hora de inicio y fin -->
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

            <!--  -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

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
    });

    function abrirModalReserva(cubiculo) {
      state.cubiculoActual = cubiculo;
    }

    function reservarCubiculo() {
      // Aquí puedes manejar la lógica para reservar el cubículo con los datos ingresados
      const usuario = state.usuarios.find((u) => u.id === state.usuario);
      if (!usuario) {
        return;
      }

      if (!state.fecha || !state.horaInicio || !state.horaFin) {
        return;
      }
      // Agregar las fechas de inicio y fin al cubículo
      state.cubiculoActual.start_date = state.horaInicio;
      state.cubiculoActual.end_date = state.horaFin;

      // Actualizar el estado y el usuario del cubículo
      state.cubiculoActual.status = true;
      state.cubiculoActual.usuario = usuario;

      console.log(
        `Reserva creada:
        Cubículo ID: ${state.cubiculoActual.id}
        Usuario: ${usuario.id}
        Fecha: ${state.fecha}
        Hora de inicio: ${state.horaInicio}
        Hora de fin: ${state.horaFin}`
      );
    }

    return {
      ...toRefs(state),
      abrirModalReserva,
      reservarCubiculo,
    };
  },
};
</script>
