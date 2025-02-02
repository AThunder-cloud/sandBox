export interface Note {
    id?: number; // Unique identifier
    title: string; // Note title
    content: string; // Main content
    createdAt: Date; // Creation date
    updatedAt: Date; // Last updated date
    listId?: string; // ID of the NotesList it belongs to
    tags?: string[]; // Optional tags
    colorIndex: number; // Optional visual indicator
    isPinned?: boolean; // Mark as pinned
    isArchived?: boolean; // Archive status
    reminders?: Date[]; // Reminder dates
    attachments?: string[]; // Attached files or images
}

export interface NotesList {
    id: string; // Unique identifier
    name: string; // Name of the list
    description?: string; // Optional description
    createdAt: Date; // Creation date
    updatedAt: Date; // Last updated date
    color?: string; // Optional visual indicator
    isArchived?: boolean; // Archive status
}

export interface NoteResponse {
    success: boolean;
    message: string;
    data?: any; // This can hold the note object or be omitted on failure
}
