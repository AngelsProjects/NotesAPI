/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Document, HookNextFunction, Schema } from 'mongoose';
import Note from '@interfaces/Note';

const NoteSchema: Schema = new Schema({
  title      : { type: String, required: true, minlength: 3, maxlength: 50 },
  description: { type: String, required: true, minlength: 3 },
  icon       : { type: Schema.Types.Mixed, required: true },
  color      : { type: String, required: true },
  updatedDate: { type: Date, required: true },
  deletedDate: { type: Date, required: false }
});

export interface INote extends Note, Document {
  id: string;
}

// eslint-disable-next-line func-names
NoteSchema.pre('validate', function (this: INote, next: HookNextFunction) {
  this.updatedDate = new Date();
  next();
});

export const NoteModel = mongoose.modelNames().includes('notes')
  ? mongoose.model<INote>('notes')
  :  mongoose.model<INote>('notes', NoteSchema);
