<template>
  <div class="events">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Nadcházející akce</h1>
        <button v-if="isActivated" @click="openAddModal" class="btn btn-primary">Přidat akci</button>
      </div>

      <!-- All Events -->
      <section class="mb-5">
        <div v-if="sortedEvents.length" class="row g-4">
          <div class="col-md-6 col-lg-4" v-for="event in sortedEvents" :key="event.id">
            <div class="card h-100">
              <img :src="event.image || defaultEvent" class="card-img-top" :alt="event.title">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h5 class="card-title mb-0">{{ event.title }}</h5>
                  <span class="badge bg-primary">{{ formatCzechDate(event.date) }}<span v-if="event.time"> v {{ event.time }}</span></span>
                </div>
                <p class="card-text" style="white-space: pre-wrap;">{{ event.description }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">
                    <i class="bi bi-geo-alt-fill me-1"></i>
                    {{ event.location }}
                  </small>
                  <div v-if="isActivated">
                    <button @click="openEditModal(event)" class="btn btn-sm btn-outline-secondary me-2">Upravit</button>
                    <button @click="handleDeleteEvent(event.id)" class="btn btn-sm btn-outline-danger">Smazat</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p>V databázi nejsou žádné akce, nebo se je nepodařilo načíst.</p>
        </div>
      </section>

      <EventForm 
        v-if="showEventModal" 
        :event="currentEvent" 
        @close="closeModal" 
        @save="handleSaveEvent"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { db } from '@/firebase';
import { collection, onSnapshot, query, orderBy, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '@/composables/useAuth';
import EventForm from '@/components/EventForm.vue';
import defaultEvent from '@/assets/photos/default_event.jpg';
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';

const { isActivated } = useAuth();
const allEvents = ref([]);
const showEventModal = ref(false);
const currentEvent = ref(null);

onMounted(() => {
  const eventsCollection = collection(db, 'events');
  // REMOVED ORDERBY AND FILTERING TO GUARANTEE THE QUERY WORKS
  const q = query(eventsCollection);
  onSnapshot(q, (snapshot) => {
    allEvents.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  });
});

const openAddModal = () => {
  currentEvent.value = null;
  showEventModal.value = true;
};

const openEditModal = (event) => {
  currentEvent.value = event;
  showEventModal.value = true;
};

const closeModal = () => {
  showEventModal.value = false;
  currentEvent.value = null;
};

const handleSaveEvent = async (eventData) => {
  const dataToSave = { ...eventData };

  if (dataToSave.id) {
    const eventDocRef = doc(db, 'events', dataToSave.id);
    await updateDoc(eventDocRef, dataToSave);
  } else {
    await addDoc(collection(db, 'events'), dataToSave);
  }

  closeModal();
};

const handleDeleteEvent = async (id) => {
  if (confirm('Opravdu si přejete smazat tuto akci?')) {
    await deleteDoc(doc(db, 'events', id));
  }
};

const formatCzechDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString.split(' ')[0]);
  return format(date, 'd. MMMM yyyy', { locale: cs });
};

const sortedEvents = computed(() => {
  return [...allEvents.value].sort((a, b) => {
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(b.date) - new Date(a.date)
  })
})

const upcomingEvents = computed(() => {
  const today = new Date();
  // ... existing code ...
});
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-5px);
}
.card-img-top {
  height: 200px;
  object-fit: cover;
}
.badge {
  font-size: 0.9em;
}
</style> 