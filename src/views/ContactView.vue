<template>
  <div class="contact">
    <div class="container">
      <h1 class="mb-4">Kontakt</h1>

      <div class="row">
        <!-- Contact Information -->
        <div class="col mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title mb-4">Kontaktní informace</h5>
              
              <div class="contact-item mb-3">
                <i class="bi bi-geo-alt-fill text-primary me-2"></i>
                <div>
                  <h6>Adresa</h6>
                  <p class="mb-0">Hostovského 972<br>549 31 Hronov</p>
                </div>
              </div>

              <div class="contact-item mb-3">
                <i class="bi bi-geo-alt-fill text-primary me-2"></i>
                <div>
                  <h6>Korespondenční adresa</h6>
                  <p class="mb-0">Jugoslávská 1539<br>547 01 Náchod</p>
                </div>
              </div>

              <div class="contact-item mb-3">
                <i class="bi bi-telephone-fill text-primary me-2"></i>
                <div>
                  <h6>Telefon</h6>
                  <p class="mb-0">+420 606 675 348</p>
                </div>
              </div>

              <div class="contact-item mb-3">
                <i class="bi bi-envelope-fill text-primary me-2"></i>
                <div>
                  <h6>Email</h6>
                  <p class="mb-0">vodacihronov@gmail.com</p>
                </div>
              </div>

              <div class="contact-item mb-3">
                <i class="bi bi-building-fill text-primary me-2"></i>
                <div>
                  <h6>IČO</h6>
                  <p class="mb-0">27024431</p>
                </div>
              </div>

              <div class="contact-item mb-3">
                <i class="bi bi-bank2 text-primary me-2"></i>
                <div>
                  <h6>Bankovní spojení</h6>
                  <p class="mb-0">č. 2100242532 / 2010</p>
                </div>
              </div>

              <div class="contact-item">
                <i class="bi bi-clock-fill text-primary me-2"></i>
                <div>
                  <h6>Otevřeno</h6>
                  <p class="mb-0">PRAVIDELNÉ SCHŮZKY MOMENTÁLNĚ PROBÍHAJÍ KAŽDÉ ÚTERÝ 17 - 19 HODIN<br> Nebo dle domluvy a plánovaných akcí</p>
                </div>
              </div>

              <hr>

              <h5 class="card-title mb-3">Sledujte nás</h5>
              <div class="social-links">
                <a href="https://www.facebook.com/vodacihronov" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary me-2" title="Facebook">
                  <i class="bi bi-facebook"></i>
                </a>
                <a href="https://www.instagram.com/vodacihronov" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary me-2" title="Instagram">
                  <i class="bi bi-instagram"></i>
                </a>
                <a href="https://www.youtube.com/@vodacihronov" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary" title="YouTube">
                  <i class="bi bi-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Map -->
      <div class="row mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-body p-0">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Hostovského+972,+549+31+Hronov,+Czechia"
                width="100%"
                height="400"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  try {
    // Implement form submission logic here
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
    alert('Zpráva byla úspěšně odeslána!')
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  } catch (error) {
    alert('Něco se pokazilo. Zkuste to prosím znovu.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact-item {
  display: flex;
  align-items: flex-start;
}

.contact-item i {
  font-size: 1.2rem;
  margin-top: 0.2rem;
}

.contact-item h6 {
  margin-bottom: 0.2rem;
  font-weight: 600;
}

.social-links .btn {
  width: 40px;
  height: 40px;
  padding: 0;
  line-height: 40px;
  text-align: center;
}

.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}
</style> 