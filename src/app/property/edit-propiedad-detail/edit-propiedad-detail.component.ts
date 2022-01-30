import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ciudad } from 'src/app/model/Ciudad';
import { Propiedad } from 'src/app/model/propiedad';
import { HousingService } from 'src/app/servicios/housing.service';

@Component({
  selector: 'app-edit-propiedad-detail',
  templateUrl: './edit-propiedad-detail.component.html',
  styleUrls: ['./edit-propiedad-detail.component.scss']
})
export class EditPropiedadDetailComponent implements OnInit {

  propiedad !: Propiedad ;
  ciudades : Array<Ciudad> = [] ;
  addPropiedadForm!: FormGroup;

  constructor(
    public housingService: HousingService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.CreateaddPropiedadForm();

    var propiedadId = Number(this.route.snapshot.params['id']);
    console.log(propiedadId);
    this.route.params.subscribe((params: any) => {
      propiedadId = +params['id'];
    });
    this.getPropiedadById(propiedadId);

    this.housingService.getCiudades().subscribe((data) => {
      this.ciudades = data;
    });
  }

  // #region <FormGroups>
  get InformacionBase() {
    return this.addPropiedadForm.controls.InformacionBase as FormGroup;
  }
  // #endregion

  getPropiedadById(id:number){
    this.housingService.getPropiedadById(id).subscribe((propiedad:any)=>{
    this.propiedad = propiedad.data;
    console.log(propiedad);
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
    this.addPropiedadForm = this.fb.group({
      InformacionBase: this.fb.group({
        City: [null, Validators.required],
      }),
      }
    );
  }
}

