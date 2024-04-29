<template>
    <div class="settings">
      <h2>Ajustes de Usuario</h2>
      <form @submit.prevent="saveSettings">
        <div class="form-group">
          <label for="username">Nombre de Usuario:</label>
          <input type="text" id="username" v-model="userData.username">
        </div>
        <div class="form-group">
          <label for="email">Correo Electrónico:</label>
          <input type="email" id="email" v-model="userData.email">
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="userData.password">
        </div>
        <div class="form-group">
          <label for="bio">Biografía:</label>
          <textarea id="bio" v-model="userData.bio"></textarea>
        </div>
        <div class="form-group">
          <label for="avatar">Avatar:</label>
          <input type="file" id="avatar" @change="handleAvatarChange">
          <img :src="avatarPreview" alt="Avatar" class="avatar-preview" v-if="avatarPreview">
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userData: {
          username: '',
          email: '',
          password: '',
          bio: '',
          avatar: null
        },
        avatarPreview: null
      };
    },
    methods: {
      saveSettings() {
        // Aquí puedes enviar los datos del usuario a tu servidor para guardarlos
        console.log('Guardando ajustes...', this.userData);
        // Puedes hacer una petición HTTP aquí para guardar los datos
      },
      handleAvatarChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.userData.avatar = file;
          this.avatarPreview = URL.createObjectURL(file);
        } else {
          this.userData.avatar = null;
          this.avatarPreview = null;
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .settings {
    max-width: 500px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"],
  textarea {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
  }
  
  button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .avatar-preview {
    max-width: 100px;
    margin-top: 0.5rem;
  }
  </style>  