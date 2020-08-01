export default interface Note {
  id?          : string;
  title        : string;
  description  : string;
  icon         : string;
  color        : string;
  creationDate?: Date;
  updatedDate? : Date;
  deletedDate? : Date;
}
