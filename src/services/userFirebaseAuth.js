import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC4sTAre0YHewYoM3r9imw2Sz-iPVggwQM',
  authDomain: 'apiabmjackpots.firebaseapp.com',
  projectId: 'apiabmjackpots',
  storageBucket: 'apiabmjackpots.appspot.com',
  messagingSenderId: '526212361439',
  appId: '1:526212361439:web:51eef6b8a8fdea82394d6a',
  measurementId: 'G-2JSR96L6RQ',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
