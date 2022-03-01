//Import the function you need from the SDKs you need

import { initializeApp, getApp, getApps } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

//TODO: Add SDKs for firebase products that you want to use
//https://firebase.google.com/docs/web/setup#available-libraries

//Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyC7JEPmNnP2R8CZ6rT7s8N_oMqVdnZ1GxM",
    authDomain: "buil-next-tw.firebaseapp.com",
    projectId: "buil-next-tw",
    storageBucket: "buil-next-tw.appspot.com",
    messagingSenderId: "222365806429",
    appId: "1:222365806429:web:044ff7fb293662c92642b4"
};

// Intialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()


export default app
export { db, storage }
