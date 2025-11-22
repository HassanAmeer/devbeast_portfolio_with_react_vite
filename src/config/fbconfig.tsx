// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig =
{
    apiKey: "AIzaSyCsefSK8_br7Vc1JWW_lwqLRgVphwjAySA",
    authDomain: "com-mom-nurture.firebaseapp.com",
    databaseURL: "https://com-mom-nurture-default-rtdb.firebaseio.com",
    projectId: "com-mom-nurture",
    storageBucket: "com-mom-nurture.appspot.com",
    messagingSenderId: "746383562057",
    appId: "1:746383562057:web:a21b8b0f7582c07f09f698"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);







/////////////////////////////////////////////
// Change your Collection Name
const mainCollection = 'caringweb';
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

export { db, storage, mainCollection, adminCollectionId, heroSectionCollectionId, socialLinksCollectionId, projectsCollectionId, projectsCollection, contactUsCollectionId, contactUsCollection, reviewsCollectionId, reviewsCollection };

