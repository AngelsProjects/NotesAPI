/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NoteModel } from '@db/models/note.model';
import errorResponse from '@utils/errorHelper';
import { ObjectId } from 'mongodb';

export default (_id: ObjectId): Promise<any> =>
  Promise.resolve(
    NoteModel.updateOne({ _id }, { deletedDate: new Date() })
  ).catch((e) => errorResponse(e, false));
