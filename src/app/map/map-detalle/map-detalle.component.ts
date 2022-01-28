import { AfterViewInit, Component, Input} from '@angular/core';
import * as L from 'leaflet';
import { Propiedad } from '../../model/propiedad';

@Component({
  selector: 'app-map-detalle',
  templateUrl: './map-detalle.component.html',
  styleUrls: ['./map-detalle.component.scss']
})
export class MapDetalleComponent implements AfterViewInit {
  @Input() propiedad!:Propiedad;
  constructor() {
  }

  private initMap(): void {
    console.log(this.propiedad);
    map = new L.Map('map');
    map.setView([this.propiedad.latitud, this.propiedad.longitud], 3);

    icono = L.icon({
      iconUrl: '../../assets/casaIcono.png'  ,
      shadowUrl: undefined,
      iconSize:     [40, 40],
      iconAnchor:   [19, 25]
  });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(map);

    crearMarcador(latitud, longitud);

    map.on('viewreset',onMapReady);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}

var map : L.Map;
var icono : L.Icon;

var latitud : number = 0;
var longitud : number = 0;

function crearMarcador(latitud : number, longitud :number){
  L.marker([latitud, longitud], {icon: icono, draggable: false }).addTo(map);
}

function onMapReady(): void {
  setTimeout(() => {
    map.invalidateSize();
  });
}