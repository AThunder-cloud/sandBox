import { Injectable } from '@angular/core';
import { db } from '../db';
import { Note, Collection } from '../models/notes.model';

@Injectable({
  providedIn: 'root'
})
export class NotesAppDBService {

  constructor() { }

  async addNoteWithDexie(note: Omit<Note, 'id'>): Promise<number> {
    return await db.notes.add(note);
  }
  
  async getAllNotes(): Promise<Note[]> {
    return db.notes.toArray();
  }
  
  async addColletionWithDexie(collection: Omit<Collection, 'id'>): Promise<number> {
    return await db.collections.add(collection);
  }
  
  async getAllColletion(): Promise<Collection[]> {
    return db.collections.toArray();
  }
  async deleteCollectionById(id:number): Promise<void> {
    await db.collections.delete(id);
  }

  async updateNoteById(id:number,note:Note): Promise<void> {
    await db.notes.update(id,{...note});
  }
  async deleteById(id:number): Promise<void> {
    await db.notes.delete(id);
  }
}
