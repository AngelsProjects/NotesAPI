/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NoteModel } from '@db/models/note.model';
import errorResponse from '@utils/errorHelper';
import { ObjectId } from 'mongodb';

export default (note: any) => (_id: ObjectId): Promise<any> =>
  Promise.resolve(NoteModel.updateOne({ _id }, note)).catch((e) =>
    errorResponse(e, false)
  );
