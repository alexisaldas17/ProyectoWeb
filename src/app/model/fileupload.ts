
export class Fileupload {
  id?: any;
  imagenUrl?: string;
  key?: any  ;
  isPrimary?: boolean;
  name?: string ;
  url?: string ;
  file?: File;

  constructor(file?: File, url?:string, key?: any, isPrimary?: any) {
    this.file = file;
    this.isPrimary = false ;

  }

}
