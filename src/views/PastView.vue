<template>
  <div class="past-events">
    <div class="container">
      <h1 class="mb-4">Stalo se</h1>
      <div class="row">
        <div class="col-md-9">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div></div>
            <button v-if="isActivated" @click="openAddModal" class="btn btn-primary">Přidat minulou akci</button>
          </div>
          <!-- Past Events items -->
          <div class="past-event-item card mb-4" v-for="pastEvent in filteredPastEvents" :key="pastEvent.id">
            <div class="card-body d-flex">
              <div class="past-event-content flex-grow-1 pe-3">
                <div class="mb-2">
                  <small class="text-muted d-block mb-1">{{ getCzechDate(pastEvent) }}</small>
                  <h5 class="card-title mb-1">{{ pastEvent.title }}</h5>
                  <small class="text-muted location d-block mb-2">
                    <i class="bi bi-geo-alt-fill me-1"></i>{{ pastEvent.location }}
                  </small>
                </div>
                <p class="card-text">{{ pastEvent.content }}</p>
              </div>
              <div class="past-event-image">
                <img 
                  :src="pastEvent.imgURL || defaultEvent" 
                  :alt="pastEvent.title" 
                  class="img-fluid rounded"
                  :class="{ 'grayscale': !pastEvent.imgURL }"
                  @error="handleImageError"
                />
              </div>
              <div v-if="isActivated" class="ms-3 d-flex flex-column justify-content-start align-items-end">
                <button @click="openEditModal(pastEvent)" class="btn btn-sm btn-outline-secondary mb-2">Upravit</button>
                <button @click="handleDeletePastEvent(pastEvent.id)" class="btn btn-sm btn-outline-danger">Smazat</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Filtr podle roku</h5>
              <div class="list-group list-group-flush filter-options">
                <a href="#" 
                   class="list-group-item list-group-item-action filter-option" 
                   :class="{ active: selectedYear === null }"
                   @click.prevent="selectedYear = null">
                  Vše
                </a>
                <a href="#" 
                   v-for="year in availableYears" 
                   :key="year"
                   class="list-group-item list-group-item-action filter-option"
                   :class="{ active: selectedYear === year }"
                   @click.prevent="selectedYear = year">
                  {{ year }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PastEventForm
        v-if="showPastEventModal"
        :pastEvent="currentPastEvent"
        @close="closeModal"
        @save="handleSavePastEvent"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { db } from '@/firebase'
import { collection, onSnapshot, query, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { useAuth } from '@/composables/useAuth'
import PastEventForm from '@/components/PastEventForm.vue'
import defaultEvent from '@/assets/photos/default_event.jpg'
import { format } from 'date-fns'
import { cs } from 'date-fns/locale'

const { isActivated } = useAuth()
const allPastEvents = ref([])
const showPastEventModal = ref(false)
const currentPastEvent = ref(null)
const selectedYear = ref(null)

onMounted(() => {
  const pastEventsCollection = collection(db, 'pastEvents')
  const q = query(pastEventsCollection)
  onSnapshot(q, (snapshot) => {
    allPastEvents.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
})

const openAddModal = () => {
  currentPastEvent.value = null
  showPastEventModal.value = true
}

const openEditModal = (pastEvent) => {
  currentPastEvent.value = pastEvent
  showPastEventModal.value = true
}

const closeModal = () => {
  showPastEventModal.value = false
  currentPastEvent.value = null
}

const handleSavePastEvent = async (pastEventData) => {
  const dataToSave = { ...pastEventData }
  if (dataToSave.id) {
    const pastEventDocRef = doc(db, 'pastEvents', dataToSave.id)
    await updateDoc(pastEventDocRef, dataToSave)
  } else {
    await addDoc(collection(db, 'pastEvents'), dataToSave)
  }
  closeModal()
}

const handleDeletePastEvent = async (id) => {
  if (confirm('Opravdu si přejete smazat tuto minulou akci?')) {
    await deleteDoc(doc(db, 'pastEvents', id))
  }
}

const availableYears = computed(() => {
  const years = new Set(allPastEvents.value.map(item => item.year))
  return Array.from(years).sort((a, b) => b - a)
})

const filteredPastEvents = computed(() => {
  let events = selectedYear.value === null
    ? allPastEvents.value
    : allPastEvents.value.filter(item => item.year === selectedYear.value)
  return [...events].sort((a, b) => {
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(b.date) - new Date(a.date)
  })
})

const handleImageError = (event) => {
  console.error('Image failed to load:', event.target.src)
  event.target.style.display = 'none'
}

const getCzechDate = (pastEvent) => {
  if (pastEvent.dateCz) return pastEvent.dateCz
  if (pastEvent.date) {
    try {
      return format(new Date(pastEvent.date), 'd. MMMM yyyy', { locale: cs })
    } catch (e) {
      return pastEvent.date
    }
  }
  return ''
}
</script>

<style scoped>
.past-event-item {
  transition: transform 0.2s;
  border: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.past-event-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.past-event-content {
  min-width: 0; /* Prevents flex item from overflowing */
}

.past-event-image {
  flex-shrink: 0;
  width: 200px;
  margin-left: 1rem;
}

.past-event-image img {
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 0.5rem;
}

@media (max-width: 768px) {
  .card-body {
    flex-direction: column;
  }
  
  .past-event-image {
    width: 100%;
    margin-left: 0;
    margin-top: 1rem;
  }
  
  .past-event-image img {
    width: 100%;
    height: 200px;
  }
  
  .past-event-content {
    padding-right: 0 !important;
  }
}

.text-muted {
  font-size: 0.85rem;
  color: #6c757d;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.card-title {
  color: #0d6efd;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.btn-outline-primary {
  border-radius: 0.375rem;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
}

.btn-outline-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(13,110,253,0.15);
}

.card-text {
  white-space: pre-line;
}

.list-group-item-action:hover {
  background-color: #f8f9fa;
}

.list-group-item.active {
  background-color: #0d6efd;
  border-color: #0d6efd;
  color: white;
}

.list-group-item-action {
  cursor: pointer;
  transition: all 0.2s;
}

.list-group-item-action:hover:not(.active) {
  background-color: #f8f9fa;
}

.filter-options {
  border-radius: 0.375rem;
  overflow: hidden;
}

.filter-option {
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
  border: 1px solid #dee2e6;
  text-align: center;
  padding: 0.5rem 1rem;
}

.filter-option:last-child {
  margin-bottom: 0;
}

.filter-option.active {
  background-color: #0d6efd;
  border-color: #0d6efd;
  color: white;
}

.filter-option:hover:not(.active) {
  background-color: #f8f9fa;
  border-color: #0d6efd;
  color: #0d6efd;
}

.list-group-flush {
  border: none;
  padding: 0;
}

.img-fluid {
  max-height: 400px;
  width: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
  display: block;
}
.max-width {
  max-width: 200px;
}

.location {
  color: #6c757d;
  font-size: 0.9rem;
}

.location i {
  color: #dc3545;
  font-size: 1rem;
}

.grayscale {
  filter: grayscale(100%);
}
</style> 