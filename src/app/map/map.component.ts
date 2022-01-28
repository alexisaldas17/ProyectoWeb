import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss', '../../../node_modules/leaflet/dist/leaflet.css']
})

export class MapComponent implements OnInit, AfterViewInit {


  public map!: L.Map;
   apiKey = "AAPK70f50c797140442e8126ccb384972f3bd9V02QNQcE2flAOmmvEzWyloqDI-lB3lP2oHdX51lkTAkq1zAkJW1JE_WlqhuMHN";
  marker:any;
  public basemapEnum = "ArcGIS:Navigation";
  constructor() {
  }
  ngOnInit(): void {
    this.initMap()
  }


  private initMap(): void {
    map = L.map('map').setView([15.413083, -66.2136067], 3);

   // const searchControl = new ELG.Geosearch();
//const searchControl = L.esri.Geocoding.geosearch().addTo(map);


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

  ngAfterViewInit(): void {
   // this.initMap();
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
