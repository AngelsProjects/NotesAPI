import paramsValidator from '../paramsValidator';

export default [paramsValidator('noteId').isMongoId().notEmpty()];
