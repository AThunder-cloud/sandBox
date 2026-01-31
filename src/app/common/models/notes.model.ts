export interface Note {
    id?: string; // Unique identifier (Firestore document ID)
    title: string; // Note title
    content: string; // Main content
    createdAt: Date; // Creation date
    updatedAt: Date; // Last updated date
    listId?: string; // ID of the Collection it belongs to
    tags?: string[]; // Optional tags
    colorIndex: number; // Optional visual indicator
    isPinned?: boolean; // Mark as pinned
    isArchived?: boolean; // Archive status
    reminders?: Date[]; // Reminder dates
    attachments?: string[]; // Attached files or images
    userId: string; // Owner of the note
}

export interface Collection {
    id?: string; // Unique identifier (Firestore document ID)
    name: string; // Name of the list
    description?: string; // Optional description
    userId: string; // Owner of the collection
}

export interface NoteResponse {
    success: boolean;
    message: string;
    data?: any; // This can hold the note object or be omitted on failure
}
