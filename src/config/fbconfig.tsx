// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAszbKYottwfK0JK5edCgm-np7ew7-ykrU",
    authDomain: "devbeast-786.firebaseapp.com",
    projectId: "devbeast-786",
    storageBucket: "devbeast-786.firebasestorage.app",
    messagingSenderId: "116777321215",
    appId: "1:116777321215:web:8f6ba3e6327d1d5e7182ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);







/////////////////////////////////////////////
// Change your Collection Name
const mainCollection = 'dev1';
// inside
const adminCollectionId = 'admin';
const heroSectionCollectionId = 'hero_section';
const socialLinksCollectionId = 'social_links';
//
const projectsCollectionId = 'all_projects_id';
const projectsCollection = 'projects';
//
const contactUsCollectionId = 'contact_us_id';
const contactUsCollection = 'contact_us';
//
const reviewsCollectionId = 'all_reviews_id';
const reviewsCollection = 'reviews';
//
const siteSettingsCollectionId = 'site_settings';

export { db, storage, mainCollection, adminCollectionId, heroSectionCollectionId, socialLinksCollectionId, projectsCollectionId, projectsCollection, contactUsCollectionId, contactUsCollection, reviewsCollectionId, reviewsCollection, siteSettingsCollectionId };

