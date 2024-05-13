<template>
    <div class="recovery-page">
      
      <header>
        <img src="@/assets/logo.png" alt="Logo de la empresa">
        <h1>Recuperar Contraseña</h1>
        <router-link to="/login">Volver al inicio de sesión</router-link>
      </header>
  
      <div>
        <label for="email">Correo Electrónico:</label>
        <input type="email" id="email" v-model="email" required>
        <button @click ="sendMail">Enviar</button>
      </div>
  
      <div class="instructions">
        <p>Ingrese su dirección de correo electrónico y le enviaremos un enlace seguro para restablecer su contraseña.</p>
      </div>
  
      <footer>
        
      </footer>
    </div>
  </template>
  
  <script setup>
    import { getAuth,sendPasswordResetEmail } from 'firebase/auth';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const auth = getAuth ();
    const email = ref ("");

    const sendMail= ()=> {

      
      
      if ((email.value != "") && (email.value.includes("@")))
      {
        sendPasswordResetEmail(auth,email.value).then (()=>
        {
          alert ("Se ha enviado el correo para restablecer su contraseña");
          router.push("/")
          
        }).catch((error)=>
        {
          console.log(error)
          alert("Algo salio mal. Intente de nuevo mas tarde")
        });
      }
    }
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