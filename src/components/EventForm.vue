<template>
  <div class="modal-backdrop">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ event ? 'Upravit akci' : 'Přidat novou akci' }}</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="title" class="form-label">Název</label>
              <input type="text" id="title" class="form-control" v-model="form.title" required>
            </div>
            <div class="mb-3">
              <label for="date" class="form-label">Datum</label>
              <input type="date" id="date" class="form-control" v-model="form.date" required>
            </div>
            <div class="mb-3">
              <label for="time" class="form-label">Čas (volitelné)</label>
              <input type="time" id="time" class="form-control" v-model="form.time">
            </div>
            <div class="mb-3">
              <label for="location" class="form-label">Místo</label>
              <input type="text" id="location" class="form-control" v-model="form.location" required>
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Popis</label>
              <textarea id="description" class="form-control" v-model="form.description" rows="4" required></textarea>
            </div>
            <div class="mb-3">
              <label for="image" class="form-label">Obrázek (URL)</label>
              <input type="url" id="image" class="form-control" v-model="form.image">
              <img v-if="form.image" :src="form.image" class="img-fluid mt-2" style="max-height: 150px;" @error="onImageError">
              <div v-if="imageError" class="text-danger mt-1">Neplatná URL adresa obrázku.</div>
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

const props = defineProps({
  event: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close', 'save']);

const form = ref({
  title: '',
  date: '',
  location: '',
  description: '',
  image: null,
  time: null
});

const imageError = ref(false);

watch(() => props.event, (newEvent) => {
  imageError.value = false;
  if (newEvent) {
    form.value = { ...newEvent };
  } else {
    form.value = { title: '', date: '', location: '', description: '', image: null, time: null };
  }
}, { immediate: true });

watch(() => form.value.image, () => {
  imageError.value = false;
});

const onImageError = () => {
  imageError.value = true;
};

const handleSubmit = () => {
  if (imageError.value) return;
  emit('save', { ...form.value });
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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
</style> 