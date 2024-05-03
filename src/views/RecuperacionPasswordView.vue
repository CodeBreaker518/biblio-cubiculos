<template>
    <div class="recovery-page">
      
      <header>
        <img src="@/assets/logo.png" alt="Logo de la empresa">
        <h1>Recuperar Contraseña</h1>
        <router-link to="/login">Volver al inicio de sesión</router-link>
      </header>
  
      <form @submit.prevent="sendRecoveryEmail">
        <label for="email">Correo Electrónico:</label>
        <input type="email" id="email" v-model="email" required>
        <button type="submit">Enviar</button>
      </form>
  
      <div class="instructions">
        <p>Ingrese su dirección de correo electrónico y le enviaremos un enlace seguro para restablecer su contraseña.</p>
      </div>
  
      <footer>
        
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: ''
      };
    },
    methods: {
      sendRecoveryEmail() {
        console.log('Se enviará un correo electrónico de recuperación a:', this.email);
      }
    }
  };
  </script>
  
  <style scoped>
  .recovery-page {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
  
  header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  form {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  footer {
    text-align: center;
    margin-top: 20px;
  }
  
  footer a {
    margin-right: 10px;
  }
  </style>  