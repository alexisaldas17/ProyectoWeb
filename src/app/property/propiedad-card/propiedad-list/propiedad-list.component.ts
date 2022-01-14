
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

  propiedades!: Array<Ipropiedadbase>;
  SellRent=1;

  constructor(private housingService: HousingService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.route.snapshot.url.toString()){
      this.SellRent =2;

    }
   this.housingService.getAllPropiedades(this.SellRent).subscribe(data=>{
     console.log(data);
      this.propiedades = data;
      console.log(this.propiedades);
   }, error=> {
     console.log("http error:");
    console.log(error);
   }
    );
   }


  }


