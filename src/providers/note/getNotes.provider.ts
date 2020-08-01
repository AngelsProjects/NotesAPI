import Note from '@interfaces/Note';
import getNotes from '@services/note/getNotes.service';

export default (search?: string): Promise<Note[]> =>
  Promise.resolve(getNotes(search));
