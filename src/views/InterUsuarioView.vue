<template>
    <div class="user-dashboard">
      <header class="header">
        <div class="profile" @click="toggleMenu">
          <img src="@/assets/escalinatas.png" alt="Imagen de perfil" class="profile-image">
        </div>
        <ul v-show="showMenu" class="profile-menu active">
          <li>{{ username }}</li>
          <li><router-link to="/Historial">Panel de avisos</router-link></li>
          <li><router-link to="/Ajustes">Ajustes</router-link></li>
          <li><button @click="logout">Cerrar sesión</button></li>
        </ul>
      </header>
  
      <main>
        <div class="user-welcome">
          <h1>Bienvenido, {{ username }}</h1>
        </div>
      </main>
  
      <div class="Cuerpo">
        <div class="fibonacci-container">
            <div class="fibonacci-item fibonacci1">
                <p>CUBICULOS</p>
            </div>
            <div class="fibonacci-item fibonacci3">
                <p>MI CUBICULO</p>
            </div>
            <div class="fibonacci-item fibonacci2">
                <p>SANCIONES</p>
            </div>
            <div class="fibonacci-item fibonacci4">
                <p>LOGROS</p>
            </div>
        </div>
      </div>
  
      <footer>
        <p>&copy; 2024 Cubículos Biblioteca</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: 'Usuario',
        showMenu: false
      };
    },
    methods: {
      toggleMenu() {
        this.showMenu = !this.showMenu;
      },
      logout() {
        this.$router.push('/');
      }
    }
  };
  </script>
  
  <style scoped>
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 25px 0;
  }
  
  nav ul {
    display: flex;
    list-style: none;
  }
  
  .profile {
    cursor: pointer;
  }
  
  .profile-menu {
    position: absolute;
    top: calc(100% + 100px);
    right: 0;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    display: none;
    list-style: none;
  }
  
  .profile-menu li {
    margin-bottom: 10px;
  }
  
  .profile:hover .profile-menu,
  .profile-menu.active {
    display: block;
  }
  
  .profile-image {
    position: absolute;
    top: 10px;
    right: 28px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  
  .Cuerpo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 100px); 
  }

  .fibonacci-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
}

.fibonacci-item {
  flex-grow: 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); 
}


.fibonacci1 {
  background-color: #CBA135;
  height: 50%;
  width: 100%;
}

.fibonacci2 {
  background-color: #F3D785;
  height: 50%;
  width: 25%;
}

.fibonacci3 {
  background-color: #E8C14E;
  height: 50%;
  width: 50%;
}

.fibonacci4 {
  background-color: #FDF2B1;
  height: 50%;
  width: 25%;
}

</style>