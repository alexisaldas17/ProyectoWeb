import { Component, Input, OnInit } from '@angular/core';
import { UploadphotosService } from 'src/app/servicios/uploadphotos.service';

@Component({
  selector: 'app-propiedad-card',
  templateUrl: './propiedad-card.component.html',
  styleUrls: ['./propiedad-card.component.scss']
})
export class PropiedadCardComponent implements OnInit {
  @Input() propiedad! : any;
  @Input() hiddeIcons!: any;
  @Input() editIcon!: any;
  @Input() eyeIcon!: any;
  @Input() showOrHiddden!: any;
  constructor(private imageService:UploadphotosService ) { }

  ngOnInit() {
   
  }


}
