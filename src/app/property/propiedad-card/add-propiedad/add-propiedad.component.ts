import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AnyRecord } from 'dns';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Observable } from 'rxjs';
import { Fotos } from 'src/app/model/fotos';
import { Ipropiedadbase } from 'src/app/model/ipropiedadbase';
import { Propiedad } from 'src/app/model/propiedad';
import { AlertifyService } from 'src/app/servicios/alertify.service';
import { ApiauthService } from 'src/app/servicios/apiauth.service';
import { HousingService } from 'src/app/servicios/housing.service';
import { UploadphotosService } from 'src/app/servicios/uploadphotos.service';
@Component({
  selector: 'app-add-propiedad',
  templateUrl: './add-propiedad.component.html',
  styleUrls: ['./add-propiedad.component.scss'],
})
export class AddPropiedadComponent implements OnInit {
  // @ViewChild('Form') addPropiedadForm!: NgForm;
  @ViewChild('formTabs') formTabs!: TabsetComponent;
  @ViewChild('tipTabs') tipoTavs!: TabsetComponent;
  //#region <DECLARACION VARIABLES>

  showOrHiddden: boolean = true;
  addPropiedadForm!: FormGroup;
  nextClicked!: boolean;
  propiedad:Propiedad = new Propiedad();
  ciudades: Array<any> = [];
  tpropiedad: Array<any> = [];
  publicacionesUsuario: Array<any> = [];
  selectedFile!: Fotos;
  selectedFiles!: FileList;
  progressInfos: any = [];
  message = '';
  fileInfos!: Observable<any>;

  //#endregion

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private housingService: HousingService,
    private alertify: AlertifyService,
    public auth: ApiauthService,
    private imageService: UploadphotosService
  ) { }

  ngOnInit() {
    this.CreateaddPropiedadForm();
    this.housingService.getCiudades().subscribe((data) => {
      this.ciudades = data;
    });
    this.housingService.getTipoPropiedades().subscribe((data) => {
      this.tpropiedad = data;
    });
    this.getPublicacionesUsuario();
    //this.fileInfos = this.imageService.getFiles();

  }

  //#region <CARGA DE FOTOS>
  selectFiles(event: any) {
    this.progressInfos = [];

    const files = event.target.files;
    let isImage = true;

    for (let i = 0; i < files.length; i++) {
      if (files.item(i).type.match('image.*')) {
        continue;
      } else {
        isImage = false;
        alert('invalid format!');
        break;
      }
    }

    if (isImage) {
      this.selectedFiles = event.target.files;
    } else {
      //this.selectedFiles = undefined;
      event.srcElement.percentage = null;
    }
  }

  uploadFiles() {
    this.message = '';

    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  upload(idx: any, file: any) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    this.imageService.upload(file).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].percentage = Math.round(
            (100 * event.loaded) / event.total!
          );
        } else if (event instanceof HttpResponse) {
          // this.fileInfos = this.imageService.getFiles();
        }
      },
      (err) => {
        this.progressInfos[idx].percentage = 0;
        this.message = 'Could not upload the file:' + file.name;
      }
    );
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new Fotos(event.target.result, file);

      this.selectedFile.pending = true;
      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
          this.onSuccess();
        },
        (err) => {
          this.onError();
        }
      );
    });

    reader.readAsDataURL(file);
  }
  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }
  //#endregion

  getPublicacionesUsuario() {
    this.housingService
      .getPublicacionesUsuario(this.auth.UsuarioData.id)
      .subscribe((data) => {
        this.publicacionesUsuario = data;
      });
  }
  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.nextClicked = true;
    if (this.allTabsValid()) {
      this.mappropiedad();
      console.log(this.propiedad);
      return;
      this.housingService.addProperty(this.propiedad);
      this.alertify.success('Felicidades, ha sido publicada tu propiedad');
      console.log(this.addPropiedadForm);

      if (this.SellRent.value === '2') {
        this.router.navigate(['/rent-propiedad']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.alertify.error(
        'Por favor revise el formulario y llene todos los campos'
      );
    }
  }
  allTabsValid(): boolean {
    if (this.BasicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }
    if (this.PriceInfo.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }
    if (this.AddressInfo.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }
    if (this.OtherInfo.invalid) {
      this.formTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }

  selectTab(tabId: number, IsCurrentTabValid: boolean) {
    this.nextClicked = true;
    if (IsCurrentTabValid) {
      this.formTabs.tabs[tabId].active = true;
    }
  }
  CreateaddPropiedadForm() {
    this.addPropiedadForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: ['1', Validators.required],
        PType: [null, Validators.required],
        Name: [null, Validators.required],
      }),

      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
      }),

      AddressInfo: this.fb.group({
        City: [null, Validators.required],
        Address: [null, Validators.required],
      }),

      OtherInfo: this.fb.group({
        Años: [null, Validators.required],
        Description: [null],
      }),
    });
  }

  //#region <Getter Methods>
  // #region <FormGroups>
  get BasicInfo() {
    return this.addPropiedadForm.controls.BasicInfo as FormGroup;
  }

  get PriceInfo() {
    return this.addPropiedadForm.controls.PriceInfo as FormGroup;
  }

  get AddressInfo() {
    return this.addPropiedadForm.controls.AddressInfo as FormGroup;
  }

  get OtherInfo() {
    return this.addPropiedadForm.controls.OtherInfo as FormGroup;
  }
  // #endregion

  //#region <Form Controls>
  get SellRent() {
    return this.BasicInfo.controls.SellRent as FormControl;
  }
  get PType() {

    return this.BasicInfo.controls.PType as FormControl;
  }
  get Name() {
    return this.BasicInfo.controls.Name as FormControl;
  }


  get Price() {
    return this.PriceInfo.controls.Price as FormControl;
  }

  get BuiltArea() {
    return this.PriceInfo.controls.BuiltArea as FormControl;
  }

  get Address() {
    return this.AddressInfo.controls.Address as FormControl;
  }

  get City() {
    return this.AddressInfo.controls.City as FormControl;
  }
  get Años() {
    return this.OtherInfo.controls.Años as FormControl;
  }

  get Description() {
    return this.OtherInfo.controls.Description as FormControl;
  }

  //#endregion
  //#endregion
  mappropiedad(): void {
    //console.log(this.addPropiedadForm.value)
    this.propiedad.SellRent = this.SellRent.value;
    this.propiedad.PType = this.PType.value;
    this.propiedad.nombre = this.PType.value;
    this.propiedad.ciudad = this.City.value;
    this.propiedad.precio = this.Price.value;
    this.propiedad.areaM2 = this.BuiltArea.value;
    this.propiedad.Direccion = this.Address.value;
    this.propiedad.Años = this.Años.value;
    this.propiedad.descripcion = this.Description.value;
   this.propiedad.Fotos = [{IsPrimary:true, ImageUrl:"foto1"},{IsPrimary: false, ImageUrl:"foto2"}];
    this.propiedad.PostedOn = new Date().toString();
  }
}
