<template>
    <div class="container py-2">
      <div class="row mb-4">
        <div class="col">
          <button
            type="button"
            class="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#createAchievementModal"
          >
            <i class="bi bi-plus-circle"></i> Crear Logro
          </button>
        </div>
      </div>
  
      <div class="row">
        <div v-for="achievement in filteredAchievements" :key="achievement.id" class="col-md-10 col-lg-4">
          <div class="card mb-4 shadow-sm">
            <article class="card-body">
              <section class="d-flex justify-content-between align-items-center">
                <h5 class="card-title">{{ achievement.name }}</h5>
                <span :class="['badge', achievement.completed ? 'bg-success' : 'bg-warning']">
                  {{ achievement.completed ? 'Completado' : 'Pendiente' }}
                </span>
              </section>
              <p class="card-text">{{ achievement.description }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-success"
                    data-bs-toggle="modal"
                    data-bs-target="#assignAchievementModal"
                    @click="selectAchievementForAssignment(achievement)"
                  >
                    <i class="bi bi-person-plus"></i> Asignar
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#editAchievementModal"
                    @click="selectAchievementForEdit(achievement)"
                  >
                    <i class="bi bi-pencil"></i> Editar
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-danger"
                    @click="deleteAchievement(achievement.id)"
                  >
                    <i class="bi bi-trash"></i> Eliminar
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
  
      <!-- Modal para Crear Logro -->
      <div class="modal fade" id="createAchievementModal" tabindex="-1" aria-labelledby="createAchievementModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createAchievementModalLabel">Crear Nuevo Logro</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="createAchievement">
                <div class="mb-3">
                  <label for="createName" class="form-label">Nombre</label>
                  <input type="text" id="createName" v-model="newAchievement.name" class="form-control" />
                </div>
                <div class="mb-3">
                  <label for="createDescription" class="form-label">Descripción</label>
                  <input type="text" id="createDescription" v-model="newAchievement.description" class="form-control" />
                </div>
                <button type="submit" class="btn btn-primary">Crear</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal para Asignar Logro -->
      <div class="modal fade" id="assignAchievementModal" tabindex="-1" aria-labelledby="assignAchievementModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="assignAchievementModalLabel">Asignar Logro</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="assignAchievement">
                <div class="mb-3">
                  <label for="student" class="form-label">Estudiante</label>
                  <select id="student" v-model="selectedStudent" class="form-select">
                    <option v-for="student in students" :key="student.id" :value="student.id">
                      {{ student.name }}
                    </option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary">Asignar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal para Editar Logro -->
      <div class="modal fade" id="editAchievementModal" tabindex="-1" aria-labelledby="editAchievementModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editAchievementModalLabel">Editar Logro</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="editAchievement">
                <div class="mb-3">
                  <label for="editName" class="form-label">Nombre</label>
                  <input type="text" id="editName" v-model="editAchievementForm.name" class="form-control" />
                </div>
                <div class="mb-3">
                  <label for="editDescription" class="form-label">Descripción</label>
                  <input type="text" id="editDescription" v-model="editAchievementForm.description" class="form-control" />
                </div>
                <div class="mb-3 form-check">
                  <input type="checkbox" id="editCompleted" v-model="editAchievementForm.completed" class="form-check-input" />
                  <label for="editCompleted" class="form-check-label">Completado</label>
                </div>
                <button type="submit" class="btn btn-primary">Guardar Cambios</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref, computed } from 'vue'
  import { Modal } from 'bootstrap'
  
  // Datos simulados para estudiantes y logros
  const students = [
    { id: 1, name: 'Juan Pérez' },
    { id: 2, name: 'María López' },
    { id: 3, name: 'Carlos Sánchez' }
  ]
  
  const achievements = reactive([
    { id: 1, name: 'Logro 1', description: 'Completa el curso de Vue.js', completed: true },
    { id: 2, name: 'Logro 2', description: 'Resuelve 10 problemas de matemáticas', completed: false },
    { id: 3, name: 'Logro 3', description: 'Participa en un proyecto de equipo', completed: false }
  ])
  
  const newAchievement = reactive({ name: '', description: '' })
  const selectedStudent = ref(null)
  const editAchievementForm = reactive({ id: null, name: '', description: '', completed: false })
  
  const filteredAchievements = computed(() =>
    achievements.filter((achievement) =>
      achievement.name.toLowerCase().includes('')
    )
  )
  
  function createAchievement() {
    achievements.push({
      id: achievements.length + 1,
      name: newAchievement.name,
      description: newAchievement.description,
      completed: false
    })
    new Modal(document.getElementById('createAchievementModal')).hide()
  }
  
  function assignAchievement() {
    if (selectedStudent.value !== null) {
      console.log(`Asignado el logro ${editAchievementForm.id} a ${selectedStudent.value}`)
      new Modal(document.getElementById('assignAchievementModal')).hide()
    }
  }
  
  function selectAchievementForAssignment(achievement) {
    editAchievementForm.id = achievement.id
    selectedStudent.value = null
    new Modal(document.getElementById('assignAchievementModal')).show()
  }
  
  function selectAchievementForEdit(achievement) {
    editAchievementForm.id = achievement.id
    editAchievementForm.name = achievement.name
    editAchievementForm.description = achievement.description
    editAchievementForm.completed = achievement.completed
    new Modal(document.getElementById('editAchievementModal')).show()
  }
  
  function editAchievement() {
    const achievement = achievements.find((ach) => ach.id === editAchievementForm.id)
    if (achievement) {
      achievement.name = editAchievementForm.name
      achievement.description = editAchievementForm.description
      achievement.completed = editAchievementForm.completed
    }
    new Modal(document.getElementById('editAchievementModal')).hide()
  }
  
  function deleteAchievement(id) {
    const index = achievements.findIndex((ach) => ach.id === id)
    if (index !== -1) {
      achievements.splice(index, 1)
    }
  }
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
    background: #002f6c;
    border-radius: 15px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    max-width: 800px;
    margin: 20px auto;
    color: #ffffff;
  }
  
  .btn-outline-primary {
    color: #007bff;
    border-color: #007bff;
  }
  
  .btn-outline-primary:hover {
    color: #ffffff;
    background-color: #007bff;
    border-color: #007bff;
  }
  
  .card {
    background-color: #ffffff;
    border: 1px solid #ced4da;
    border-radius: 8px;
  }
  
  .card-title {
    font-size: 18px;
    font-weight: bold;
    color: #343a40;
  }
  
  .card-text {
    color: #6c757d;
  }
  
  .badge.bg-success {
    background-color: #28a745;
  }
  
  .badge.bg-warning {
    background-color: #ffc107;
  }
  
  .modal-content {
    background-color: #ffffff;
    border-radius: 8px;
  }
  
  .modal-title {
    color: #343a40;
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }
  </style>
  