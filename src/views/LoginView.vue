<template>
    <div class="container-card">
      <div class="container-form">
        <div class="container-logo">
          <img
              src="@/assets/logo.png"
              class="img-fluid mb-4"
              alt="ug image" />
        </div>
        <form action="">
          <!-- Campos del Login -->
          <div class="campos">
            <!-- Correo electrónico -->
            <div class="campo">
              <label for="correo">Correo </label>
              <input type="email" placeholder="Correo Electrónico" class="formu">
            </div>
            <!-- Contraseña -->
            <div class="campo">
              <label for="contraseña">Contraseña</label>
              <input type="password" class="formu">
            </div>
          </div>
          <!-- Botones del login -->
          <div class="container-btn">
            <input type="submit" value="Acceder" class="btn-aceptar">
          </div>
          <!-- Opciones y términos del login -->
          <div class="opciones">
            <p>Al continuar, aceptas las <span>Condiciones de servicio</span>; y reconoces que leíste nuestra</p>

            <p><span>Política de privacidad.</span></p>

            <p><span>Aviso de recopilación de información.</span></p>

            <div class="container-registro">
              <a href="/Register" class="registrate"><span class="s-registro">¿Aún no estás en CubiBiblio?</span>      <span>Regístrate </span></a>
            </div>
            <div class="container-recupera">
              <a href="/Recuperacion" class="registrate"><span class="s-recupera">¿Olvidaste tu contraseña?</span>     <span>Recupérala aquí</span></a>
            </div>
          </div>
        </form>
      </div>
    </div>
</template>

<style>
html {
   box-sizing: border-box;
   font-size: 62.5%; /* 1rem = 10px */
   font-family: "personal",'Courier New', Courier, monospace;
 }
 *, *:before, *:after {
   box-sizing: inherit;
 }

 *{
   padding: 0;
   margin: 0;
 }

 img{
   width: 100%;
   height: 100%;
 }

 #app{
  display: grid;
  grid-template-columns: 1fr;


 }

 body{
  background-image: url("@/assets/fondofooter.jpg");
  background-repeat: no-repeat;
  background-size: cover;
 } 
 /* Fondo de pantalla */

 /* Carta del formulario */
.container-card{
   width: 90%;
   margin: 0 auto;
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 4rem;
   
}
.container-form{
   font-size: 2.5rem;
   border: .3rem solid #D4B75E;
   width: 50rem;
   height: 65rem;
   padding: 4rem;
   border-radius: 3rem;
   color: #fff;
   background-color: #EDEDEF;
   box-shadow: .5rem .5rem 0 0 #D4B75E;
}

.container-logo{
   width: 25rem;
   text-align: center;
   margin: 0 auto;
   margin-bottom: 2rem;
}

/* Botones */
.container-btn{
   padding: 1rem;
   display: flex;
   justify-content: space-evenly;
   margin-bottom: 2rem;
}

.container-btn .btn-aceptar{
   width: 45%;
   height: 4rem;
   border-radius: .4rem;
   border: none;
   background-color: #D4B75E;
   color: #ffffff;
   font-size: 1.7rem;
   line-height: 4rem;
   font-weight: bold;
   display: block;
   cursor: pointer;
}

/* Términos y condiciones */
.opciones{
   padding: 1.5rem;
   font-size: 1.5rem;
   text-align: center;
   border-top: .1rem solid gray;
   line-height: 2.2rem;
   color: #295182;
}

span{
   font-weight: bold;
}

.container-registro{
   margin-top: 1.5rem;
}

.registrate{
   color: #D4B75E;
   text-decoration: none;
}

.s-registro{
   font-weight: normal;
   color: #295182;
}

.s-recupera{
   color: #295182;
   font-weight: normal;
}

/* Labels e Inputs */
.campo{
   display: flex;
   justify-content: center;
   margin-bottom: 1.5rem;
}

label{
   padding: 1rem;
   background-color: #D4B75E;
   border-radius: 1.4rem 0 0 1.4rem;
   font-size: 1.4rem;
   display: block;
   width: 13rem;
   text-align: center;
   font-weight: bold;
}
.formu{
   font-size: 1.4rem;
   border-radius: 0 1.4rem 1.4rem 0;
   padding: 1rem;
   display: block;
   text-align: center;
   border-color: #D4B75E;
   border: none;
}
</style>