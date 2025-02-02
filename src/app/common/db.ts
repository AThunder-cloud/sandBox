import Dexie, { Table } from 'dexie';
import { Note, NotesList } from './models/notes.model';

class NotesAppDB extends Dexie {
    notes!: Table<Note, number>;
    notesLists!: Table<NotesList, string>;
  
    constructor() {
      super('NotesAppDB');
      this.version(3).stores({
        notes: '++id, title, createdAt, updatedAt, tags, listId', // Indexed fields
        notesLists: '++id, name, createdAt, updatedAt', // Indexed fields for lists
      });
    }
  }
  
  export const db = new NotesAppDB();