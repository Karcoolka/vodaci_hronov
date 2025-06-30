<template>
  <div class="modal-backdrop">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ pastEvent ? 'Upravit minulou akci' : 'Přidat minulou akci' }}</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="title" class="form-label">Název</label>
              <input type="text" id="title" class="form-control" v-model="form.title" required>
              <div v-if="submitted && !form.title" class="text-danger mt-1">Název je povinný.</div>
            </div>
            <div class="mb-3">
              <label for="date" class="form-label">Datum</label>
              <input type="date" id="date" class="form-control" v-model="form.date" required>
              <div v-if="submitted && !form.date" class="text-danger mt-1">Datum je povinné.</div>
            </div>
            <div class="mb-3">
              <label for="location" class="form-label">Místo</label>
              <input type="text" id="location" class="form-control" v-model="form.location" required>
              <div v-if="submitted && !form.location" class="text-danger mt-1">Místo je povinné.</div>
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">Popis</label>
              <textarea id="content" class="form-control" v-model="form.content" rows="4" required></textarea>
            </div>
            <div class="mb-3">
              <label for="imgURL" class="form-label">Obrázek (URL)</label>
              <div class="form-text mb-2">
                Jak nahrát fotku k události:<br>
                Na tomto webu nahraj foto: <a href="https://imgur.com/upload" target="_blank" rel="noopener">https://imgur.com/upload</a><br>
                Zkopíruj odkaz a přidej koncovku <b>.jpg</b> :)
              </div>
              <input type="url" id="imgURL" class="form-control" v-model="form.imgURL">
              <img v-if="form.imgURL" :src="form.imgURL" class="img-fluid mt-2" style="max-height: 150px;" @error="onImageError">
              <div v-if="imageError" class="text-danger mt-1">Neplatná URL adresa obrázku.</div>
            </div>
            <div class="mb-3">
              <label for="photogaleryUrl" class="form-label">Fotogalerie (odkaz, volitelné)</label>
              <input type="text" id="photogaleryUrl" class="form-control" v-model="form.photogaleryUrl" placeholder="http://...">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="$emit('close')">Zrušit</button>
              <button type="submit" class="btn btn-primary ms-2">
                Uložit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';

const props = defineProps({
  pastEvent: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close', 'save']);

const form = ref({
  title: '',
  date: '',
  location: '',
  content: '',
  imgURL: null,
  photogaleryUrl: ''
});

const imageError = ref(false);
const submitted = ref(false);

watch(() => props.pastEvent, (newPastEvent) => {
  imageError.value = false;
  if (newPastEvent) {
    form.value = { photogaleryUrl: '', ...newPastEvent };
    if (newPastEvent.photogaleryUrl) form.value.photogaleryUrl = newPastEvent.photogaleryUrl;
  } else {
    form.value = { title: '', date: '', location: '', content: '', imgURL: null, photogaleryUrl: 'http://' };
  }
}, { immediate: true });

watch(() => form.value.imgURL, () => {
  imageError.value = false;
});

const onImageError = () => {
  imageError.value = true;
};

const handleSubmit = () => {
  submitted.value = true;
  if (
    imageError.value ||
    !form.value.title ||
    !form.value.date ||
    !form.value.location
  ) return;

  // Generate Czech date string
  let dateCz = '';
  let year = '';
  if (form.value.date) {
    try {
      const dateObj = new Date(form.value.date);
      dateCz = format(dateObj, 'd. MMMM yyyy', { locale: cs });
      year = dateObj.getFullYear();
    } catch (e) {
      dateCz = form.value.date;
      year = '';
    }
  }

  emit('save', { ...form.value, date: form.value.date, dateCz, year });
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}
.modal-dialog {
  width: 100%;
  max-width: 500px;
  margin: 1.75rem auto;
}
.form-label {
  color: #fff;
}
.modal-title {
  color: #fff;
}
.form-text {
  color: #fff;
}
</style> 