<template>
    <div class="container-fluid">
      <div class="row">
        <main class="col-md-9 col-lg-10 px-md-4">
          <div class="pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Crear Aviso</h1>
          </div>
          <div class="container">
            <form @submit.prevent="crearAviso">
              <div class="mb-3">
                <label for="titulo" class="form-label">Título</label>
                <input type="text" class="form-control" id="titulo" v-model="nuevoAviso.titulo" required>
              </div>
              <div class="mb-3">
                <label for="contenido" class="form-label">Contenido</label>
                <textarea class="form-control" id="contenido" v-model="nuevoAviso.contenido" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Crear Aviso</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        nuevoAviso: {
          titulo: '',
          contenido: ''
        }
      };
    },
    methods: {
      crearAviso() {
        // Emitir el evento 'nuevo-aviso-creado' junto con el nuevo aviso
        this.$emit('nuevo-aviso-creado', this.nuevoAviso);
  
        // Limpiar los campos del formulario
        this.nuevoAviso.titulo = '';
        this.nuevoAviso.contenido = '';
      }
    }
  }
  </script>
  
  <style scoped>
  main {
    width: 100%;
  }
  </style>
  