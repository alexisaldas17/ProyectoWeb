
export class Fileupload {
  key!: any  ;
  isPrimary?: boolean;
  name!: string ;
  url!: string ;
  file: File;

  constructor(file: File) {
    this.file = file;
    this.isPrimary = false;
  }
}
