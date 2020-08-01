import icons from '@constants/icons';
import bodyValidator from '../bodyValidator';
import deleteNoteValidator from './deleteNote.validator';

export default [
  ...deleteNoteValidator,
  bodyValidator('title').isString().isLength({ min: 3 }),
  bodyValidator('descrption').isString().isLength({ min: 3 }),
  bodyValidator('icon').isIn(icons),
  bodyValidator('color').isString().isHexColor()
];
