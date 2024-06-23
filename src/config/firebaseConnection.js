import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2ce-xABLUlCDBfsY8sRuZrHao1-il4Ac",
  authDomain: "heygrupos-8eabe.firebaseapp.com",
  projectId: "heygrupos-8eabe",
  storageBucket: "heygrupos-8eabe.appspot.com",
  messagingSenderId: "753428718064",
  appId: "1:753428718064:web:ddfbc95d44002854c1bd35",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
