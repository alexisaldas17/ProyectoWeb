import { Component, OnInit } from '@angular/core';
import { UploadphotosService } from '../../servicios/uploadphotos.service';
import { finalize, tap, map,switchMap } from 'rxjs/operators';

import { Fileupload } from 'src/app/model/fileupload';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss']
})
export class UploadListComponent implements OnInit {
  fileUploads!: Fileupload[] ;
  constructor(public uploadService: UploadphotosService) { }

  ngOnInit():void {
   /* this.uploadService.getFiles(6).snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads as Fileupload[];
    });*/
  }

}
