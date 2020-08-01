/* eslint-disable @typescript-eslint/no-explicit-any */
import Response from '@constants/response';
import updateNote from '@providers/note/updateNote.provider';
import errorResponse from '@utils/errorHelper';
import { ObjectId } from 'mongodb';

const { created } = Response;

export default ({
  body,
  params: { noteId }
}: {
  body: any;
  params: { noteId: ObjectId };
}) =>
  Promise.resolve(body)
    .then(updateNote(noteId))
    .then(created)
    .catch((e) => errorResponse(e, true));
