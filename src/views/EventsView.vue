<template>
  <div class="events">
    <div class="container">
      <h1 class="mb-4">Nadcházející akce</h1>

      <!-- Upcoming Events -->
      <section class="mb-5">
        <div class="row g-4">
          <div class="col-md-6 col-lg-4" v-for="(event, index) in upcomingEvents" :key="index">
            <div class="card h-100">
              <img :src="event.image || defaultEvent" class="card-img-top" :alt="event.title">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h5 class="card-title mb-0">{{ event.title }}</h5>
                  <span class="badge bg-primary">{{ event.date }}</span>
                </div>
                <p class="card-text">{{ event.description }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">
                    <i class="bi bi-geo-alt-fill me-1"></i>
                    {{ event.location }}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import events1 from '@/assets/photos/events_1.png'
import events2 from '@/assets/photos/events_2.png'
import defaultEvent from '@/assets/photos/default_event.jpg'


const upcomingEvents = ref([
{
    title: 'Jarní brigáda',
    date: '20. června 2025',
    description: `Loděnice volá: pavouci si chtějí založit vlastní oddíl! 🕷️
                  Přijď na brigádu – uklidíme, opravíme, a možná i najdeme raft z roku 2003.
                  Práce jak na kostele, ale odměna jak na festivalu: pivo, buřty, smích a puchýře zdarma! 🍺🔥`,
    location: 'Hronov - Loděnice',
    image: events2
  },
  {
    title: 'Vodácký výcvikový kurz',
    date: '7-10. srpna 2025',
    description: 'Čtyřdenní vodácký výcvikový kurz pro začátečníky i pokročilé na Roudnici',
    location: 'Roudnice Nad Labem',
    image: events1
  },
  {
    title: 'Test NO IMG',
    date: '7-10. srpna 2025',
    description: 'Čtyřdenní vodácký výcvikový kurz pro začátečníky i pokročilé na Roudnici',
    location: 'Roudnice Nad Labem'
  },
])

const registerForEvent = (event) => {
  // Implement event registration
  console.log('Register for event:', event)
}

const showGallery = (event) => {
  // Implement gallery view
  console.log('Show gallery for event:', event)
}
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

.table th {
  background-color: #f8f9fa;
}
</style> 