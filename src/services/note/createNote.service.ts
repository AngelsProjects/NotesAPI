/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NoteModel } from '@db/models/note.model';
import Note from '@interfaces/Note';
import errorResponse from '@utils/errorHelper';

export default (note: Note): Promise<any> =>
  Promise.resolve(note)
    .then((mnote: Note) => {
      console.log('note is:', mnote);
      return NoteModel.create(mnote);
    })
    .catch((e) => {
      console.log('heyaa!', e);
      return errorResponse(e, false);
    });
