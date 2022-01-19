
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ipropiedadbase } from 'src/app/model/ipropiedadbase';
import { HousingService } from 'src/app/servicios/housing.service';


@Component({
  selector: 'app-propiedad-list',
  templateUrl: './propiedad-list.component.html',
  styleUrls: ['./propiedad-list.component.scss']
})
export class PropiedadListComponent implements OnInit {

  propiedades!: Ipropiedadbase[];
  SellRent = 1;

  constructor(public housingService: HousingService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.url.toString()=='sell-propiedad') {

      this.SellRent = 1;


    }else{
      this.SellRent =2;
    }
    this.getPropiedades();

  }
  getPropiedades(){
    this.housingService.getAllPropiedades(this.SellRent).subscribe(data => {

      this.propiedades = data;
      console.log(this.propiedades);

    }, error => {
      console.log("http error: ");
      console.log(error);
    }
    );
  }


}


