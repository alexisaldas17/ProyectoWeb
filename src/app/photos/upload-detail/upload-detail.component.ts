import { Component, Input, OnInit } from '@angular/core';
import { UploadphotosService } from '../../servicios/uploadphotos.service';
import { Fileupload } from '../../model/fileupload';
//import { AlertifyService } from 'src/app/servicios/alertify.service';
import * as alertify from 'alertifyjs';
import { UploadListComponent } from '../upload-list/upload-list.component';
@Component({
  selector: 'app-upload-detail',
  templateUrl: './upload-detail.component.html',
  styleUrls: ['./upload-detail.component.scss']
})
export class UploadDetailComponent implements OnInit {
  @Input() fileUpload!: Fileupload;
  @Input() clase!: UploadListComponent;
  constructor(private uploadService: UploadphotosService) { }

  ngOnInit() {
  }
  deleteFileUpload(fileUpload:any): void {

       this.uploadService.deleteFileStorage(fileUpload);

   }

}
