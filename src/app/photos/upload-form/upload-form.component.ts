import { Component, OnInit } from '@angular/core';
import { UploadphotosService } from '../../servicios/uploadphotos.service';
import { Fileupload } from '../../model/fileupload';
import {NgStyle, CommonModule} from "@angular/common";
import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],

})
export class UploadFormComponent implements OnInit {
  selectedFiles: FileList | undefined ;
  currentFileUpload!: Fileupload;
  percentage!: number|string;
  error!:string;
  constructor(private uploadService: UploadphotosService) { }

  ngOnInit() {
  }
  selectFile(event:any): void {

    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
    this.percentage=0;
    this.error="";
  }

  upload(): void {
    const file = this.selectedFiles!.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new Fileupload(file!);
    try {
      this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
        percentage => {
          this.percentage = Math.round(percentage);
          this.error="";
       },
       error => {
       }
      );
    } catch (error:any|Error) {
      this.percentage = 100;
      this.error=error.message;
      console.log(error);
    }
  }
}
