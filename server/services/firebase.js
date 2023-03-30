const firebase = require('firebase/app')
require('firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyDRu75XQkYBNodSHCGeCCZ2vYqSp_rCEY4",
    authDomain: "petaddoption-6a7b6.firebaseapp.com",
    projectId: "petaddoption-6a7b6",
    storageBucket: "petaddoption-6a7b6.appspot.com",
    messagingSenderId: "168375082637",
    appId: "1:168375082637:web:1b0a3140191ee9b349ccc4",
    measurementId: "G-KMSGJPT0BB"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
const User = db.collection("users")

module.exports = User