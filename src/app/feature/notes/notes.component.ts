import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note, NotesList } from 'src/app/common/models/notes.model';
import { CommonEventService } from 'src/app/common/service/common-event.service';
import { NotesAppDBService } from 'src/app/common/service/notes-app-db.service';
import { UtilityService } from 'src/app/common/service/utility.service';
import notesData from '../../common/models/notes.json';
import { ToastService } from 'src/app/common/service/toast.service';
import { Subject, takeUntil, debounceTime } from 'rxjs';
import { db } from 'src/app/common/db';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit , OnDestroy{
  isColorPickerOpen:boolean=false;
  isColorPicker2Open:boolean=false;
  isDarkModeOn:boolean=false;
  colorList:string[]  = [];
  colorListLight: string[] = [
    "#ffffff",  // white
    "#FFEB99",  // Light Yellow
    "#faf252",  // Light Coral
    "#FFDAB9",  // Light Peach
    "#B5EAD7",  // Light Mint
    "#C5E1A5",  // Light Green
    "#D7BDE2",  // Light Lavender
    "#AEDFF7"   // Light Blue
  ];
  colorListDark: string[] = [
    "#263238",  // Dark Gray
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
  editNoteFrom:FormGroup = new FormGroup({})
  searchForm:FormGroup = new FormGroup({})
  noteDialog:boolean = false;
  selectedNote?:Note;
  selectedColor:string="";
  private ngUnsubscribe = new Subject<void>();
  constructor(
    private utility:UtilityService,private fb:FormBuilder,
    private cmevnt:CommonEventService,private noteDB:NotesAppDBService,
    private toast:ToastService){
    this.initForms();
    this.getAllNotes();
  }

  initForms(){
    this.createNoteFrom = this.fb.group({
      title: ["",Validators.required], // Note title
      content: ["",Validators.required], // Main content of the note
      createdAt: [new Date], // Creation date of the note
      updatedAt: [new Date], // Last updated date
      tags: [[]], // Optional tags for categorizing the note
      colorIndex: [0,Validators.required], // Optional colorIndex for visually differentiating notes
      isPinned: [false], // Optional field to mark important notes as pinned
      isArchived: [false], // Optional field to archive notes
      reminders: [new Date], // Optional array of reminder dates for the note
      attachments: [[]], // Array of URLs for any attached files or images
    });
    this.editNoteFrom = this.fb.group({
      id: [,Validators.required], // Unique identifier for the note
      title: ["",Validators.required], // Note title
      content: ["",Validators.required], // Main content of the note
      createdAt: [new Date], // Creation date of the note
      updatedAt: [new Date], // Last updated date
      tags: [[]], // Optional tags for categorizing the note
      colorIndex: [0,Validators.required], // Optional colorIndex for visually differentiating notes
      isPinned: [false], // Optional field to mark important notes as pinned
      isArchived: [false], // Optional field to archive notes
      reminders: [new Date], // Optional array of reminder dates for the note
      attachments: [[]], // Array of URLs for any attached files or images
    });
    this.searchForm = this.fb.group({
      query:[],
      filters:[[]],
    });
  }
  async getAllNotes(){
    const data = await this.noteDB.getAllNotes();
    this.notesList = [...data];
  }
  ngOnInit(): void {
    let data = localStorage.getItem("createNoteFrom")
    if(data){
      this.createNoteFrom.patchValue(JSON.parse(data))
    }
    this.cmevnt.isDarkMode$.subscribe((val:boolean)=>{
      this.colorList = val ? this.colorListDark : this.colorListLight;
      this.changeColor(0,'createNoteFrom');
      this.changeColor(0,'editNoteFrom');
      this.notesList = this.notesList.map(note => ({
        ...note,
        colorIndex: note.colorIndex // Map colorIndex to the active colorIndex list
      }));
    });
    this.listenForValueChanges()
  }
  togglePinned(form:FormGroup){
    form?.get("isPinned")?.setValue(!form?.get("isPinned")?.value);
  }
  openColorPicker(of:string){
    if('createNoteFrom' === of){
      this.isColorPickerOpen = !this.isColorPickerOpen;
    }else{
      this.isColorPicker2Open = !this.isColorPicker2Open;
    }
  }
  changeColor(color:number,of:string) {
    if('createNoteFrom' === of){
      this.createNoteFrom.get("colorIndex")?.setValue(color);  
    }else{
      this.selectedColor = this.colorList[color];
      this.editNoteFrom.get("colorIndex")?.setValue(color);  
    }
  }
  clearForm(form:FormGroup){
    localStorage.removeItem("createNoteFrom");
    form.reset();
    form.get("createdAt")?.setValue(new Date);
    form.get("updatedAt")?.setValue(new Date);
    form.updateValueAndValidity();
  }
  listenForValueChanges(){
    this.searchForm.get("query")?.valueChanges
    .pipe(takeUntil(this.ngUnsubscribe),debounceTime(1000))
    .subscribe((val:string)=>{
      this.notesList = this.notesList.filter((note:Note) => 
        note.content.toLowerCase().includes(val.toLowerCase())|| 
        note.title.toLowerCase().includes(val.toLowerCase()))
    });
  }
  openNote(note:Note){
    this.noteDialog = true;
    this.selectedColor = this.colorList[note.colorIndex];
    this.editNoteFrom.patchValue(note)
  }
  async submitForm(action:string){
    console.log(this.createNoteFrom,this.editNoteFrom)
    if(this.createNoteFrom.invalid){
      this.changeColor(0,'createNoteFrom');
    }
    if(this.editNoteFrom.invalid){
      this.changeColor(0,'editNoteFrom');
    }
    if(this.createNoteFrom.valid && "save" === action){
      const newNote:Note = {
        ...this.createNoteFrom.getRawValue()
      }
      const id = await this.noteDB.addNoteWithDexie(newNote);
      if(typeof id != 'number'){
        this.toast.showError("Error", "Failed to saved Note");
        return;
      }
      console.log(newNote)
      this.clearForm(this.createNoteFrom);
      this.toast.showSuccess("Sucess", "Note saved");
      this.getAllNotes();
    }else if(this.editNoteFrom.valid && "update" === action){
      const newNote:Note = {
        ...this.editNoteFrom.getRawValue()
      }
      const id = newNote?.id ?? 0;
      this.noteDB.updateNoteById(id,newNote);
      this.clearForm(this.editNoteFrom);
      this.toast.showSuccess("Sucess", "Note updated");
      this.noteDialog = false
      this.getAllNotes();
    }else{
      this.toast.showError("Error", "Empty Note");
    }
  }
  delete(id:number){
    this.noteDialog = false;
    this.clearForm(this.editNoteFrom);
    this.noteDB.deleteById(id);
  }
  ngOnDestroy(): void {
    const data = this.createNoteFrom.getRawValue();
    localStorage.setItem("createNoteFrom",JSON.stringify(data));

    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  
}
