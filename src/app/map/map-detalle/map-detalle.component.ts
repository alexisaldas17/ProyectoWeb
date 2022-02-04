import { AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import * as L from 'leaflet';
import { Propiedad } from '../../model/propiedad';

@Component({
  selector: 'app-map-detalle',
  templateUrl: './map-detalle.component.html',
  styleUrls: ['./map-detalle.component.scss', '../../../../node_modules/leaflet/dist/leaflet.css']
})
export class MapDetalleComponent implements AfterViewInit, OnDestroy {
  @Input() propiedad!:Propiedad;
  constructor() {
    var verificar = L.DomUtil.get('map');
    if(verificar){
      L.DomUtil.remove(verificar);
    }
  }

  private initMap(): void {
    map = new L.Map('map');
    map.setView([this.propiedad.latitud, this.propiedad.longitud], 16);
    icono = L.icon({
      iconUrl: '../../assets/casaIcono.png'  ,
      shadowUrl: undefined,
      iconSize:     [40, 40],
      iconAnchor:   [19, 25]
  });

  marcadorActual = L.marker([0, 0], {icon: icono, draggable: false });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(map);

    crearMarcador(this.propiedad.latitud, this.propiedad.longitud);

    map.on('mouseover',onMapReady);
    map.on('viewreset',onMapReady);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
      map.off();
      map.remove();
  }
  
  cambioVista(propiedad:Propiedad){
    this.propiedad = propiedad;
    map.setView([propiedad.latitud,propiedad.longitud], 16);
    crearMarcador(propiedad.latitud,propiedad.longitud);
  }

  mapaListo():void{
    console.log("Cargo el mapa");
    onMapReady();
  }
}

var map : L.Map;
var icono : L.Icon;
var marcadorActual:L.Marker;

function crearMarcador(latitud : number, longitud :number){
  console.log(latitud,longitud);
  map.removeLayer(marcadorActual);
  marcadorActual=L.marker([latitud, longitud], {icon: icono, draggable: false }).addTo(map);
}

function onMapReady(): void {
  setTimeout(() => {
    map.invalidateSize();
  });
}
