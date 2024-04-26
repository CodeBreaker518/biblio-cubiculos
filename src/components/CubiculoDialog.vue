<template>
  <div class="my-3 p-3 bg-light rounded shadow-sm">
    <h6 class="border-bottom pb-2 mb-0">Editar cubículo</h6>
    <div class="pt-3">
      <input
        class="form-control"
        v-model="cubiculoData.name"
        v-if="cubiculoData"
        placeholder="Nombre del cubículo"
      />
      <input
        class="form-control mt-2"
        v-model="cubiculoData.descripcion"
        v-if="cubiculoData"
        placeholder="Descripción del cubículo"
      />
      <button class="btn btn-primary mt-2" @click="save">Guardar</button>
      <button class="btn btn-secondary mt-2" @click="close">Cerrar</button>
    </div>
  </div>
</template>

<script>
import { ref, watch, toRefs } from 'vue'

export default {
  props: {
    cubiculo: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const cubiculoData = ref({ ...props.cubiculo })

    watch(
      () => props.cubiculo,
      (newCubiculo) => {
        cubiculoData.value = { ...newCubiculo }
      },
      { immediate: true }
    )

    const close = () => {
      emit('close')
    }

    const save = () => {
      emit('save', cubiculoData.value)
    }

    return {
      ...toRefs(cubiculoData),
      close,
      save
    }
  }
}
</script>
