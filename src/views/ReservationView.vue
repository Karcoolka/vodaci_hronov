<template>
  <div class="reservation">
    <div class="container">
      <h1 class="mb-4">Rezervace lodí</h1>
      
      <!-- PDF Download Section -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Rezervační formulář</h5>
              <p class="card-text">
                Stáhněte si rezervační formulář, vyplňte ho a zašlete na email.
              </p>
              <div class="d-flex gap-3">
                <a :href="rezervacePdf" download class="btn btn-primary">
                  <i class="bi bi-download me-2"></i>Stáhnout formulář (PDF)
                </a>
                <a href="mailto:simkova54321@gmail.com" class="btn btn-outline-primary">
                  <i class="bi bi-envelope me-2"></i>Poslat email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Information Section -->
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Informace o rezervaci</h5>
              <ul class="list-unstyled">
                <li class="mt-3 mb-3">
                  <i class="bi bi-clock me-2"></i>
                  <strong>Vyzvednutí/vrácení rezervovaného vybavení:</strong>
                  <p class="ms-2 mt-2">Út 17:00 - 19:00 nebo dle domluvy</p>
                </li>
                <li class="mb-3">
                  <i class="bi bi-envelope me-2"></i>
                  <strong>Email:</strong> 
                  <a href="mailto:simkova54321@gmail.com"> vodacihronov@gmail.com</a>
                </li>
                <li class="mb-3">
                  <i class="bi bi-info-circle me-2"></i>
                  <strong>Minimální rezervace:</strong> 24 hodin předem
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import rezervacePdf from '@/assets/rezervace.pdf'
</script>

<style scoped>
.reservation {
  padding: 1rem 0;
}

.card {
  border: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.btn-primary {
  padding: 0.5rem 2rem;
  display: inline-flex;
  align-items: center;
}

.btn-primary i {
  font-size: 1.1rem;
}

.gap-3 {
  gap: 1rem;
}

@media (max-width: 768px) {
  .reservation {
    padding: 0.5rem 0;
  }
}
</style> 