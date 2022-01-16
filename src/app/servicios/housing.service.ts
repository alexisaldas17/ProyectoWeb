import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { filter, map } from "rxjs/operators";

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
  getAllPropiedades(SellRent:number = 0):Observable<any> {
    let lista:Observable<any> = this.http.get('http://wsproyectoweb.azurewebsites.net/api/PropiedadCard/publicaciones');
    lista = this.jsonLista(lista);
    
    if (SellRent != 0){
       lista = lista.pipe(map((o:any) => 
       {
         const propiedades: Array<any> = [];
         for (let propiedad of o) {
           if( propiedad.sellRent === SellRent)
            propiedades.push(propiedad);
         }
         return propiedades;
       }))
    }
    return lista;
  }

  jsonLista(o:Observable<JSON>):Observable<any>{
    return o.pipe(map((o:any)=>{
      const lista:Array<any> = [];
      for (let item of o.data) {
         lista.push(item);
      }
      return lista;
    }));
  }

  addProperty(property: Propiedad) {
    localStorage.setItem('newProp', JSON.stringify(property));
  }

  getCiudades() {
    return this.http.get('http://wsproyectoweb.azurewebsites.net/api/City').pipe(
      map((ciudad: any) => {
        const ciudadesArray: Array<any> = [];
        for (let city of ciudad.data) {

          ciudadesArray.push(city);
        }
        return ciudadesArray;
      })
    );
  }

  getTipoPropiedades() {
    return this.http.get('http://wsproyectoweb.azurewebsites.net/api/Propiedad/tipo').pipe(
      map((tprop: any) => {
        const tpropArray: Array<any> = [];
        for (let tp of tprop.data) {

          tpropArray.push(tp);
        }
        return tpropArray;
      })
    );
  }
}
