import { INote } from '@db/models/note.model';
import Note from '@interfaces/Note';
import errorResponse from '@utils/errorHelper';
import toNote from './toNote';

export default (notes: INote[]): Note[] => {
  try {
    const newNotes: Note[] = [];
    if (notes.length > 0)
      for (let i = 0; i < notes.length; i++) {
        const note = toNote(notes[i]);
        if (note) newNotes.push(note);
      }
    return newNotes;
  } catch (e) {
    return errorResponse(e, false);
  }
};
