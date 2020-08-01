import Response from '@constants/response';
import Note from '@interfaces/Note';
import createNote from '@providers/note/createNote.provider';
import errorResponse from '@utils/errorHelper';
import { tap } from 'ramda';

const { created } = Response;

export default ({ body }: { body: Note }) =>
  Promise.resolve(body)
    .then(tap(console.log))
    .then(createNote)
    .then(created)
    .catch((e) => errorResponse(e, true));
