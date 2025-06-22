<script setup>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref, onMounted } from 'vue'

// Membership status
const isMember = ref(false)

// Check membership status on component mount
onMounted(() => {
  // Here you would typically check the user's membership status
  // For now, we'll use a mock value
  isMember.value = false // Set to true for members
})
</script>

<template>
  <div class="app">
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <img src="./assets/logo.png" alt="Vodáci Hronov" class="navbar-brand" style="max-width: 70px; margin-right: 10px;" />
        <router-link class="navbar-brand" to="/">Vodáci Hronov</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Domů</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/o-nas">O nás</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/stalo-se">Stalo se</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/akce">Nadcházející Akce</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/rezervace">Rezervace</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/kontakt">Kontakt</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link sign-in-link" to="/sign-in">Přihlášení</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="container py-4">
      <router-view></router-view>
    </main>

    <footer class="bg-dark text-light py-4 mt-auto">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h5>Vodáci Hronov</h5>
            <p>Spolek vodáků v Hronově</p>
          </div>
          <div class="col-md-6 text-md-end">
            <h5>Kontakt</h5>
            <p>Email: vodacihronov@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.w-100 {
  max-width: 100px;
}

main {
  flex: 1;
}

.navbar {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background-color: rgba(143, 90, 16, 0.999) !important;
}

.navbar .nav-link {
  color: #ffffff !important;
}

.navbar .navbar-brand {
  color: #ffffff !important;
}

.navbar-toggler {
  border-color: rgba(255, 255, 255, 0.5) !important;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
}

footer {
  margin-top: auto;
}

.membership-status {
  display: flex;
  align-items: center;
  color: #198754 !important;
  font-weight: 500;
  background-color: rgba(25, 135, 84, 0.1) !important;
  border: 1px solid rgba(25, 135, 84, 0.2);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem !important;
  margin-right: 0.5rem;
}

.membership-status i {
  font-size: 1.1rem;
}

.membership-status .status-text {
  font-size: 0.9rem;
}

/* Style for non-member status */
.membership-status.non-member {
  color: #6c757d !important;
  background-color: rgba(108, 117, 125, 0.1) !important;
  border-color: rgba(108, 117, 125, 0.2);
}
</style>
