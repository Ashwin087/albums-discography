import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyA6vrmIh-CRaBPHtLOFvFMddg-5_glz-2w",
    authDomain: "project3-album-app.firebaseapp.com",
    projectId: "project3-album-app",
    storageBucket: "project3-album-app.appspot.com",
    messagingSenderId: "235126406936",
    appId: "1:235126406936:web:fff0fcc12fbfef3cd2a86d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;