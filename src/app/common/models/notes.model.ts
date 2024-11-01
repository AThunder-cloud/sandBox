export interface Note {
    id: string; // Unique identifier for the note
    title: string; // Note title
    content: string; // Main content of the note
    createdAt: Date; // Creation date of the note
    updatedAt: Date; // Last updated date
    tags?: string[]; // Optional tags for categorizing the note
    color?: string; // Optional color for visually differentiating notes
    isPinned?: boolean; // Optional field to mark important notes as pinned
    isArchived?: boolean; // Optional field to archive notes
    reminders?: Date[]; // Optional array of reminder dates for the note
    attachments?: string[]; // Array of URLs for any attached files or images
}
export interface NotesList {
    id: string; // Unique identifier for the list
    name: string; // Name of the list (e.g., "Work", "Personal")
    description?: string; // Optional description of the list
    notes: Note[]; // Array of notes in this list
    createdAt: Date; // Creation date of the list
    updatedAt: Date; // Last updated date
    color?: string; // Optional color to differentiate lists visually
    isArchived?: boolean; // Optional field to archive the list
}
export interface NoteResponse {
    success: boolean;
    message: string;
    data?: any; // This can hold the note object or be omitted on failure
}
