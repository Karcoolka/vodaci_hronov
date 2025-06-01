<template>
  <div class="events">
    <div class="container">
      <h1 class="mb-4">Akce</h1>

      <!-- Upcoming Events -->
      <section class="mb-5">
        <h2 class="mb-4">Nadcházející akce</h2>
        <div class="row g-4">
          <div class="col-md-6 col-lg-4" v-for="(event, index) in upcomingEvents" :key="index">
            <div class="card h-100">
              <img :src="event.image" class="card-img-top" :alt="event.title">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h5 class="card-title mb-0">{{ event.title }}</h5>
                  <span class="badge bg-primary">{{ event.date }}</span>
                </div>
                <p class="card-text">{{ event.description }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">
                    <i class="fas fa-map-marker-alt me-1"></i>
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


const upcomingEvents = ref([
{
    title: 'Jarní brigáda',
    date: '20. června 2025',
    description: 'Dvoudenní výprava na řece Orlici. Ubytování v kempech, večerní táborák a společenský program.',
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