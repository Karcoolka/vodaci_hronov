import { ref, onUnmounted } from 'vue';
import { auth, db } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

export function useAuth() {
  const user = ref(null);
  const isActivated = ref(false);
  const isLoggedIn = ref(false);

  let unsubscribe;

  const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      isLoggedIn.value = true;
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      
      // Use onSnapshot to listen for real-time updates
      unsubscribe = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          user.value = { uid: firebaseUser.uid, ...docSnap.data() };
          isActivated.value = docSnap.data().activated;
        } else {
          // User exists in Auth but not in Firestore, handle this case
          user.value = { uid: firebaseUser.uid, email: firebaseUser.email };
          isActivated.value = false;
        }
      });
    } else {
      isLoggedIn.value = false;
      user.value = null;
      isActivated.value = false;
      if (unsubscribe) {
        unsubscribe();
      }
    }
  });

  onUnmounted(() => {
    unsubscribeAuth();
    if (unsubscribe) {
      unsubscribe();
    }
  });

  return { user, isLoggedIn, isActivated };
} 