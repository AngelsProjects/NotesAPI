/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NoteModel } from '@db/models/note.model';
import Note from '@interfaces/Note';
import errorResponse from '@utils/errorHelper';
import toNotes from './_helpers/toNotes';

export default ($regex: string = ''): Promise<Note[]> =>
  Promise.resolve(
    NoteModel.find({
      $or: [
        { title: { $regex, $options: 'i' } },
        { description: { $regex, $options: 'i' } }
      ],
      deletedDate: { $exists: false }
    })
      .sort({ updatedDate: -1 })
      .lean()
  )
    .then((notes: any[]) => toNotes(notes))
    .catch((e) => errorResponse(e, false));
