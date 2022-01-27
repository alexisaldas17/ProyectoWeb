import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Propiedad } from 'src/app/model/propiedad';
import { HousingService } from 'src/app/servicios/housing.service';

@Component({
  selector: 'app-propiedad-detail',
  templateUrl: './propiedad-detail.component.html',
  styleUrls: ['./propiedad-detail.component.scss'],
})
export class PropiedadDetailComponent implements OnInit {
  public propiedadId!: number;
  propiedad: any ;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private housingService: HousingService) {}

  ngOnInit() {
    this.propiedadId = Number(this.route.snapshot.params['id']);
    this.route.params.subscribe((params: any) => {
      this.propiedadId = +params['id'];
    });
    this.getPropiedadById(this.propiedadId);
  }
  onSelectNext() {
    this.propiedadId += 1;
    this.router.navigate(['propiedad-detail', this.propiedadId]);
  }
  getPropiedadById(id:number){
 this.housingService.getPropiedadById(id).subscribe((propiedad:any)=>{
   this.propiedad = propiedad.data;
   console.log(propiedad);
 });
  }
}
