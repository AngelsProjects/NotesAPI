import createNote from '@controllers/note/createNote.controller';
import deleteNote from '@controllers/note/deleteNote.controller';
import getNotes from '@controllers/note/getNotes.controller';
import updateNote from '@controllers/note/updateNote.controller';
import { Express, Request, Response } from 'express';
import handleFunction from './_helpers/handleFunction';
import createNoteValidator from './_validators/custom/createNote.validator';
import deleteNoteValidator from './_validators/custom/deleteNote.validator';
import getNotesValidator from './_validators/custom/getNotes.validator';
import updateNoteValidator from './_validators/custom/updateNote.validator';

export default (app: Express) => {
  app.delete(
    '/notes/:noteId',
    deleteNoteValidator,
    (req: Request, res: Response) => handleFunction(deleteNote, res, req)
  );

  app.get('/notes', getNotesValidator, (req: Request, res: Response) =>
    handleFunction(getNotes, res, req)
  );

  app.post('/notes', createNoteValidator, (req: Request, res: Response) =>
    handleFunction(createNote, res, req)
  );

  app.put(
    '/notes/:noteId',
    updateNoteValidator,
    (req: Request, res: Response) => handleFunction(updateNote, res, req)
  );
};
