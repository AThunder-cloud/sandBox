import Dexie, { Table } from 'dexie';
import { Note, Collection } from './models/notes.model';

class NotesAppDB extends Dexie {
    notes!: Table<Note, number>;
    collections!: Table<Collection, number>;
  
    constructor() {
      super('NotesAppDB');
      this.version(1).stores({
        notes: '++id, title, createdAt, updatedAt, tags, listId', // Indexed fields
        collections: '++id, name', // Indexed fields for lists
      });
    }
  }
  
  export const db = new NotesAppDB();