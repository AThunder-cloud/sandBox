import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Note, Collection } from 'src/app/common/models/notes.model';
import { CommonEventService } from 'src/app/common/services/common-event.service';
import { UtilityService } from 'src/app/common/services/utility.service';
import { ToastService } from 'src/app/common/services/toast.service';
import { Subject, takeUntil, debounceTime } from 'rxjs';
import { FireBaseService } from 'src/app/common/services/fire-base.service';
import { PaginatorState, Paginator } from 'primeng/paginator';
import { Bind } from 'primeng/bind';
import { Card } from 'primeng/card';
import { PrimeTemplate } from 'primeng/api';
import { InputText } from 'primeng/inputtext';
import { NgClass, SlicePipe, DatePipe } from '@angular/common';
import { Textarea } from 'primeng/textarea';
import { Ripple } from 'primeng/ripple';
import { Tooltip } from 'primeng/tooltip';
import { ButtonDirective } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { Accordion, AccordionPanel, AccordionHeader } from 'primeng/accordion';
import { ThemeService } from 'src/app/common/services/theme.service';
@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss'],
    imports: [ReactiveFormsModule, Bind, Card, PrimeTemplate, InputText, Textarea, Ripple, Tooltip, NgClass, ButtonDirective, Dialog, Paginator, Accordion, AccordionPanel, AccordionHeader, SlicePipe, DatePipe]
})
export class NotesComponent implements OnInit, OnDestroy {
  private utility: UtilityService = inject(UtilityService);
  private fb: FormBuilder = inject(FormBuilder);
  private cmevnt: CommonEventService = inject(CommonEventService);
  private fireStore: FireBaseService = inject(FireBaseService);
  private toast: ToastService = inject(ToastService);
  private themeService: ThemeService = inject(ThemeService);

  isColorPickerOpen: boolean = false;
  isColorPicker2Open: boolean = false;
  isDarkModeOn: boolean = false;
  colorList: string[] = [];
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
  notesList: Note[] = [];
  collectionList: Collection[] = [];
  paginatedCollectionList: any[] = [];

  createNoteFrom: FormGroup = new FormGroup({})
  editNoteFrom: FormGroup = new FormGroup({})
  searchForm: FormGroup = new FormGroup({})
  noteDialog: boolean = false;
  selectedNote?: Note;
  selectedColor: string = "";
  addCollectionDialog: boolean = false;
  createNewCollection: FormGroup = new FormGroup({})
  private ngUnsubscribe = new Subject<void>();
  firstCollectionPage: number = 0;
  currentCollectionRow: number = 10;
  accordionActiveIndex: number | number[] = 0;
  constructor() {
    this.initForms();
    this.getAllNotes();
    this.getAllCollection();
    this.applyEffect();
  }

  initForms() {
    this.createNoteFrom = this.fb.group({
      title: ["", Validators.required], // Note title
      content: ["", Validators.required], // Main content of the note
      createdAt: [new Date], // Creation date of the note
      updatedAt: [new Date], // Last updated date
      tags: [[]], // Optional tags for categorizing the note
      colorIndex: [0, Validators.required], // Optional colorIndex for visually differentiating notes
      isPinned: [false], // Optional field to mark important notes as pinned
      isArchived: [false], // Optional field to archive notes
      reminders: [new Date], // Optional array of reminder dates for the note
      attachments: [[]], // Array of URLs for any attached files or images
    });
    this.editNoteFrom = this.fb.group({
      id: [, Validators.required], // Unique identifier for the note
      title: ["", Validators.required], // Note title
      content: ["", Validators.required], // Main content of the note
      createdAt: [new Date], // Creation date of the note
      updatedAt: [new Date], // Last updated date
      tags: [[]], // Optional tags for categorizing the note
      colorIndex: [0, Validators.required], // Optional colorIndex for visually differentiating notes
      isPinned: [false], // Optional field to mark important notes as pinned
      isArchived: [false], // Optional field to archive notes
      reminders: [new Date], // Optional array of reminder dates for the note
      attachments: [[]], // Array of URLs for any attached files or images
    });
    this.searchForm = this.fb.group({
      query: [],
      filters: [[]],
    });
    this.createNewCollection = this.fb.group({
      name: ['',[Validators.required]], // name for the collection
      description: [''], // description for collection
    })
  }
  async getAllNotes() {
    try {
      const data = await this.fireStore.getNotes();
      this.notesList = [...data];
    } catch (error) {
      this.toast.showError("Error", "Failed to fetch notes");
    }
  }

  async getAllCollection() {
    try {
      const data = await this.fireStore.getCollections();
      const all: Collection = { 
        id: '0', 
        name: 'ALL', 
        description: 'Represent all the notes'
      };
      this.collectionList = [all, ...data];
      this.paginateCollections();
    } catch (error) {
      this.toast.showError("Error", "Failed to fetch collections");
    }
  }
  private applyEffect(){
    effect(() => {
      const isDark = this.themeService.isDarkMode(); 
      this.colorList = isDark ? this.colorListDark : this.colorListLight;
      
      this.changeColor(0, 'createNoteFrom');
      this.changeColor(0, 'editNoteFrom');
      
      this.notesList = this.notesList.map(note => ({
        ...note,
        colorIndex: note.colorIndex
      }));
    });
  }
  paginateCollections() {
    const start = this.firstCollectionPage;
    const end = start + this.currentCollectionRow;
    this.paginatedCollectionList = this.collectionList.slice(start, end);
  }

  onPageChange(event: PaginatorState) {
    this.firstCollectionPage = event.first ?? 0;
    this.currentCollectionRow = event.rows ?? 10;
    this.paginateCollections();
  }

  ngOnInit(): void {
    let data = localStorage.getItem("createNoteFrom");
    if (data) {
      this.createNoteFrom.patchValue(JSON.parse(data));
    }
    this.cmevnt.isDarkMode$.subscribe((val: boolean) => {
      this.colorList = val ? this.colorListDark : this.colorListLight;
      this.changeColor(0, 'createNoteFrom');
      this.changeColor(0, 'editNoteFrom');
      this.notesList = this.notesList.map(note => ({
        ...note,
        colorIndex: note.colorIndex
      }));
    });
    this.listenForValueChanges();
  }
  togglePinned(form: FormGroup) {
    form?.get("isPinned")?.setValue(!form?.get("isPinned")?.value);
  }
  openColorPicker(of: string) {
    if ('createNoteFrom' === of) {
      this.isColorPickerOpen = !this.isColorPickerOpen;
    } else {
      this.isColorPicker2Open = !this.isColorPicker2Open;
    }
  }
  changeColor(color: number, of: string) {
    if ('createNoteFrom' === of) {
      this.createNoteFrom.get("colorIndex")?.setValue(color);
      setTimeout(() => {
        const dialogEl = document.querySelector('.p-card.p-component');
        if (dialogEl) {
          (dialogEl as HTMLElement).style.background = this.colorList[color];
        }
      }, 0);
    } else {
      this.selectedColor = this.colorList[color];
      this.editNoteFrom.get("colorIndex")?.setValue(color);
      setTimeout(() => {
        const dialogEl = document.querySelector('.p-dialog.p-component');
        if (dialogEl) {
          (dialogEl as HTMLElement).style.background = this.selectedColor;
        }
      }, 0);
    }
  }
  clearForm(form: FormGroup) {
    localStorage.removeItem("createNoteFrom");
    form.reset();
    form.get("createdAt")?.setValue(new Date);
    form.get("updatedAt")?.setValue(new Date);
    form.updateValueAndValidity();
  }
  listenForValueChanges() {
    this.searchForm.get("query")?.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe), debounceTime(1000))
      .subscribe((val: string) => {
        if (val === "") {
          this.getAllNotes();
          return;
        }
        this.notesList = this.notesList.filter((note: Note) => 
          note.content.toLowerCase().includes(val.toLowerCase()) || 
          note.title.toLowerCase().includes(val.toLowerCase())
        );
      });
  }
  openNote(note: Note) {
    this.noteDialog = true;
    this.selectedColor = this.colorList[note.colorIndex];
    this.editNoteFrom.patchValue(note);
  }
  async submitForm(action: string) {
    if (this.createNoteFrom.invalid) {
      this.changeColor(0, 'createNoteFrom');
    }
    if (this.editNoteFrom.invalid) {
      this.changeColor(0, 'editNoteFrom');
    }
    try {
      if (this.createNoteFrom.valid && "save" === action) {
        const newNote: Omit<Note, 'id'> = {
          ...this.createNoteFrom.getRawValue()
        };
        const id = await this.fireStore.addNote(newNote);
        if (!id) {
          this.toast.showError("Error", "Failed to save Note");
          return;
        }
        this.clearForm(this.createNoteFrom);
        this.toast.showSuccess("Success", "Note saved");
        this.getAllNotes();
      } else if (this.editNoteFrom.valid && "update" === action) {
        const note = this.editNoteFrom.getRawValue();
        const id = note?.id;
        if (!id) {
          this.toast.showError("Error", "Note ID not found");
          return;
        }
        await this.fireStore.updateNote(id, note);
        this.clearForm(this.editNoteFrom);
        this.toast.showSuccess("Success", "Note updated");
        this.noteDialog = false;
        this.getAllNotes();
      } else {
        this.toast.showError("Error", "Empty Note");
      }
    } catch (error) {
      this.toast.showError("Error", "Operation failed");
    }
  }

  async addCollection() {
    if (this.createNewCollection.invalid) {
      this.toast.showError("Error", "Fill all required fields");
      return;
    }
    try {
      const collection: Omit<Collection, 'id'> = {
        name: this.createNewCollection.get('name')?.value.trim(),
        description: this.createNewCollection.get('description')?.value.trim()
      };
      const isCollectionPresent = this.collectionList.find((value) => value.name === collection.name);
      if (isCollectionPresent) {
        this.clearForm(this.createNewCollection);
        this.toast.showInfo("Info", `Collection "${collection.name}" already exists`);
        return;
      }
      const id = await this.fireStore.addCollection(collection);
      if (!id) {
        this.toast.showError("Error", "Failed to create collection");
        return;
      }
      this.clearForm(this.createNewCollection);
      this.toast.showSuccess("Success", "Collection created");
      this.getAllCollection();
    } catch (error) {
      this.toast.showError("Error", "Failed to create collection");
    }
  }

  async deleteCollection(collection: Collection) {
    if (collection?.id) {
      try {
        await this.fireStore.deleteCollection(collection.id);
        this.clearForm(this.createNewCollection);
        this.toast.showSuccess("Success", "Collection deleted");
        this.getAllCollection();
      } catch (error) {
        this.toast.showError("Error", "Failed to delete collection");
      }
    }
  }

  async delete(id: string) {
    try {
      await this.fireStore.deleteNote(id);
      this.noteDialog = false;
      this.clearForm(this.editNoteFrom);
      this.toast.showSuccess("Success", "Note deleted");
      this.getAllNotes();
    } catch (error) {
      this.toast.showError("Error", "Failed to delete note");
    }
  }
  onCollectionSelect(collection:Collection){

  }

  ngOnDestroy(): void {
    const data = this.createNoteFrom.getRawValue();
    localStorage.setItem("createNoteFrom", JSON.stringify(data));
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
