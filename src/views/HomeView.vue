<script setup>
import { RouterLink } from 'vue-router'
import image1 from '@/assets/imagen1.jpg'
import image2 from '@/assets/imagen2.jpg'
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div class="container-fluid px-5">
        <div class="navbar-brand me-2">
          <img src="@/assets/logo2.png" height="30" loading="lazy" style="margin-top: -1px" />
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarButtonsExample"
          aria-controls="navbarButtonsExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarButtonsExample">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <div class="d-flex align-items-center">
            <RouterLink to="/login" class="btn btn-link px-3 me-2">Iniciar Sesión</RouterLink>
            <RouterLink
              to="/register"
              class="btn btn-primary me-3"
              style="background-color: #c9a400; border-color: #c9a400"
              >Registrarse</RouterLink
            >
          </div>
        </div>
      </div>
    </nav>

    <div id="carousell" class="image-container px-5">
      <transition name="fade">
        <img
          :key="currentIndex"
          :src="currentImage"
          :alt="'Image ' + (currentIndex + 1)"
          class="image img-fluid"
        />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      images: [image1, image2],
      currentIndex: 0,
      intervalId: null
    }
  },
  mounted() {
    this.startSlideshow()
  },
  beforeUnmount() {
    this.stopSlideshow()
  },
  methods: {
    startSlideshow() {
      this.intervalId = setInterval(() => {
        this.nextImage()
      }, 5000)
    },
    stopSlideshow() {
      clearInterval(this.intervalId)
    },
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length
    }
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex]
    }
  }
}
</script>

<style scoped>
#carousell {
  background-color: #f8f9fa;
  height: 745px;
  overflow: hidden;
}
.navbar {
  padding-top: 10px;
  padding-bottom: 10px;
}
.navbar-brand img {
  height: 130px;
}
.btn.btn-link {
  color: #c9a400;
}
.image-container {
  height: 745px;
  overflow-y: hidden;
}
.image-container img {
  width: 100%;
  height: 100%;
  display: block;
  margin-bottom: 10px;
  object-fit: cover;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
