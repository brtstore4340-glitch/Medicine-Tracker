import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const MEDICINES_COLLECTION = 'medicines';

export const addMedicine = async (data) => {
    try {
        const docRef = await addDoc(collection(db, MEDICINES_COLLECTION), {
            ...data,
            createdAt: new Date().toISOString()
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
};

export const subscribeToMedicines = (callback) => {
    const q = query(collection(db, MEDICINES_COLLECTION), orderBy("expirationDate", "asc"));
    return onSnapshot(q, (querySnapshot) => {
        const medicines = [];
        querySnapshot.forEach((doc) => {
            medicines.push({ id: doc.id, ...doc.data() });
        });
        callback(medicines);
    });
};
