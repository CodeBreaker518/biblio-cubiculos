<!-- Vista para permitirle al administrador, llevar un registro de las reservas que se han hecho, asi como actualizar el estado de los cubiculos -->
<script setup></script>

<template></template>

<script>
export default {
  data() {
    return {
      reservas: [
        { id: 1, user_id: 'Usuario1', start_time: 1 },
        { id: 2, usuario: 'Usuario2', cubiculo: 2 }
        // Otros registros de reservas
      ],
      cubiculos: [
        {
          id: 1,
          name: 'Cubículo 1',
          descripcion: 'Cubículo de 4x4 metros',
          status: false,
          usuario: 'Usuario 1'
        },
        {
          id: 2,
          name: 'Cubículo 2',
          descripcion: 'Cubículo de 5x5 metros',
          status: true,
          usuario: null
        }
      ]
    }
  }
}
</script>
