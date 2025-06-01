<template>
  <div class="news">
    <div class="container">
      <h1 class="mb-4">Stalo se</h1>

      <div class="row">
        <div class="col-md-9">
          <!-- News items -->
          <div class="news-item card mb-4" v-for="(news, index) in filteredNews" :key="index">
            <div class="card-body d-flex">
              <div class="news-content flex-grow-1 pe-3">
                <div class="mb-2">
                  <small class="text-muted d-block mb-1">{{ news.date }}</small>
                  <h5 class="card-title mb-1">{{ news.title }}</h5>
                  <small class="text-muted location d-block mb-2">
                    <i class="bi bi-geo-alt-fill me-1"></i>{{ news.location }}
                  </small>
                </div>
                <p class="card-text">{{ news.content }}</p>
              </div>
              <div class="news-image" v-if="news.image">
                <img 
                  :src="news.image" 
                  :alt="news.title" 
                  class="img-fluid rounded" 
                  @error="handleImageError"
                />
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Import images
import news1 from '@/assets/photos/news_1.png'
import news2 from '@/assets/photos/news_2.png'
import news3 from '@/assets/photos/news_3.png'
import news4 from '@/assets/photos/news_4.png'
import news5 from '@/assets/photos/news_5.png'
import news6 from '@/assets/photos/news_6.png'

const selectedYear = ref(null)

const newsItems = ref([
  {
    title: 'Dětský Den ve Velkém Dřevíči',
    date: '1. června 2025',
    year: 2025,
    location: 'Velké Dřevíče',
    content: 'Členi a přátelé vodáckého spolku pomáhali s organizací, soutěžemi a disciplínami na dětském dni ve Velkém Dřevíči.',
    image: news1
  },
  {
    title: 'Jarní brigáda v klubovně',
    date: '24. května 2025',
    year: 2025,
    location: 'Klubovna',
    content: 'Během jarní brigády jsme:\n• Natřeli terasu\n• Nařezali a nasekali většinu dřeva\n• Vyčistili břeh u ohniště\n• Přidělali madla k okenicím\n\nA zašli si na společný oběd 😊',
    image: news2
  },
  {
    title: 'Splutí Divoké Orlice',
    date: '15. března 2025',
    year: 2025,
    location: 'Divoká Orlice',
    content: 'Připravujeme jarní výpravu na řeku Orlici. Výprava je vhodná pro začátečníky i pokročilé vodáky. Přihlášky přijímáme do konce února.',
    image: news3
  },
  {
    title: 'Pálení čarodejnic',
    date: '30. dubna 2025',
    year: 2025,
    location: 'Klubovna',
    content: 'Opékání buřtů a soutěže pro děti a rodiče na tradičním pálení čarodějnic.',
    image: news4
  },
  {
    title: 'Odemykání Doubravy',
    date: '26. dubna 2025',
    year: 2025,
    location: 'Řeka Doubrava',
    content: 'Každoroční odemykání Doubravy s následným společným posezením.',
    image: news5
  }
])

const availableYears = computed(() => {
  const years = new Set(newsItems.value.map(item => item.year))
  return Array.from(years).sort((a, b) => b - a) // Sort years in descending order
})

const filteredNews = computed(() => {
  if (selectedYear.value === null) {
    return newsItems.value
  }
  return newsItems.value.filter(item => item.year === selectedYear.value)
})

const showFullNews = (news) => {
  // Implement news detail view
  console.log('Show full news:', news)
}

const handleImageError = (event) => {
  console.error('Image failed to load:', event.target.src)
  event.target.style.display = 'none'
}
</script>

<style scoped>
.news-item {
  transition: transform 0.2s;
  border: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.news-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.news-content {
  min-width: 0; /* Prevents flex item from overflowing */
}

.news-image {
  flex-shrink: 0;
  width: 200px;
  margin-left: 1rem;
}

.news-image img {
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 0.5rem;
}

@media (max-width: 768px) {
  .card-body {
    flex-direction: column;
  }
  
  .news-image {
    width: 100%;
    margin-left: 0;
    margin-top: 1rem;
  }
  
  .news-image img {
    width: 100%;
    height: 200px;
  }
  
  .news-content {
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
</style> 