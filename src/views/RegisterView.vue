<template>
  <div class="container-fluid p-0 h-100">
    <div class="row g-0 h-100">
      <!-- Columna de la imagen de fondo -->
      <div class="col-lg-6 d-none d-lg-flex align-items-center justify-content-center position-relative vh-100 bg-image">
        <div class="position-absolute top-50 start-50 translate-middle text-center text-dark w-75">
          <!-- Contenido adicional ?? -->
        </div>
      </div>
      <!-- Columna del formulario -->
      <div class="col-lg-6 d-flex align-items-center justify-content-center position-relative vh-100 bg-color">
        <div class="position-absolute top-50 start-50 translate-middle text-center text-dark w-75">
          <div class="card-background p-4 p-sm-5 shadow">
            <img src="@/assets/logo.png" class="img-fluid mb-4" alt="ug image" />
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <input type="text" class="form-control" id="nombre" placeholder="Nombre" v-model="nombre" required />
              </div>
              <div class="mb-3">
                <input type="text" autocomplete="lastname" class="form-control" id="apellido" placeholder="Apellido" v-model="apellido" required />
              </div>
              <div class="mb-3">
                <input type="email" autocomplete="email" class="form-control" id="correo" placeholder="Correo electrónico" v-model="correo" required />
              </div>
              <div class="mb-3">
                <input type="password" autocomplete="current-password" class="form-control" id="contraseña" placeholder="Contraseña" v-model="contraseña" required />
              </div>
              <div class="mb-3">
                <button type="button" class="btn me-2 mb-2" @click="seleccionarRol('estudiante')" :class="{ active: rolSeleccionado === 'estudiante' }">
                  Estudiante
                </button>
                <button type="button" class="btn mb-2" @click="seleccionarRol('administrador')" :class="{ active: rolSeleccionado === 'administrador' }">
                  Administrador
                </button>
              </div>
              <div v-if="rolSeleccionado === 'estudiante'" class="mb-3">
                <input type="text" id="nua" placeholder="NUA" class="form-control" v-model="nua" />
              </div>
              <div v-if="rolSeleccionado === 'administrador'" class="mb-3">
                <input type="text" id="nue" placeholder="NUE" class="form-control" v-model="nue" />
              </div>
              <div class="mb-3">
                <button id="Registro" type="submit" class="btn btn-primary w-100">
                  Registrarse
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      nombre: "",
      apellido: "",
      correo: "",
      contraseña: "",
      rolSeleccionado: null,
      nua: "",
      nue: "",
    };
  },
  methods: {
    seleccionarRol(rol) {
      this.rolSeleccionado = rol;
      if (rol === "estudiante") {
        this.nue = "";
      } else if (rol === "administrador") {
        this.nua = "";
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
        alert("Por favor completa todos los campos y selecciona si eres estudiante o administrador");
        return;
      }
      if (this.rolSeleccionado === "estudiante" && !this.nua) {
        alert("NUA es requerido");
        return;
      }
      if (this.rolSeleccionado === "administrador" && !this.nue) {
        alert("NUE es requerido");
        return;
      }

      // Envía el correo de verificación
      this.enviarCorreoVerificacion();

      // Muestra la alerta
      alert("Se ha enviado un correo de verificación a " + this.correo);

      // submit the form and clear the fields
      console.log({
        nombre: this.nombre,
        apellido: this.apellido,
        correo: this.correo,
        contraseña: this.contraseña,
        rol: this.rolSeleccionado,
        nua: this.nua,
        nue: this.nue,
      });

      this.nombre = "";
      this.apellido = "";
      this.correo = "";
      this.contraseña = "";
      this.rolSeleccionado = null;
      this.nua = "";
      this.nue = "";
    },
    enviarCorreoVerificacion() {
      
      console.log("Correo de verificación enviado a: " + this.correo);
    },
  },
};
</script>

<style scoped>
.active {
  border: 1px solid #c9a400 !important;
  background-color: #c9a400 !important;
  color: white !important;
}

.bg-image {
  background-image: url("@/assets/escalinatas.png");
  background-size: cover;
  background-position: center;
}

.bg-color {
  background-color: #fdf7d2;
  background-image: url("@/assets/escalinatas.png");
  background-size: cover;
  background-position: center;
}

.card-background {
  border-radius: 20px;
  background-color: white;
}

@media (min-width: 992px) {
  .bg-color {
    background-image: none;
  }
}
</style>