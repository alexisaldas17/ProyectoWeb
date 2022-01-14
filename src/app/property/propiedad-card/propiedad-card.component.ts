import { Component, Input, OnInit } from '@angular/core';
import { Ipropiedadbase } from 'src/app/model/ipropiedadbase';

@Component({
  selector: 'app-propiedad-card',
  templateUrl: './propiedad-card.component.html',
  styleUrls: ['./propiedad-card.component.scss']
})
export class PropiedadCardComponent implements OnInit {
  @Input() propiedad! : Ipropiedadbase;
  @Input() hiddeIcons!: any;
  constructor() { }

  ngOnInit() {
  }

}
