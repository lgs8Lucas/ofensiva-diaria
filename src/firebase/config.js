// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAGgkVdh8eJtoFJkjSSs0xnasKJRcV4rbo",
	authDomain: "ofensiva-diaria.firebaseapp.com",
	projectId: "ofensiva-diaria",
	storageBucket: "ofensiva-diaria.firebasestorage.app",
	messagingSenderId: "739242097360",
	appId: "1:739242097360:web:b93b3b4b09b5cba1d83cd5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
