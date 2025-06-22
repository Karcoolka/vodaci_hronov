<template>
  <div class="auth-container">
    <div class="card">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">{{ isRegistering ? 'Registrace' : 'Přihlášení' }}</h2>

        <!-- Registration Form -->
        <form v-if="isRegistering" @submit.prevent="register">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" class="form-control" v-model="email" required>
          </div>
          <div class="mb-3">
            <label for="username" class="form-label">Uživatelské jméno</label>
            <input type="text" id="username" class="form-control" v-model="username" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Heslo</label>
            <input type="password" id="password" class="form-control" v-model="password" required>
          </div>
          <button type="submit" class="btn btn-primary w-100">Registrovat se</button>
        </form>

        <!-- Login Form -->
        <form v-else @submit.prevent="login">
          <div class="mb-3">
            <label for="login-username" class="form-label">Uživatelské jméno</label>
            <input type="text" id="login-username" class="form-control" v-model="username" required>
          </div>
          <div class="mb-3">
            <label for="login-password" class="form-label">Heslo</label>
            <input type="password" id="login-password" class="form-control" v-model="password" required>
          </div>
          <div class="text-center">
              <button type="submit" class="btn btn-primary w-200">Přihlásit se</button>
          </div>
        </form>

        <div class="text-center mt-3">
          <a href="#" @click.prevent="isRegistering = !isRegistering">
            {{ isRegistering ? 'Máš již účet? Přihlas se' : 'Nemáš účet? Registruj se' }}
          </a>
        </div>
        
        <div v-if="message" class="alert mt-3" :class="messageType">{{ message }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

const router = useRouter();
const isRegistering = ref(false);
const email = ref('');
const username = ref('');
const password = ref('');
const message = ref('');
const messageType = ref(''); // 'alert-success' or 'alert-danger'

const register = async () => {
  message.value = '';
  try {
    // Check if username already exists
    const q = query(collection(db, 'users'), where('username', '==', username.value));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      throw new Error('Uživatelské jméno již existuje.');
    }

    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    // Save user data to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      username: username.value,
      email: email.value,
      activated: false,
    });
    
    message.value = 'Děkuji za registraci. Ještě potřebuješ schválení registrace administrátorem. Budeš kontaktován emailem.';
    messageType.value = 'alert-success';
    isRegistering.value = false; // Switch to login view
  } catch (error) {
    message.value = error.message;
    messageType.value = 'alert-danger';
  }
};

const login = async () => {
  message.value = '';
  try {
    // Find user by username
    const q = query(collection(db, "users"), where("username", "==", username.value));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Neplatné uživatelské jméno nebo heslo.");
    }

    const userData = querySnapshot.docs[0].data();

    if (!userData.activated) {
      throw new Error("Váš účet ještě nebyl aktivován administrátorem.");
    }

    // Sign in with email and password
    await signInWithEmailAndPassword(auth, userData.email, password.value);
    
    router.push('/');
  } catch (error) {
    if (error.code === 'auth/invalid-credential') {
      message.value = 'Špatné uživatelské jméno nebo heslo.';
    } else {
      message.value = error.message;
    }
    messageType.value = 'alert-danger';
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.card {
  width: 100%;
  max-width: 400px;
}
</style> 