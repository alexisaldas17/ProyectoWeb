import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-propiedad-detail',
  templateUrl: './propiedad-detail.component.html',
  styleUrls: ['./propiedad-detail.component.scss']
})
export class PropiedadDetailComponent implements OnInit {
public propiedadId!: number;
  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
this.propiedadId = Number(this.route.snapshot.params['id']);
    this.route.params.subscribe((params:any)=>{
      this.propiedadId = + params['id'];
    });
  }
  onSelectNext(){
    this.propiedadId+=1;
    this.router.navigate(['propiedad-detail', this.propiedadId])
  }
}
