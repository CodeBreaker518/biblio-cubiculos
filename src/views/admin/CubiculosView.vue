<template>
  <div class="container py-2">
    <div class="row">
      <div class="py-4">
        <button
          type="button"
          class="btn btn-outline-primary"
          data-bs-toggle="modal"
          data-bs-target="#crearCubiculoModal"
          data-bs-whatever="Crear cubículo"
        >
          <i class="bi bi-plus-circle-dotted"></i>
          Crear Cubiculo
        </button>
      </div>

      <div class="row">
        <div v-for="cubiculo in cubiculos" :key="cubiculo.id" class="col-md-10 col-lg-4">
          <div class="card mb-4 shadow-sm">
            <article class="card-body">
              <section class="d-flex justify-content-between align-items-center">
                <h5 class="card-title">{{ cubiculo.name }}</h5>
                <Badge :status="cubiculo.status" />
              </section>
              <p class="card-text">{{ cubiculo.descripcion }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-success"
                    data-bs-toggle="modal"
                    data-bs-target="#editarCubiculoModal"
                    data-bs-whatever="Editar cubículo"
                    @click="editarCubiculo(cubiculo)"
                  >
                    <i class="bi bi-pencil-square"></i>
                    Editar
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-danger"
                    @click="eliminarCubiculo(cubiculo)"
                  >
                    <i class="bi bi-trash-fill"></i>
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="editarCubiculoModal"
      tabindex="-1"
      aria-labelledby="editarCubiculoModal"
      aria-hidden="true"
      modal-dialog
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editarCubiculoModal">Editar Cubiculo</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div v-if="cubiculoToEdit">
              <label for="name">Nombre</label>
              <input
                id="name"
                class="form-control mt-1 mb-4"
                v-model="cubiculoToEdit.name"
                placeholder="Nombre del cubículo"
              />
              <label for="descripcion">Descripción</label>
              <input
                id="descripcion"
                class="form-control mt-1 mb-4"
                v-model="cubiculoToEdit.descripcion"
                placeholder="Descripción del cubículo"
              />
              <button class="btn btn-success mt-2" @click="saveCubiculo" data-bs-dismiss="modal">
                Guardar cambios
              </button>
              <button type="button" class="btn btn-secondary ms-2 mt-2" data-bs-dismiss="modal">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL PARA CREAR UN CUBICULO -->
    <div
      class="modal fade"
      id="crearCubiculoModal"
      tabindex="-1"
      aria-labelledby="crearCubiculoModal"
      aria-hidden="true"
      modal-dialog
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="crearCubiculoModal">Crear Cubiculo</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div>
              <label for="name">Nombre</label>
              <input class="form-control" v-model="name" placeholder="Nombre del cubículo" />

              <label for="descripcion">Descripción</label>
              <input
                class="form-control mt-2"
                v-model="descripcion"
                placeholder="Descripción del cubículo"
              />
              <button
                class="btn btn-primary mt-2"
                data-bs-dismiss="modal"
                @click="agregarCubiculo"
                :disabled="!name || !descripcion"
              >
                Agregar cubículo
              </button>
              <button
                type="button"
                class="btn btn-secondary ms-2 mt-2"
                data-bs-dismiss="modal"
                @click="clearInputs"
              >
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
import Badge from '@/components/BadgeStatus.vue'
import { reactive, toRefs } from 'vue'

export default {
  components: {
    Badge
  },
  setup() {
    const state = reactive({
      name: '',
      descripcion: '',
      cubiculos: [
        {
          id: 1,
          name: 'Cubículo 1',
          descripcion: 'Cubículo de 4x4 metros',
          status: false,
          usuario: 'Usuario 1'
        },
        {
          id: 2,
          name: 'Cubículo 2',
          descripcion: 'Cubículo de 5x5 metros',
          status: true,
          usuario: null
        }
      ],
      cubiculoToEdit: null,
      editDialogOpen: false
    })

    const agregarCubiculo = () => {
      if (!state.name || !state.descripcion) {
        return
      }
      const newCubiculo = {
        id: state.cubiculos.length + 1,
        name: state.name,
        descripcion: state.descripcion,
        status: true,
        usuario: 'Usuario 1'
      }
      state.cubiculos.push(newCubiculo)
      state.name = ''
      state.descripcion = ''
    }

    const editarCubiculo = (cubiculo) => {
      state.cubiculoToEdit = { ...cubiculo }
      state.editDialogOpen = true
    }

    const saveCubiculo = () => {
      const index = state.cubiculos.findIndex((c) => c.id === state.cubiculoToEdit.id)
      if (index !== -1) {
        state.cubiculos[index] = state.cubiculoToEdit
        state.cubiculoToEdit = null
        state.editDialogOpen = false
      }
    }

    const cancelEdit = () => {
      state.cubiculoToEdit = null
      state.editDialogOpen = false
    }

    const eliminarCubiculo = (cubiculo) => {
      state.cubiculos = state.cubiculos.filter((c) => c.id !== cubiculo.id)
    }

    const clearInputs = () => {
      state.name = ''
      state.descripcion = ''
    }

    return {
      ...toRefs(state),
      agregarCubiculo,
      editarCubiculo,
      saveCubiculo,
      eliminarCubiculo,
      cancelEdit,
      clearInputs
    }
  }
}
</script>
