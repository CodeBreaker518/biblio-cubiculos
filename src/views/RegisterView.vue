<template>
  <div class="cuerpo">
    <div class="home">
      <div class="rectangulo-purpura">
        <img src="@/assets/escalinatas.png" class="escalinatas" />
      </div>
      <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div class="row gx-lg-5 align-items-center mb-5">
          <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10"></div>
          <div class="card bg-glass mx-auto my-5">
            <div class="card-body">
              <h2 class="fw-light mb-4">Registrarse</h2>
              <img src="@/assets/logo.png" class="icon mb-4" />
              <form @submit.prevent="submitForm">
                <div class="mb-3">
                  <label for="nombre" class="form-label">Nombre</label>
                  <input type="text" id="nombre" class="form-control" v-model="nombre" required />
                </div>
                <div class="mb-3">
                  <label for="apellido" class="form-label">Apellido</label>
                  <input
                    type="text"
                    id="apellido"
                    class="form-control"
                    v-model="apellido"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="correo" class="form-label">Correo</label>
                  <input type="email" id="correo" class="form-control" v-model="correo" required />
                </div>
                <div class="mb-3">
                  <label for="contraseña" class="form-label">Contraseña</label>
                  <input
                    type="password"
                    id="contraseña"
                    class="form-control"
                    v-model="contraseña"
                    required
                  />
                </div>
                <div class="mb-3">
                  <button
                    type="button"
                    class="btn btn-outline-primary w-100"
                    :class="{ 'btn-active': rolSeleccionado === 'estudiante' }"
                    @click="seleccionarRol('estudiante')"
                  >
                    Estudiante
                  </button>
                </div>
                <div class="mb-3">
                  <button
                    type="button"
                    class="btn btn-outline-primary w-100"
                    :class="{ 'btn-active': rolSeleccionado === 'administrador' }"
                    @click="seleccionarRol('administrador')"
                  >
                    Administrador
                  </button>
                </div>
                <div v-if="rolSeleccionado === 'estudiante'" class="mb-3">
                  <label for="nua" class="form-label">NUA</label>
                  <input type="text" id="nua" class="form-control" v-model="nua" required />
                </div>
                <div v-if="rolSeleccionado === 'administrador'" class="mb-3">
                  <label for="nue" class="form-label">NUE</label>
                  <input type="text" id="nue" class="form-control" v-model="nue" required />
                </div>
                <button type="submit" class="btn btn-primary w-100">Registrarse</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      nombre: '',
      apellido: '',
      correo: '',
      contraseña: '',
      rolSeleccionado: null,
      nua: '',
      nue: ''
    }
  },
  methods: {
    seleccionarRol(rol) {
      this.rolSeleccionado = rol
      if (rol === 'estudiante') {
        this.nue = ''
      } else if (rol === 'administrador') {
        this.nua = ''
      }
    },
    submitForm() {
      // prevent submit if there's an empty field, either nua or nue should be filled depending on the selected role
      if (
        !this.nombre ||
        !this.apellido ||
        !this.correo ||
        !this.contraseña ||
        !this.rolSeleccionado
      ) {
        alert('Por favor selecciona si eres estudiante o administrador')
        return
      }
      if (this.rolSeleccionado === 'estudiante' && !this.nua) {
        alert('NUA es requerido')
        return
      }
      if (this.rolSeleccionado === 'administrador' && !this.nue) {
        alert('NUE es requerido')
        return
      }

      console.log({
        nombre: this.nombre,
        apellido: this.apellido,
        correo: this.correo,
        contraseña: this.contraseña,
        rol: this.rolSeleccionado,
        nua: this.nua,
        nue: this.nue
      })
    }
  }
}
</script>

<style scoped>
.btn-active {
  background-color: rgb(88, 88, 250);
  color: white;
}

.cuerpo {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: -250px;
  width: 100%;
  height: 100vh;
  background-color: #fdf7d2;
}

.bg-glass {
  background-color: hsla(0, 0%, 100%, 0.9) !important;
  backdrop-filter: saturate(200%) blur(25px);
}

.icon {
  position: relative;
  width: 100%;
  height: auto;
  right: -20px;
  max-width: 300px;
  max-height: 300px;
}

.rectangulo-purpura {
  position: fixed;
  top: 0;
  left: 0;
  width: 30%;
  height: 100vh;
  background-color: purple;
}

.card {
  width: 100%;
  max-width: 100vw;
  margin: auto;
  top: 25px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}
</style>
