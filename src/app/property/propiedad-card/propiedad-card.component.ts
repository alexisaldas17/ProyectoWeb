import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HousingService } from 'src/app/servicios/housing.service';
import { UploadphotosService } from 'src/app/servicios/uploadphotos.service';

@Component({
  selector: 'app-propiedad-card',
  templateUrl: './propiedad-card.component.html',
  styleUrls: ['./propiedad-card.component.scss'],
})
export class PropiedadCardComponent implements OnInit {
  @Input() propiedad!: any;
  @Input() hiddeIcons!: any;
  @Input() editIcon!: any;
  @Input() deleteIcon!: any;
  @Input() eyeIcon!: any;
  @Input() showOrHiddden!: any;
  constructor(
    private imageService: UploadphotosService,
    private housingService: HousingService,
    private router: Router
  ) {}

  ngOnInit() {}

  eliminarPropiedad(id: number) {
    let text = 'Esta seguro que desea eliminar esta propiedad?';
    if (confirm(text) == true) {
      this.housingService.deletePropiedad(id).subscribe(
        (r: any) => {



        },
        (error) => console.log(error.error.mensaje)
      );
      this.router.navigate(['/add-propiedades']).then(() => {
        window.location.reload();
      });
      alert('Propiedad ha sido Eliminada');
    }
  }
}
