<script setup>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref, onMounted } from 'vue'
import { auth } from '@/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false);

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
  });
});

const logout = async () => {
  try {
    await signOut(auth);
    router.push('/');
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};
</script>

<template>
  <div class="app">
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <img src="./assets/logo.png" alt="Vodáci Hronov" class="navbar-brand" style="max-width: 70px; margin-right: 10px;" />
        <router-link class="navbar-brand" to="/">Vodáci Hronov</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
              <router-link class="nav-link" to="/akce">Nadcházející akce</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/stalo-se">Stalo se</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/rezervace">Rezervace</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/kontakt">Kontakt</router-link>
            </li>
            <li v-if="!isLoggedIn" class="nav-item">
              <router-link class="nav-link sign-in-link" to="/sign-in">Přihlášení</router-link>
            </li>
            <li v-else class="nav-item">
              <a href="#" @click.prevent="logout" class="nav-link sign-in-link">Odhlásit</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <main class="container py-4">
      <router-view></router-view>
    </main>
    <footer class="bg-dark text-light py-4 mt-auto position-relative">
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
        <!-- LinkedIn floating button -->
        <a href="https://www.linkedin.com/in/adela-simkova/" target="_blank" rel="noopener" class="btn-linkedin-float" title="Made by Adéla Šimková">
          <i class="bi bi-linkedin"></i>
        </a>
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

.w-50 {
  max-width: 30px;
}

main {
  flex: 1;
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

.btn-linkedin {
  background-color: #0077b5;
  color: #fff !important;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 2rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: background 0.2s;
}
.btn-linkedin:hover {
  background-color: #005983;
  color: #fff !important;
  text-decoration: none;
}

.btn-linkedin-float {
  position: absolute;
  right: 24px;
  bottom: 16px;
  background-color: #0077b5;
  color: #fff !important;
  border: none;
  padding: 0.35rem 0.7rem;
  border-radius: 50%;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 10;
  transition: background 0.2s, transform 0.2s;
  opacity: 0.85;
}
.btn-linkedin-float:hover {
  background-color: #005983;
  color: #fff !important;
  opacity: 1;
  transform: scale(1.08);
}
</style>
