import { Component, OnInit } from '@angular/core';
import { Note, NotesList } from 'src/app/common/models/notes.model';
import { UtilityService } from 'src/app/common/service/utility.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notesList : Note[] = [];
  notesGropList : NotesList[] = [];

  constructor(private utility:UtilityService){}
  
  ngOnInit(): void {
    let newid = this.utility.generateUnique32BitId(4)
    console.log(newid)
  }
}
