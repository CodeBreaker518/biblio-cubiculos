<template>
  <div class="cuerpo">
    <div class="home">
      <div class="rectangulo-purpura">
        <img src="@/assets/escalinatas.png" class="escalinatas">
      </div> 
      <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div class="row gx-lg-5 align-items-center mb-5">
          <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
          </div>
          <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div id="radius-shape-1" class="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div>
            <div class="card bg-glass">
              <div class="card-body px-4 py-5 px-md-5">
                <form @submit.prevent="submitForm">
                  <h1 class="my-5 display-5 fw-bold ls-tight" style="color: hsl(218, 81%, 95%)">
                    <img src="@/assets/logo.png" class="icon"/>
                  </h1>
                  <div class="row mb-4">
                    <div class="col-md-6">
                      <div data-mdb-input-init class="form-outline">
                        <input type="text" id="nombre" class="form-control"/>
                        <label class="form-label" for="nombre">Nombre</label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div data-mdb-input-init class="form-outline">
                        <input type="text" id="apellido" class="form-control"/>
                        <label class="form-label" for="apellido">Apellido</label>
                      </div>
                    </div>
                  </div>
                  <div class="row mb-4">
                    <div class="col-md-6">
                      <div data-mdb-input-init class="form-outline">
                        <input type="email" id="correo" class="form-control"/>
                        <label class="form-label" for="correo">Correo</label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div data-mdb-input-init class="form-outline">
                        <input type="password" id="contraseña" class="form-control"/>
                        <label class="form-label" for="contraseña">Contraseña</label>
                      </div>
                    </div>
                  </div>
                  <div class="row mb-4">
                    <div class="col-md-6">
                      <button :class="{ 'btn-primary': rolSeleccionado === 'estudiante', 'btn-secondary': rolSeleccionado === 'administrador' }" type="button" class="btn" @click="seleccionarRol('estudiante')">Estudiante</button>
                    </div>
                    <div class="col-md-6">
                      <button :class="{ 'btn-primary': rolSeleccionado === 'administrador', 'btn-secondary': rolSeleccionado === 'estudiante' }" type="button" class="btn" @click="seleccionarRol('administrador')">Administrador</button>
                    </div>
                  </div>
                  <div v-if="rolSeleccionado === 'estudiante' || rolSeleccionado === 'administrador'" class="form-outline mb-4">
                    <input type="text" :id="rolSeleccionado === 'estudiante' ? 'nua' : 'nue'" class="form-control"/>
                    <label class="form-label" :for="rolSeleccionado === 'estudiante' ? 'nua' : 'nue'">{{ rolSeleccionado === 'estudiante' ? 'NUA' : 'NUE' }}</label>
                  </div>
                  <button id="Registro" type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary">
                    Registrarse
                  </button>
                </form>
              </div>
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
      rolSeleccionado: null
    };
  },
  methods: {
    seleccionarRol(rol) {
      this.rolSeleccionado = rol;
    },
    submitForm() {
      console.log('Formulario enviado');
    }
  }
}
</script>

<style scoped>
.cuerpo {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh; 
  background-color: #fdf7d2;
}

.bg-glass {
  background-color: hsla(0, 0%, 100%, 0.9) !important;
  backdrop-filter: saturate(200%) blur(25px);
}

.btn {
  display: block;
  width: 100%;
  border: none;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
}

.btn-primary {
  background-color: #c9a400;
}

.btn-secondary {
  background-color: #6c757d;
}

.icon {
  position: relative;
  width: 100%; 
  height: auto; 
  right: -80px;
  max-width: 300px; /* Cambiar esto por max-width: 100%; */
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

.card.bg-glass {
  position: relative;
  width: 30vw;
  margin: auto;
  top: 25px;
  left: 15vw;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}

.card-body {
  position: relative;
  width: 30vw;
}

#nombre, #apellido, #correo, #contraseña, #nua, #nue {
  margin-bottom: 15px; 
  padding: 2px;
}
</style>