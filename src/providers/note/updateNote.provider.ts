/* eslint-disable @typescript-eslint/no-explicit-any */
import updateNote from '@services/note/updateNote.service';
import { ObjectId } from 'mongodb';

export default (note: any) => (noteId: ObjectId): Promise<any> =>
  Promise.resolve(note).then(updateNote(noteId));
