import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule} from "@angular/common/http";
import {map} from "rxjs/operators";

import { Observable } from 'rxjs';
import { Ipropiedadbase } from '../model/ipropiedadbase';
import { Propiedad } from '../model/propiedad';
@Injectable({
  providedIn: 'root'
})
export class HousingService {

constructor(private http: HttpClient) { }

/*getAllPropiedades(SellRent: number): Observable<Ipropiedadbase[]>{
  return  this.http.get('datos/propiedades.json').pipe(
    map((data:any)=>{
      const propiedadesArray: Array<Ipropiedadbase>=[];
      for(const id in data){
        if(data.hasOwnProperty(id) && data[id].SellRent === SellRent)
        propiedadesArray.push(data[id]);
      }
      return propiedadesArray;
    })
  );

}*/
getAllPropiedades(SellRent: number): Observable<any>{
  return  this.http.get('http://localhost:5186/api/PropiedadCard/publicaciones').pipe(
    map((objeto:any)=>{
    const propiedadesArray: Array<any>=[];
      for(let dato of objeto.data){
        if( dato.sellRent === SellRent)
        propiedadesArray.push(dato);
      }
      return propiedadesArray;
    })
  );
}

addProperty(property: Propiedad) {
  localStorage.setItem('newProp', JSON.stringify(property));
}

getCiudades(){
  return this.http.get('http://wsproyectoweb.azurewebsites.net/api/City').pipe(
    map((ciudad:any)=>{
      const ciudadesArray: Array<any>=[];
      for(let city of ciudad.data){

        ciudadesArray.push(city);
      }
      return ciudadesArray;
    })
  );
}
}
