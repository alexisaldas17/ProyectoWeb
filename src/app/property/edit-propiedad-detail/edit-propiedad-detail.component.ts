import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormLabelProps } from 'react-bootstrap';
import { Ciudad } from 'src/app/model/Ciudad';
import { Propiedad } from 'src/app/model/propiedad';
import { HousingService } from 'src/app/servicios/housing.service';

@Component({
  selector: 'app-edit-propiedad-detail',
  templateUrl: './edit-propiedad-detail.component.html',
  styleUrls: ['./edit-propiedad-detail.component.scss']
})
export class EditPropiedadDetailComponent implements OnInit {

  propiedad : Propiedad;
  ciudades : Array<Ciudad> = [] ;
  tipoPropiedades : Array<Ciudad> = [] ;
  editPropiedadForm!: FormGroup;
  
  radioVenta:any;
  
  constructor(
    public housingService: HousingService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    var propiedadId = Number(this.route.snapshot.params['id']);
    console.log(propiedadId);
    this.route.params.subscribe((params: any) => {
      propiedadId = +params['id'];
    });
    this.getPropiedadById(propiedadId);

    this.housingService.getCiudades().subscribe((data) => {
      this.ciudades = data;
    });
    this.housingService.getTipoPropiedades().subscribe((data) => {
      this.tipoPropiedades = data;
    });
  }

  // #region <FormGroups>
  get InformacionBase() {
    return this.editPropiedadForm.controls.InformacionBase as FormGroup;
  }
  // #endregion

  getPropiedadById(id:number){
    this.housingService.getPropiedadById(id).subscribe((propiedad:any)=>{
    this.propiedad = propiedad.data;
    this.CreateaddPropiedadForm();
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
    console.log(this.propiedad);
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
        Años: [this.propiedad.años, Validators.required],
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
}

