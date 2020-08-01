/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { INote } from '@db/models/note.model';
import Note from '@interfaces/Note';
import moment from 'moment';

export default (note: INote | null): Note | undefined => {
  if (note) {
    return {
      id          : note._id.toString(),
      title       : note.title,
      description : note.description,
      creationDate: moment(note._id.getTimestamp()).toDate(),
      deletedDate : note.deletedDate,
      updatedDate : note.updatedDate,
      icon        : note.icon,
      color       : note.color
    };
  }
  return undefined;
};
