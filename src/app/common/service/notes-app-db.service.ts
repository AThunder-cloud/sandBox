import { Injectable } from '@angular/core';
import { db } from '../db';
import { Note, NotesList } from '../models/notes.model';

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
  
  async addNotesListWithDexie(list: NotesList): Promise<void> {
    await db.notesLists.add(list);
  }
  
  async getAllNotesLists(): Promise<NotesList[]> {
    return db.notesLists.toArray();
  }

  async updateNoteById(id:number,note:Note): Promise<void> {
    await db.notes.update(id,{...note});
  }
  async deleteById(id:number): Promise<void> {
    await db.notes.delete(id);
  }
}
