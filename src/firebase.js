import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDKmONd5mnjh_JRYFNq9awYCBSG5rrY67I',
  authDomain: 'yarn-todo.firebaseapp.com',
  projectId: 'yarn-todo',
  storageBucket: 'yarn-todo.appspot.com',
  messagingSenderId: '855863948810',
  appId: '1:855863948810:web:221b22855cccb2eed551f3',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
