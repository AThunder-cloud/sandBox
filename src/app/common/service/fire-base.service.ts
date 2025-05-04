import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { environment } from "src/environment/environment";
import { collection, addDoc, updateDoc,deleteDoc } from "firebase/firestore";
import { Note } from "../models/notes.model";
import { merge } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FireBaseService {
    // Initialize Firebase
    // private app = initializeApp(environment.firebaseConfig);
    // Initialize Cloud Firestore and get a reference to the service
    // private db = getFirestore(this.app);

    async addNote() {
        // try {
        //     const docRef = await addDoc(collection(this.db, "users"), {
        //         first: "Ada",
        //         last: "Lovelace",
        //         born: 1815
        //     });
        //     console.log("Document written with ID: ", docRef.id);
        // } catch (e) {
        //     console.error("Error adding document: ", e);
        // }
    }
}