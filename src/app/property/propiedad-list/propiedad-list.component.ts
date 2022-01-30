import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { type } from 'os';
import { Ipropiedadbase } from 'src/app/model/ipropiedadbase';
import { Propiedad } from 'src/app/model/propiedad';
import { HousingService } from 'src/app/servicios/housing.service';

@Component({
  selector: 'app-propiedad-list',
  templateUrl: './propiedad-list.component.html',
  styleUrls: ['./propiedad-list.component.scss'],
})
export class PropiedadListComponent implements OnInit {

  propiedades!: Propiedad[];
  propiedadesBase!: Propiedad[];
  SellRent = 1;
  sCiudad!: string;
  sPropiedad!: string;
  sFecha!: string;

  constructor(
    public housingService: HousingService,
    private route: ActivatedRoute
  ) {}
  ciudadesArray: Array<any> = [];
  tpropiedadArray: Array<any> = [];
  ngOnInit() {
    if (this.route.snapshot.url.toString() == 'sell-propiedad') {
      this.SellRent = 1;
    } else {
      this.SellRent = 2;
    }

    this.getPropiedades();
    this.getCiudades();
    this.getTPropiedades();
  }
  getPropiedades() {
    this.housingService.getAllPropiedades(this.SellRent).subscribe(
      (data) => {
        this.propiedades = data;
        this.propiedadesBase = data;
        // this.propiedadesBase = this.propiedades;
        console.log(data);
      },
      (error) => {
        console.log('http error: ' + error);
      }
    );
  }

  getCiudades() {
    this.housingService.getCiudades().subscribe((ciudad) => {
      this.ciudadesArray = ciudad;
    });
  }
  getTPropiedades() {
    this.housingService.getTipoPropiedades().subscribe((tprop) => {
      this.tpropiedadArray = tprop;
    });
  }

  selectCiudadHandler(event: any) {
    //update the ui
    this.sCiudad = event.target.value;
    this.filtrar();
  }

  selectPropiedadHandler(event: any) {
    //update the ui
    this.sPropiedad = event.target.value;
    console.log(this.sPropiedad);
    this.filtrar();
  }

  selectFechaHandler(event: any) {
    //update the ui
    this.sFecha = event.target.value;
    console.log(this.sFecha);
    this.filtrar();
  }

  filtrar() {
    this.propiedades = this.propiedadesBase;
    if (this.sCiudad === 'undefined' || this.sCiudad == null){

    }else{
      this.propiedades = this.propiedades.filter((propiedad) => {
        return propiedad.ciudad == this.sCiudad;
      });
    }

    if(this.sPropiedad === 'undefined' || this.sPropiedad == null){

    }else{
      this.propiedades = this.propiedades.filter(
        (propiedad) => propiedad.nombre == this.sPropiedad
      );
    }

    if(this.sFecha!=""){
      this.propiedades = this.propiedades.filter(propiedad => propiedad.postedOn==this.sFecha);
    }
  }
}
