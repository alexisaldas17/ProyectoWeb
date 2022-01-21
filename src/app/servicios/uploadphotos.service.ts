import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { error } from 'console';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Fileupload } from '../model/fileupload';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class UploadphotosService {
  private baseUrl = 'http://localhost:8080';
  private basePath = '/uploads';
  fotosLista: Fileupload[]=[] ;
constructor(private http: HttpClient,
            private db: AngularFireDatabase,
            private storage: AngularFireStorage,
            private alertify: AlertifyService
            ) { }

public uploadImage(image: File): Observable<any> {
  console.log(image)
  const formData = new FormData();

  formData.append('image', image);

  return this.http.post('/api/v1/image-upload', formData);
}

upload(file: File): Observable<HttpEvent<any>> {
  const formData: FormData = new FormData();

  formData.append('file', file);

  const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
    reportProgress: true,
    responseType: 'json'
  });

  return this.http.request(req);
}

/*getFiles(): Observable<any> {
  return this.http.get(`${this.baseUrl}/files`);
}*/

//---------------------------------------------------------------------------
pushFileToStorage(fileUpload: Fileupload): Observable<number> {
  console.log(this.fotosLista.length);
  if(this.fotosLista.length<5){
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask:any = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
   ).subscribe();

   return uploadTask.percentageChanges();

  }else{
   //this.alertify.warning(Error.toString());
   throw new Error("Aviso: Solo se puede cargar 5 fotos");
  }
}

private saveFileData(fileUpload: Fileupload): void {
  this.db.list(this.basePath).push(fileUpload);
  this.fotosLista.push(fileUpload) ;
  console.log(this.fotosLista);
}

getFiles(numberItems:any): AngularFireList<Fileupload> {
  return this.db.list(this.basePath, ref =>
    ref.limitToLast(numberItems));
}

deleteFile(fileUpload: Fileupload): void {
  this.deleteFileDatabase(fileUpload.key)
    .then(() => {
      this.deleteFileStorage(fileUpload);
      })
    .catch(error => console.log(error));
}

private deleteFileDatabase(key: string): Promise<void> {
  return this.db.list(this.basePath).remove(key);
}

public deleteFileStorage(foto: Fileupload): void {
  const storageRef = this.storage.ref(this.basePath);
  storageRef.child(foto.name).delete();
  const index = this.fotosLista.indexOf(foto,0);
  console.log(index);
  this.fotosLista.splice(index,1);
}
}
