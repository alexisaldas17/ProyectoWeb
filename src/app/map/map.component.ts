import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss', '../../../node_modules/leaflet/dist/leaflet.css']
})

export class MapComponent implements AfterViewInit {
  public map!: L.Map;
  private initMap(): void {
    map = L.map('map').setView([15.413083, -66.2136067], 3);
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

    marcadorActual = L.marker([0, 0], {icon: icono, draggable: false });

    navigator.geolocation.watchPosition
    navigator.geolocation.getCurrentPosition(function (pos) {
      latitud = pos.coords.latitude;
      longitud = pos.coords.longitude;

      crearMarcador(latitud, longitud);

      map.setView([latitud, longitud], 18);
    });

    map.on('click', onMapClick);
    map.on('viewreset',onMapReady);
  }

  constructor() {
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

}

var map : L.Map;
var icono : L.Icon;

var marcadorActual : L.Marker;
var latitud : number = 0;
var longitud : number = 0;

function crearMarcador(latitud : number, longitud :number){
  map.removeLayer(marcadorActual);
  marcadorActual = L.marker([latitud, longitud], {icon: icono, draggable: false }).addTo(map);
}

function onMapClick(e:any) {
  latitud = e.latlng.lat;
  longitud = e.latlng.lng;

  crearMarcador(latitud,longitud);
}

function onMapReady(): void {
  setTimeout(() => {
    map.invalidateSize();
  });
}