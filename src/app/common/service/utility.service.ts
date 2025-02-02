import { Injectable } from '@angular/core';
import { db } from '../db';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  public numberOfNotes: number = 0;
  public numberOfNotesGroup :number = 0;
  constructor() {}

  async generateUnique32BitId(): Promise<string> {
    let lastIndex = await db.notes.count()
    ++lastIndex
    // Convert current ID to binary and pad to 32 bits
    const id = lastIndex.toString(2).padStart(32, '0');
    return id; // Return ID as a 32-bit binary string
  }

}
