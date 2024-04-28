<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div class="container-fluid"> 
        <div class="navbar-brand me-2">
          <img
            src="@/assets/logo2.png"
            height="3"
            loading="lazy"
            style="margin-top: -1px;"
          />
        </div>
        <button
          ref="navbarToggler"
          class="navbar-toggler"
          type="button"
          data-mdb-target="#navbarButtonsExample"
          aria-controls="navbarButtonsExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="toggleNavbar"
        >
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarButtonsExample">

          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            
          </ul>

          <div class="d-flex align-items-center">
            <router-link to="/login" class="btn btn-link px-3 me-2">Iniciar Sesion</router-link>
            <router-link to="/Register" class="btn btn-primary me-3" style="background-color: #c9a400; border-color: #c9a400;">Registrarse</router-link>
          </div>
        </div>
      </div>
    </nav>

    <div class="image-container">
      <transition name="fade">
        <img :key="currentIndex" :src="currentImage" :alt="'Image ' + (currentIndex + 1)" class="image">
      </transition>
    </div>

  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'HomeView',
  setup() {
    const images = [
      require('@/assets/imagen1.jpg'),
      require('@/assets/imagen2.jpg')
    ];
    const currentIndex = ref(0);
    let intervalId = null;

    const startSlideshow = () => {
      intervalId = setInterval(() => {
        nextImage();
      }, 5000);
    };

    const stopSlideshow = () => {
      clearInterval(intervalId);
    };

    const nextImage = () => {
      currentIndex.value = (currentIndex.value + 1) % images.length;
    };

    const currentImage = ref(images[currentIndex.value]);

    onMounted(() => {
      startSlideshow();
    });

    onBeforeUnmount(() => {
      stopSlideshow();
    });

    const toggleNavbar = () => {
      // Dummy function
    };

    return {
      images,
      currentIndex,
      currentImage,
      toggleNavbar
    };
  }
};
</script>

<style scoped>
.navbar {
  padding-top: 10px; 
  padding-bottom: 10px; 
}
.navbar-brand img {
  height: 150px;
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
