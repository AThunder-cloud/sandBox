import { Injectable } from "@angular/core";
import { 
    Firestore, 
    collection, 
    addDoc, 
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    getDocs,
    orderBy,
    DocumentData,
    Timestamp,
    serverTimestamp
} from '@angular/fire/firestore';
import { Note, Collection } from '../models/notes.model';
import { AuthService } from './auth.service';
import { Observable, firstValueFrom, from, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FireBaseService {
    constructor(
        private firestore: Firestore,
        private authService: AuthService
    ) {}

    private convertTimestampToDate<T extends { createdAt?: Date | Timestamp; updatedAt?: Date | Timestamp }>(data: T): T {
        const result = { ...data };
        if (result.createdAt && result.createdAt instanceof Timestamp) {
            result.createdAt = result.createdAt.toDate();
        }
        if (result.updatedAt && result.updatedAt instanceof Timestamp) {
            result.updatedAt = result.updatedAt.toDate();
        }
        return result;
    }

    // Notes Operations
    async addNote(note: Omit<Note, 'id' | 'userId'>): Promise<string> {
        const user = await firstValueFrom(
            this.authService.user$.pipe(map(user => user?.uid))
        );
        if (!user) {
            throw new Error('User not authenticated');
        }
        const noteData = {
            ...note,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
        };
        const notesCollection = collection(
            this.firestore,
            `users/${user}/notes`
        );
        const docRef = await addDoc(notesCollection, noteData);
        return docRef.id;
    }

    async updateNote(noteId: string, note: Partial<Note>): Promise<void> {

        const user = await firstValueFrom(
            this.authService.user$.pipe(map(user => user?.uid))
        );

        if (!user) {
            throw new Error('User not authenticated');
        }

        const docRef = doc(
            this.firestore,
            `users/${user}/notes/${noteId}`
        );

        await updateDoc(docRef, {
            ...note,
            updatedAt: Timestamp.now()
        });
    }

    async deleteNote(noteId: string): Promise<void> {
        const user = await firstValueFrom(
            this.authService.user$.pipe(map(user => user?.uid))
        );

        if (!user) {
            throw new Error('User not authenticated');
        }

        await deleteDoc(
            doc(this.firestore, `users/${user}/notes/${noteId}`)
        );
    }

    async getNotes(): Promise<Note[]> {
        const user = await firstValueFrom(
            this.authService.user$.pipe(map(user => user?.uid))
        );

        if (!user) return [];

        const notesCollection = collection(
            this.firestore,
            `users/${user}/notes`
        );

        const q = query(
            notesCollection,
            orderBy('updatedAt', 'desc')
        );

        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            ...this.convertTimestampToDate(doc.data() as DocumentData),
            id: doc.id
        } as Note));
    }

    // Collections Operations
    async addCollection(collectionData: Omit<Collection, 'id'>): Promise<string> {

        const user = await firstValueFrom(
            this.authService.user$.pipe(map(user => user?.uid))
        );

        if (!user) {
            throw new Error('User not authenticated');
        }

        const collectionsRef = collection(
            this.firestore,
            `users/${user}/collections`
        );

        const docRef = await addDoc(collectionsRef, collectionData);

        return docRef.id;
    }

    async updateCollection(collectionId: string,collectionData: Partial<Omit<Collection, 'id'>>): Promise<void> {

        const user = await firstValueFrom(
            this.authService.user$.pipe(map(user => user?.uid))
        );

        if (!user) {
            throw new Error('User not authenticated');
        }

        const docRef = doc(
            this.firestore,
            `users/${user}/collections/${collectionId}`
        );

        await updateDoc(docRef, collectionData);
    }

    async deleteCollection(collectionId: string): Promise<void> {

        const user = await firstValueFrom(
            this.authService.user$.pipe(map(user => user?.uid))
        );

        if (!user) {
            throw new Error('User not authenticated');
        }

        await deleteDoc(
            doc(this.firestore, `users/${user}/collections/${collectionId}`)
        );
    }
    async getCollections(): Promise<Collection[]> {

        const user = await firstValueFrom(
            this.authService.user$.pipe(map(user => user?.uid))
        );

        if (!user) return [];

        const collectionsRef = collection(
            this.firestore,
            `users/${user}/collections`
        );

        const querySnapshot = await getDocs(collectionsRef);

        return querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        } as Collection));
    }
}