import Response from '@constants/response';
import getNotes from '@providers/note/getNotes.provider';
import errorResponse from '@utils/errorHelper';

const { ok } = Response;

export default ({ query: { search } }: { query: { search?: string } }) =>
  Promise.resolve(search)
    .then(getNotes)
    .then(ok)
    .catch((e) => errorResponse(e, true));
