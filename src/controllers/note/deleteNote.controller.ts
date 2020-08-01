import Response from '@constants/response';
import deleteNote from '@providers/note/deleteNote.provider';
import errorResponse from '@utils/errorHelper';
import { ObjectId } from 'mongodb';

const { ok } = Response;

export default ({ params: { noteId } }: { params: { noteId: ObjectId } }) =>
  Promise.resolve(noteId)
    .then(deleteNote)
    .then(ok)
    .catch((e) => errorResponse(e, true));
