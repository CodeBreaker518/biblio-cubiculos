  <template>
    <div class="reserva-cubiculo">
      <h1>Reservar Cubículo</h1>

      <form @submit.prevent = "crearReserva">
        
        <div class="mb-3">
          <label for="cubiculo" class="form-label">Cubículo</label>
          <select class="form-select" v-model="cubiculo" required>
            <option v-for="cub in cubiculos" :key="cub.id" :value="cub.id">
              {{ cub.name }}
            </option>
          </select>
        </div>
        
        <div class="mb-3">
          <label for="fecha" class="form-label">Fecha</label>
          <input type="date" class="form-control" v-model="fecha" required />
        </div>
        
        <div class="mb-3">
          <label for="horaInicio" class="form-label">Hora de inicio</label>
          <input type="time" class="form-control" v-model="horaInicio" required />
        </div>
        
        <div class="mb-3">
          <label for="horaFin" class="form-label">Hora de finalización</label>
          <input type="time" class="form-control" v-model="horaFin" required />
        </div>
        
        <button type="submit" class="btn btn-primary">Reservar cubículo</button>
      </form>
    </div>
  </template>
  
  <script setup>

//import { ref } from "vue";
import { useRouter } from "vue-router";

import { getAuth ,onAuthStateChanged } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { ref } from "vue";
import { db } from "../firebaseConfig";
 const router = useRouter();

const auth = getAuth();
var usuario = ref("");
const cubiculo  = ref("");
const fecha = ref("");
const horaInicio = ref("");
const horaFin = ref("");
const status = ref("open");
const cubiculos = [
          { id: 1, name: 'Cubículo 1' },
          { id: 2, name: 'Cubículo 2' },
          { id: 3, name: 'Cubículo 3' }]



onAuthStateChanged(auth, (user) => {
  if (user) {

    usuario= user.uid;
    console.log(usuario);

  } else {
    console.log("No existe usuario loggeado");
    router.push("/");
  }
});

const crearReserva = async () => {

  if ( cubiculo.value && fecha.value && horaFin.value && horaFin.value)
  {
      await addDoc(collection (db,"reserva"), 
      {
        r_usuario : usuario,
        r_cubiculo : cubiculo.value,
        r_fecha : fecha.value,
        r_hora_inicio : horaFin.value,
        r_hora_fin : horaInicio.value,
        r_status : status

        
      });
      alert("Reserva Creada con exito")
      console.log ("Reserva Creada ");
      router.push('/InterUsuario');
      
  }
  else
  {
    alert("Complete todos los campos para continuar");
  }
}



  // export default {
  //   data() {
  //     // return {
  //     //   cubiculo: '',
  //     //   fecha: '',
  //     //   horaInicio: '',
  //     //   horaFin: '',
  //     //   cubiculos: [
  //     //     { id: 1, name: 'Cubículo 1' },
  //     //     { id: 2, name: 'Cubículo 2' },
  //     //     { id: 3, name: 'Cubículo 3' }
  //     //   ]
  //     // };
  //   },
  //   methods: {
  //     handleSubmit() {
  //       const reserva = {
  //         usuario: this.usuario,
  //         cubiculo: this.cubiculo,
  //         fecha: this.fecha,
  //         horaInicio: this.horaInicio,
  //         horaFin: this.horaFin
  //       };
  //       console.log('Reserva realizada:', reserva);
  //       // Aquí puedes realizar una solicitud a la API para guardar la reserva
  //     }
  //   }
  // };
  </script>
  
  <style scoped>
  .reserva-cubiculo {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .mb-3 {
    margin-bottom: 1rem;
  }
  </style>
  