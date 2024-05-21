<template>
  <div class="container p-6">
    <!-- RENDERIZAR TODOS LOS CUBICULOS CON INFORMACION EXTRA -->
    <div class="row">
      <h4>Elige un Cubiculo para reservarlo</h4>
      <div class="col-md-10 col-lg-4 mt-4" v-for="cubiculo in filteredCubiculos" :key="cubiculo.id">
        <div class="card mb-4 shadow-sm h-100">
          <div class="card-body">
            <section class="d-flex flex-column justify-content-between align-items-start mb-2">
              <h5 class="card-title">{{ cubiculo.nombre }}</h5>
              <div class="d-flex flex-row justify-content-between align-items-center mb-2 gap-2">
                <BadgeStatus :status="cubiculo.status" />
                <BadgeCapacity :capacity="cubiculo.capacidad" />
              </div>
              <p class="card-text mb-2">{{ cubiculo.descripcion }}</p>
            </section>

            <div class="card mb-3">
              <div class="card-body">
                <p class="user-title" v-if="cubiculo.user">Usuario: {{ getUser(cubiculo.user) }}</p>
                <p class="user-title" v-else>Usuario: Ninguno</p>

                <p class="card-text" v-if="cubiculo.user">
                  <strong>Fecha de inicio: <br /></strong> {{ cubiculo.fecha_inicio }}
                </p>
                <p class="card-text" v-if="cubiculo.user">
                  <strong>Fecha de fin:<br /></strong> {{ cubiculo.fecha_fin }}
                </p>
              </div>
            </div>

            <button
              type="button"
              class="btn btn-sm"
              :class="cubiculo.user ? 'btn-danger' : 'btn-outline-success'"
              data-bs-toggle="modal"
              data-bs-target="#createReservationModal"
              :disabled="cubiculo.user"
              @click="abrirModalReserva(cubiculo)">
              {{ cubiculo.user ? "Reservado" : "Reservar" }}
            </button>
          </div>
        </div>
      </div>

      <!-- Modal para Reservar Cubículo -->
      <div
        class="modal fade"
        id="createReservationModal"
        tabindex="-1"
        aria-labelledby="createReservationModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-md">
          <div class="modal-content">
            <div class="modal-header bg-primary text-white">
              <h5 class="modal-title text-white" id="createReservationModalLabel">Reservar Cubículo</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-black">
              <div class="mb-3">
                <label for="usuario" class="form-label">Usuario</label>
                <select class="form-select" v-model="usuario">
                  <option disabled value="">Seleccionar usuario</option>
                  <option v-for="user in usuarios" :key="user.id" :value="user.id">{{ user.u_nombre }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="fecha" class="form-label">Fecha</label>
                <input type="date" class="form-control" v-model="fecha" />
              </div>
              <div class="row mb-3">
                <div class="col">
                  <label for="horaInicio" class="form-label">Hora de inicio</label>
                  <input type="time" class="form-control" v-model="horaInicio" />
                </div>
                <div class="col">
                  <label for="horaFin" class="form-label">Hora de finalización</label>
                  <input type="time" class="form-control" v-model="horaFin" />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="reservarCubiculo(cubiculoActual)">
                Reservar
              </button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BadgeStatus from "../../components/BadgeStatus.vue";
import BadgeCapacity from "../../components/BadgeCapacity.vue";
import { reactive, onMounted, computed, toRefs } from "vue";
import { collection, addDoc, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Asegúrate de que la ruta sea correcta

export default {
  components: {
    BadgeStatus,
    BadgeCapacity,
  },
  setup() {
    const state = reactive({
      cubiculoActual: null,
      cubiculos: [],
      usuario: null,
      fecha: null,
      horaInicio: null,
      horaFin: null,
      usuarios: [],
      filterStartDate: null,
      filterEndDate: null,
    });

    const usuariosCollection = collection(db, "users"); // Cambia 'usuarios' por el nombre de tu colección de usuarios
    const cubiculosCollection = collection(db, "cubiculos");

    const cargarCubiculos = () => {
      onSnapshot(cubiculosCollection, (snapshot) => {
        state.cubiculos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      });
    };

    const cargarUsuarios = () => {
      onSnapshot(usuariosCollection, (snapshot) => {
        state.usuarios = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      });
    };

    const abrirModalReserva = (cubiculo) => {
      state.cubiculoActual = cubiculo;
    };

    const reservarCubiculo = async () => {
      if (!state.usuario || !state.fecha || !state.horaInicio || !state.horaFin) {
        alert("Todos los campos son obligatorios");
        return;
      }

      try {
        const usuarioSeleccionado = state.usuarios.find((user) => user.id === state.usuario);
        if (!usuarioSeleccionado) {
          alert("El usuario seleccionado no es válido");
          return;
        }

        // Crear la reserva
        const reservaRef = await addDoc(collection(db, "reserva"), {
          r_cubiculo: state.cubiculoActual.id,
          r_usuario: usuarioSeleccionado.id,
          r_fecha: state.fecha,
          r_hora_inicio: state.horaInicio,
          r_hora_fin: state.horaFin,
        });

        // Actualizar el documento de usuario con el ID de la reserva
        const usuarioDoc = doc(db, "users", usuarioSeleccionado.id);
        await updateDoc(usuarioDoc, {
          u_reserva_id: reservaRef.id,
        });

        // Actualizar el documento del cubículo
        const cubiculoDoc = doc(db, "cubiculos", state.cubiculoActual.id);
        await updateDoc(cubiculoDoc, {
          status: false,
          user: usuarioSeleccionado.id,
          fecha_inicio: state.fecha + " " + state.horaInicio,
          fecha_fin: state.fecha + " " + state.horaFin,
        });
      } catch (error) {
        console.error("Error al reservar el cubículo: ", error);
      }
    };

    const filteredCubiculos = computed(() => {
      return state.cubiculos.filter((cubiculo) => {
        if (!cubiculo.start_date || !cubiculo.end_date) {
          return true;
        }
        const cubiculoStartDate = new Date(cubiculo.start_date).getTime();
        const cubiculoEndDate = new Date(cubiculo.end_date).getTime();
        const filterStartDate = state.filterStartDate ? new Date(state.filterStartDate).getTime() : null;
        const filterEndDate = state.filterEndDate ? new Date(state.filterEndDate).getTime() : null;

        if (filterStartDate && filterEndDate) {
          return cubiculoStartDate >= filterStartDate && cubiculoEndDate <= filterEndDate;
        } else if (filterStartDate) {
          return cubiculoStartDate >= filterStartDate;
        } else if (filterEndDate) {
          return cubiculoEndDate <= filterEndDate;
        }
        return true;
      });
    });

    onMounted(() => {
      cargarCubiculos();
      cargarUsuarios();
    });

    const getUser = (userId) => {
      const user = state.usuarios.find((u) => u.id === userId);
      return user ? user.u_nombre : "Desconocido";
    };

    return {
      ...toRefs(state),
      abrirModalReserva,
      reservarCubiculo,
      filteredCubiculos,
      getUser,
    };
  },
};
</script>

<style scoped>
.cubicles {
  max-height: 200px;
  overflow-y: auto;
}

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

.user-title {
  font-weight: bold;
}
</style>
