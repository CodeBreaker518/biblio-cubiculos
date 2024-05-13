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
            <form @submit.prevent="crearUser">
              <div class="mb-3">
                <input type="text" class="form-control" id="nombre" placeholder="Nombre" v-model="usu_nombre" required />
              </div>
              <div class="mb-3">
                <input type="text" autocomplete="lastname" class="form-control" id="apellido" placeholder="Apellido" v-model="usu_apellido" required />
              </div>
              <div class="mb-3">
                <input type="email" autocomplete="email" class="form-control" id="correo" placeholder="Correo electrónico" v-model="usu_correo" required />
              </div>
              <div class="mb-3">
                <input type="password" autocomplete="current-password" class="form-control" id="contraseña" placeholder="Contraseña" v-model="usu_contraseña" required />
              </div>
              <div class="mb-3">
                <button type="button" class="btn me-2 mb-2" @click="rolest" :class="{ active: rolSeleccionado === 'estudiante' }">
                  Estudiante
                </button>
                <button type="button" class="btn mb-2" @click="roladmin" :class="{ active: rolSeleccionado === 'administrador' }">
                  Administrador
                </button>
              </div>
              <div v-if="rolSeleccionado === 'estudiante'" class="mb-3">
                <input type="text" id="nua" placeholder="NUA" class="form-control" v-model="usu_id" />
              </div>
              <div v-if="rolSeleccionado === 'administrador'" class="mb-3">
                <input type="text" id="nue" placeholder="NUE" class="form-control" v-model="usu_id" />
              </div>
              <div class="mb-3">
                <button type="submit" class="btn btn-primary w-100">
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

<script setup>
 //import auth from "../firebaseConfig";
 import {getAuth,createUserWithEmailAndPassword,sendEmailVerification } from "firebase/auth";
 import {collection,addDoc} from "firebase/firestore"
 import {db} from "../firebaseConfig"
  import {ref} from "vue"; 
  
import { useRouter } from "vue-router";
const router = useRouter();

const rolSeleccionado = "estudiante";

const usu_nombre = ref ("");
const usu_apellido = ref ("");
const usu_correo = ref ("");
const usu_contraseña = ref ("");
const usu_id = ref ("");
const usu_rol= "estudiante";

const auth = getAuth();


const crearUser = () => {

  if (! (usu_nombre.value == "" && usu_apellido.value == "" && usu_correo.value == "" && usu_contraseña.value == "" && usu_id.value == "" && usu_rol.value== ""))
{

  if (usu_correo.value.includes("@") )
  {

    createUserWithEmailAndPassword(auth,usu_correo.value,usu_contraseña.value)
          .then(() =>{
        //  console.log(userCredential);
        //  const user= userCredential;
            console.log("Usuario Creado");

           // Guardado de los datos en firebase 
            
              addDoc(collection(db,'users'),
               {
                  u_id : usu_id.value,
                  u_nombre : usu_nombre.value,
                  u_apellido : usu_apellido.value,
                  u_correo :usu_correo.value,
                  u_rol : usu_rol
               }).then(()=>
               {
                  console.log("Usuario guardado");
                  sendEmailVerification(auth.currentUser)
                  .then(()=> {
                    alert ("Se ha enviado un correo de verficiacion. Verifique su correo para iniciar sesion");
                    console.log ("enviao");
                    router.push("/")
                  })

               })
            
            
            
              // const newUser ={
              //     u_id : usu_id.value,
              //     u_nombre : usu_nombre.value,
              //     u_apellido : usu_apellido.value,
              //     u_correo :usu_correo.value,
              //     u_rol : usu_rol.value
              //   }

          })
          .catch( (error) => {
            //const errorCode = error.code;
            //const errorMessage = error.message;
            console.log(error);
              console.log("Usuario Creado'nt");
          });



  }else {alert ("La direccion de correo no pertenece a la organizacion")}

}else{
  alert ("Complete todos los campos para continuar")
}


}

//Validacion de datos 

  
  // const newUser ={
  //   u_id : "",
  //   u_nombre : "",
  //   u_apellido : "",
  //   u_correo :"",
  //   u_rol : ""
  // }

  // createUserWithEmailAndPassword(auth,"gutierrezcardenasjesus@gmail.com","1234567")
  //       .then(() =>{
  //     //    console.log(userCredential);
  //     //  const user= userCredential;
  //         console.log("Usuario Creado");
  //       })
  //       .catch( (error) => {
  //         //const errorCode = error.code;
  //         //const errorMessage = error.message;
  //         console.log(error);
  //           console.log("Usuario Creado'nt");
  //       });
 
      // const rolest = () =>{
      //    rolSeleccionado = "estudiante";
      //    console.log(rolSeleccionado);
      // }
      // const roladmin = () =>{
      //    rolSeleccionado = "administrador";
      //    console.log(rolSeleccionado);
      // }


 //export default {}


//   data() {
//     return {
//       nombre: "",
//       apellido: "",
//       correo: "",
//       contraseña: "",
//       rolSeleccionado: null,
//       nua: "",
//       nue: "",
//     };
//   },
//   methods: {
//     seleccionarRol(rol) {
//       this.rolSeleccionado = rol;
//       if (rol === "estudiante") {
//         this.nue = "";
//       } else if (rol === "administrador") {
//         this.nua = "";
//       }
//     },
//     submitForm() {
//       // prevent submit if there's an empty field, either nua or nue should be filled depending on the selected role
//       if (
//         !this.nombre ||
//         !this.apellido ||
//         !this.correo ||
//         !this.contraseña ||
//         !this.rolSeleccionado
//       ) {
//         alert("Por favor completa todos los campos y selecciona si eres estudiante o administrador");
//         return;
//       } else 
//       {
//         newUser.usu_nombre = this.nombre;
//         newUser.usu_apellido = this.apellido;
//         if (this.correo.includes("@") )
//         {
//           newUser.usu_correo = this.correo;
//         }
//         else
//         {
//           alert("El correo electronico no peretenece a la organizacion");
//         }
        
//       }
//       if (this.rolSeleccionado === "estudiante" && !this.nua) {
//         alert("NUA es requerido");
//         newUser.usu_rol = this.rolSeleccionado;
//         newUser.usu_id = this.nua;
        
//         return;
//       }
//       if (this.rolSeleccionado === "administrador" && !this.nue) {
//         alert("NUE es requerido");
//         newUser.usu_rol = this.rolSeleccionado;
//         newUser.usu_id = this.nue;
//         return;
//       }

//       console.log (this.$data);
//       console.log (newUser);
//       console.log (auth);

//       //Creamos el usuario con las credenciales proporcionadas 

//       createUserWithEmailAndPassword("gutierrezcardenasjesus@gmail.com","1234567")
//         .then(() =>{
//         //  console.log(userCredential);
//      //   const user= userCredential;
//           console.log("Usuario Creado");
//         })
//         .catch( (error) => {
//           //const errorCode = error.code;
//           //const errorMessage = error.message;
//           console.log(error);
//             console.log("Usuario Creado'nt");
//         });

//       // Envía el correo de verificación
//       this.enviarCorreoVerificacion();

//       // Muestra la alerta
//       //alert("Se ha enviado un correo de verificación a " + this.correo);

//       // submit the form and clear the fields
//       // console.log({
//       //   nombre: this.nombre,
//       //   apellido: this.apellido,
//       //   correo: this.correo,
//       //   contraseña: this.contraseña,
//       //   rol: this.rolSeleccionado,
//       //   nua: this.nua,
//       //   nue: this.nue,
//       // });

//       this.nombre = "";
//       this.apellido = "";
//       this.correo = "";
//       this.contraseña = "";
//       this.rolSeleccionado = null;
//       this.nua = "";
//       this.nue = "";
//     },
//     enviarCorreoVerificacion() {
      
//       //console.log("Correo de verificación enviado a: " + this.correo);
//     },
//   },
// };
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