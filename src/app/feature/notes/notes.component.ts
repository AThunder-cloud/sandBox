import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note, NotesList } from 'src/app/common/models/notes.model';
import { CommonEventService } from 'src/app/common/service/common-event.service';
import { UtilityService } from 'src/app/common/service/utility.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit , OnDestroy{
  isColorPickerOpen:boolean=false;
  isDarkModeOn:boolean=false;
  colorList:string[]  = [];
  colorListLight: string[] = [
    "",
    "#FFEB99",  // Light Yellow
    "#FFCCCB",  // Light Coral
    "#FFDAB9",  // Light Peach
    "#B5EAD7",  // Light Mint
    "#C5E1A5",  // Light Green
    "#D7BDE2",  // Light Lavender
    "#AEDFF7"   // Light Blue
  ];
  colorListDark: string[] = [
    "",  // Dark Gray
    "#FF6F61",  // Coral
    "#6A5ACD",  // Slate Blue
    "#FF8C00",  // Dark Orange
    "#222b13",  // Dark Green
    "#191970",  // Midnight Blue
    "#B22222",  // Firebrick
    "#FF1493"   // Deep Pink
];
  notesList : Note[] = [];
  notesGropList : NotesList[] = [];

  createNoteFrom:FormGroup = new FormGroup({})
  constructor(private utility:UtilityService,private fb:FormBuilder,private cmevnt:CommonEventService){
    this.initForms();
  }

  initForms(){
    this.createNoteFrom = this.fb.group({
      id: ["",Validators.required], // Unique identifier for the note
      title: ["",Validators.required], // Note title
      content: ["",Validators.required], // Main content of the note
      createdAt: [new Date], // Creation date of the note
      updatedAt: [new Date], // Last updated date
      tags: [[],Validators.required], // Optional tags for categorizing the note
      color: ["",Validators.required], // Optional color for visually differentiating notes
      isPinned: [false], // Optional field to mark important notes as pinned
      isArchived: [false], // Optional field to archive notes
      reminders: [new Date], // Optional array of reminder dates for the note
      attachments: [[],Validators.required], // Array of URLs for any attached files or images
    })
  }
  ngOnInit(): void {
    let newid = this.utility.generateUnique32BitId(4)
    let data = localStorage.getItem("createNoteFrom")
    if(data)
      this.createNoteFrom.patchValue(JSON.parse(data))
    console.log(newid)
    this.cmevnt.isDarkMode$.subscribe((val:boolean)=>{
      this.colorList = val ? this.colorListDark : this.colorListLight;
      this.createNoteFrom.get("color")?.setValue("");  
    })
  }
  togglePinned(){
    this.createNoteFrom.get("isPinned")?.setValue(!this.createNoteFrom.get("isPinned")?.value);
  }
  openColorPicker(){
    this.isColorPickerOpen = !this.isColorPickerOpen;
  }
  changeColor(color:string) {
    this.createNoteFrom.get("color")?.setValue(color);  
  }
  submitForm(){
    console.log("submitted")
  }
  clearForm(){
    localStorage.removeItem("createNoteFrom");
    this.createNoteFrom.reset();
    this.createNoteFrom.get("createdAt")?.setValue(new Date);
    this.createNoteFrom.get("updatedAt")?.setValue(new Date);
  }
  ngOnDestroy(): void {
    const data = this.createNoteFrom.getRawValue();
    localStorage.setItem("createNoteFrom",JSON.stringify(data));
  }
  
}
