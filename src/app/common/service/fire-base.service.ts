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
        const user = await firstValueFrom(this.authService.user$.pipe(map(user => user?.uid)));
        if (!user) throw new Error('User not authenticated');

        const noteWithUser = {
            ...note,
            userId: user,
            createdAt: Timestamp.fromDate(new Date()),
            updatedAt: Timestamp.fromDate(new Date())
        };

        const docRef = await addDoc(collection(this.firestore, 'notes'), noteWithUser);
        return docRef.id;
    }

    async updateNote(noteId: string, note: Partial<Omit<Note, 'id' | 'userId'>>): Promise<void> {
        const docRef = doc(this.firestore, 'notes', noteId);
        const updateData = {
            ...note,
            updatedAt: Timestamp.fromDate(new Date())
        };
        await updateDoc(docRef, updateData);
    }

    async deleteNote(noteId: string): Promise<void> {
        await deleteDoc(doc(this.firestore, 'notes', noteId));
    }

    async getNotes(collectionId?: string): Promise<Note[]> {
        const user = await firstValueFrom(this.authService.user$.pipe(map(user => user?.uid)));
        if (!user) return [];

        let queryConstraints = [
            where('userId', '==', user),
            orderBy('updatedAt', 'desc')
        ];

        if (collectionId && collectionId !== '0') {
            queryConstraints.push(where('listId', '==', collectionId));
        }

        const q = query(collection(this.firestore, 'notes'), ...queryConstraints);
        const querySnapshot = await getDocs(q);
        
        return querySnapshot.docs.map(doc => {
            const data = this.convertTimestampToDate(doc.data() as DocumentData);
            return {
                ...data,
                id: doc.id
            } as Note;
        });
    }

    // Collections Operations
    async addCollection(collectionData: Omit<Collection, 'id' | 'userId'>): Promise<string> {
        const user = await firstValueFrom(this.authService.user$.pipe(map(user => user?.uid)));
        if (!user) throw new Error('User not authenticated');

        const collectionWithUser = {
            ...collectionData,
            userId: user
        };

        const docRef = await addDoc(collection(this.firestore, 'collections'), collectionWithUser);
        return docRef.id;
    }

    async updateCollection(collectionId: string, collectionData: Partial<Omit<Collection, 'id' | 'userId'>>): Promise<void> {
        const docRef = doc(this.firestore, 'collections', collectionId);
        await updateDoc(docRef, collectionData);
    }

    async deleteCollection(collectionId: string): Promise<void> {
        await deleteDoc(doc(this.firestore, 'collections', collectionId));
    }

    async getCollections(): Promise<Collection[]> {
        const user = await firstValueFrom(this.authService.user$.pipe(map(user => user?.uid)));
        if (!user) return [];

        const q = query(
            collection(this.firestore, 'collections'),
            where('userId', '==', user)
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        } as Collection));
    }
}