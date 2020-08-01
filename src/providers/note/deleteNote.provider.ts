/* eslint-disable @typescript-eslint/no-explicit-any */
import deleteNote from '@services/note/deleteNote.service';
import { ObjectId } from 'mongodb';

export default (noteId: ObjectId): Promise<any> =>
  Promise.resolve(noteId).then(deleteNote);
