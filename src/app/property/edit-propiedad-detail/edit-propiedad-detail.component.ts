import { ArrayType } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormLabelProps } from 'react-bootstrap';
import { MapDetalleComponent } from 'src/app/map/map-detalle/map-detalle.component';
import { Ciudad } from 'src/app/model/Ciudad';
import { Fileupload } from 'src/app/model/fileupload';
import { Fotos } from 'src/app/model/fotos';
import { Ifotos } from 'src/app/model/ifotos';
import { Propiedad } from 'src/app/model/propiedad';
import { Provincia } from 'src/app/model/provincia';
import { ApiauthService } from 'src/app/servicios/apiauth.service';
import { HousingService } from 'src/app/servicios/housing.service';
import { UploadphotosService } from 'src/app/servicios/uploadphotos.service';

@Component({
  selector: 'app-edit-propiedad-detail',
  templateUrl: './edit-propiedad-detail.component.html',
  styleUrls: ['./edit-propiedad-detail.component.scss']
})
export class EditPropiedadDetailComponent implements OnInit {
  @ViewChild('map') map!: MapDetalleComponent;
  propiedad : Propiedad;
  ciudades : Array<Ciudad> = [] ;
  tipoPropiedades : Array<Ciudad> = [] ;
  editPropiedadForm!: FormGroup;
  fotosListaServicio:any;
  public propiedadId;
  provincias: Array<Provincia> = [];
  radioVenta:any;
  valido:Boolean;

  constructor(
    public housingService: HousingService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public uploadPhotosService: UploadphotosService,
    private router: Router,
    public apiService: ApiauthService,
  ) { }

  ngOnInit() {


     this.propiedadId = Number(this.route.snapshot.params['id']);
     this.route.params.subscribe((params: any) => {
      this.propiedadId = +params['id'];
    });
    this.getPropiedadById(this.propiedadId);

    this.housingService.getCiudades().subscribe((data) => {
      this.ciudades = data;

    });
    this.housingService.getTipoPropiedades().subscribe((data) => {
      this.tipoPropiedades = data;
    });

    this.housingService.getProvincias().subscribe((data) => {
      this.provincias = data;
    });
  }


  getPropiedadById(id:number){
    return this.housingService.getPropiedadById(id).subscribe((propiedad:any)=>{
    this.propiedad = propiedad.data;
    let propFotoPrincipal = this.propiedad.fotos.find(i=> i.isPrimary == true );
    this.propiedad.imagenUrl = propFotoPrincipal.imagenUrl;
    this.CreateaddPropiedadForm();
    console.log(this.propiedad);
    //this.uploadPhotosService.fotosLista =  this.propiedad.fotos;
    //console.log("fotos lista"+this.uploadPhotosService.fotosLista)
    this.verificarId();
    });
  }

  selectCiudadHandler (event: any) {
    var ciudades = this.ciudades.filter(
      ciudad => {
        return ciudad.nombre==event.target.value;
      }
      );
    const ciudad = ciudades[0];
    //this.map.cambiarVista(ciudad.latitud,ciudad.longitud);
  }

  CreateaddPropiedadForm() {

    this.editPropiedadForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: [this.propiedad.sellRent.toString(), Validators.required],
        PType: [this.propiedad.pType, Validators.required],
        Name: [this.propiedad.contacto, Validators.required],
      }),

      PriceInfo: this.fb.group({
        Price: [this.propiedad.precio, Validators.required],
        BuiltArea: [this.propiedad.areaM2, Validators.required],
      }),

      AddressInfo: this.fb.group({
        City: [this.propiedad.ciudad, Validators.required],
        Address: [this.propiedad.direccion, Validators.required],
      }),

      OtherInfo: this.fb.group({
        Años: [this.propiedad.anios, Validators.required],
        Description: [this.propiedad.descripcion],
      }),
    });
  }

    //#region <Getter Methods>
  // #region <FormGroups>
  get BasicInfo() {
    return this.editPropiedadForm.controls.BasicInfo as FormGroup;
  }

  get PriceInfo() {
    return this.editPropiedadForm.controls.PriceInfo as FormGroup;
  }

  get AddressInfo() {
    return this.editPropiedadForm.controls.AddressInfo as FormGroup;
  }

  get OtherInfo() {
    return this.editPropiedadForm.controls.OtherInfo as FormGroup;
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

  onSubmit(){

    this.mappropiedad();
    this.housingService.updatePropiedadById(this.propiedad);
    alert("Propiedad Actualizada con Éxito");
    if(this.propiedad.sellRent==1)
    this.router.navigate(['/sell-propiedad']);
    if(this.propiedadId.sellRent==2)
    this.router.navigate(['/rent-propiedad']);
    this.uploadPhotosService.fotosLista = [];



  }

  deleteFoto(idFoto: number){
    let text = 'Esta seguro que desea eliminar Foto seleccionada?';
    if (confirm(text) == true) {
      this.housingService.deleleFotoById(idFoto).subscribe(
        (r: any) => {

        },
        (error) => console.log(error.error.mensaje)
      );
      alert("Foto eliminada con Éxito!")
      this.getPropiedadById(this.propiedadId);
    }


  }

  deleteFotoFirebase(fileUpload: any){
    this.uploadPhotosService.deleteFile(fileUpload);
  }

  ciudadesPorProvincia: Array<Ciudad>=[];

 /* selectProvinciaHandler(event: any) {
    this.ciudadesPorProvincia = this.ciudades.filter(
      ciudad => {
        return ciudad.idProvincia==event.target.value;
      }
      );

  }*/
  mappropiedad(): void {
    //console.log(this.addPropiedadForm.value)
    this.propiedad.sellRent = this.SellRent.value;
    this.propiedad.contacto = this.Name.value;
   // this.propiedad.ptypeId = this.PType.value;
    this.propiedad.nombre = this.PType.value;
   // this.propiedad.cityId = this.City.value;
    this.propiedad.precio = this.Price.value;
    this.propiedad.areaM2 = this.BuiltArea.value;
    this.propiedad.direccion = this.Address.value;
   // this.propiedad.anios = this.Años.value;
    this.propiedad.descripcion = this.Description.value;
    //const ubicacion = this.map.devolverUbicación();
    //this.propiedad.latitud= ubicacion[0];
    //this.propiedad.longitud= ubicacion[1];
    const fotos: Ifotos[] = [];
    this.uploadPhotosService.fotosLista.forEach((foto) => {
      fotos.push({ isPrimary: foto.isPrimary, imagenUrl: foto.url });
    });
    this.propiedad.fotos = fotos;
    //this.propiedad.userId = this.auth.UsuarioData.id;
  }

  verificarId(){
    if(this.propiedad.userId==this.apiService.UsuarioData.id){
      this.valido=true
      console.log("verdad");
    }else{
      this.valido=false
      console.log("falso");
    }
  }
}

