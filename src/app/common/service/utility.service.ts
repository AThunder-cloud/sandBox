import { Injectable } from '@angular/core';
import * as localforage from 'localforage';
import { NoteResponse } from '../models/notes.model';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  public numberOfNotes: number = 0;
  public numberOfNotesGroup :number = 0;
  constructor() {
    // Configure localForage (optional)
    localforage.config({
      driver: localforage.INDEXEDDB, // Force using IndexedDB
      name: 'SandBox',            // Name of your app
      version: 1.0,
      storeName: 'notes',                  // Name of the store
      description: 'Notes storage',
    });
  }

  generateUnique32BitId(lastId: number): string {
    // Convert current ID to binary and pad to 32 bits
    const id = lastId.toString(2).padStart(32, '0');
    return id; // Return ID as a 32-bit binary string
  }
  // Adding a note
  async addNote(note: any): Promise<NoteResponse> {
    try {
      await localforage.setItem(note.id, note);
      return {
        success: true,
        message: 'Note saved successfully.',
        data: note
      };
    } catch (err: any) {
      return {
        success: false,
        message: 'Error saving note: ' + err.message
      };
    }
  }

  // Retrieving a note
  async getNote(id: string): Promise<NoteResponse> {
    try {
      const note = await localforage.getItem(id);
      if (note) {
        return {
          success: true,
          message: 'Note retrieved successfully.',
          data: note
        };
      } else {
        return {
          success: false,
          message: 'No note found with the given ID.'
        };
      }
    } catch (err: any) {
      return {
        success: false,
        message: 'Error retrieving note: ' + err.message
      };
    }
  }
}
