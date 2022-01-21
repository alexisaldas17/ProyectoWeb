import { Component, OnInit } from '@angular/core';
import { UploadphotosService } from '../../servicios/uploadphotos.service';
import { finalize, tap, map,switchMap } from 'rxjs/operators';

import { Fileupload } from 'src/app/model/fileupload';
import { AddPropiedadComponent } from 'src/app/property/add-propiedad/add-propiedad.component';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss']
})
export class UploadListComponent implements OnInit {
  fileUploads!: Fileupload[] ;
  constructor(public uploadService: UploadphotosService, private addPropiedad: AddPropiedadComponent) { }

  ngOnInit():void {
    }

  isChecked!:any;
  onCheck!:boolean;
  isCheckedName!:any;
  public shown=false;

  public checklist: any= this.uploadService.fotosLista;


  isAllSelected(item:any) {
    this.checklist.forEach((val:any) => {
      if (val.name == item.name){
       val.isPrimary = !val.isPrimary;
       this.addPropiedad.propiedad.imagenUrl=item.url;
      }
      else {
        val.isPrimary = false;
      }
    });
    this.uploadService.fotosLista = this.checklist;
  }

}
