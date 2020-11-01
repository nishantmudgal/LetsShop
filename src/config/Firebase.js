import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB8x40zqk_tqDhm9XYweSSnuta8FhkrOlU",
    authDomain: "shopping-auth-6caa2.firebaseapp.com",
    databaseURL: "https://shopping-auth-6caa2.firebaseio.com",
    projectId: "shopping-auth-6caa2",
    storageBucket: "shopping-auth-6caa2.appspot.com",
    messagingSenderId: "389488147468",
    appId: "1:389488147468:web:287602985345afdd0b4229",
    measurementId: "G-G6T244QYYM"
  };

const fire = firebase.initializeApp(firebaseConfig);

export const auth = fire.auth();
export const db = fire.firestore();


export default firebase;