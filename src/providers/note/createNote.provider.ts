/* eslint-disable @typescript-eslint/no-explicit-any */
import Note from '@interfaces/Note';
import createNote from '@services/note/createNote.service';

export default (note: Note): Promise<any> =>
  Promise.resolve(note).then(createNote);
