<template>
  <div class="home">
    <div class="hero-section text-white py-5 mb-4">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-9">
            <h1 class="display-4">Vodáci Hronov</h1>
            <p class="lead">Spolek vodáků v Hronově - váš partner pro nejen vodácké zážitky</p>
            <div class="alert alert-info mb-3" role="alert">
              <i class="bi bi-clock-fill me-2"></i>
              <strong>Pravidelné schůzky probíhají každé úterý 17 - 19 hodin</strong>
            </div>
            <router-link to="/o-nas" class="btn btn-light btn-lg">Více o nás</router-link>
          </div>
          <div class="col-md-3">
            <img src="../assets/logo.png" alt="Vodáci Hronov" class="img-fluid" />
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card h-100">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">Nadcházející akce</h5>
              <p class="card-text flex-grow-1">Připravované výpravy a akce pro členy i veřejnost.</p>
              <div class="mt-auto">
                <router-link to="/akce" class="btn btn-primary w-100">Zobrazit akce</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">Kontakt</h5>
              <p class="card-text flex-grow-1">Spojte se s námi pro více informací nebo připojení ke spolku.</p>
              <div class="mt-auto">
                <router-link to="/kontakt" class="btn btn-primary w-100">Kontaktovat</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">Stalo se</h5>
              <p class="card-text flex-grow-1">Informace z našeho spolku o proběhlých akcích.</p>
              <div class="mt-auto">
                <router-link to="/stalo-se" class="btn btn-primary w-100">Číst více</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic here
</script>

<style scoped>
.hero-section {
  background: linear-gradient(rgba(255, 147, 24, 0.45), rgba(11, 108, 255, 0.45)), url('../assets/front.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  min-height: 400px;
  display: flex;
  align-items: center;
  border-radius: 1rem;
  margin: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.hero-section:hover {
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.hero-section .container {
  position: relative;
  z-index: 2;
}

.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.w-100 {
    max-width: 200px;
}

.alert-info {
  background-color: rgba(13, 202, 240, 0.5) !important;
  border-color: rgba(13, 202, 240, 0.3) !important;
  color: white !important;
}
</style> 