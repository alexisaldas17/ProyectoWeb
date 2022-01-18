import { Component, OnInit } from '@angular/core';
import { UploadphotosService } from '../../servicios/uploadphotos.service';
import { Fileupload } from '../../model/fileupload';
import {NgStyle, CommonModule} from "@angular/common";
@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],

})
export class UploadFormComponent implements OnInit {
  selectedFiles: FileList | undefined ;
  currentFileUpload!: Fileupload;
  percentage!: number;
  constructor(private uploadService: UploadphotosService) { }

  ngOnInit() {
  }
  selectFile(event:any): void {

    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }

  upload(): void {
    const file = this.selectedFiles!.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new Fileupload(file!);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
      },
      error => {
        console.log(error);
      }
    );
  }
}
