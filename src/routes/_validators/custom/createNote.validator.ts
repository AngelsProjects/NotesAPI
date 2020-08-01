import icons from '@constants/icons';
import bodyValidator from '../bodyValidator';

export default [
  bodyValidator('title').isString().isLength({ min: 3 }).notEmpty(),
  bodyValidator('description').isString().isLength({ min: 3 }).notEmpty(),
  bodyValidator('icon').isIn(icons).notEmpty(),
  bodyValidator('color').isString().isHexColor().notEmpty()
];
