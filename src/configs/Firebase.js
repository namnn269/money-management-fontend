import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCbA2UpyNOZkZimNDwwfDR8apl9i2jXrI4',
  authDomain: 'money-management-app-01.firebaseapp.com',
  projectId: 'money-management-app-01',
  storageBucket: 'money-management-app-01.appspot.com',
  messagingSenderId: '236912110842',
  appId: '1:236912110842:web:86440c847ccfb26ac06d43',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
