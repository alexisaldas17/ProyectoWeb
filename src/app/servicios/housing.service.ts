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

getAllPropiedades(SellRent: number): Observable<any[]>{
  return  this.http.get('http://wsproyectoweb.azurewebsites.net/api/PropiedadCard/publicaciones').pipe(
    map((objeto:any)=>{
    const propiedadesArray: any[]=[];
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

getTipoPropiedades(){
  return this.http.get('http://wsproyectoweb.azurewebsites.net/api/Propiedad/tipo').pipe(
    map((tprop:any)=>{
      const tpropArray: Array<any>=[];
      for(let tp of tprop.data){

        tpropArray.push(tp);
      }
      return tpropArray;
    })
  );
}

getPublicacionesUsuario(userId: any){
  console.log(userId +"userid")
  return this.http.get('http://wsproyectoweb.azurewebsites.net/api/Propiedad/usuario/'+userId).pipe(
    map((publicaciones:any)=>{
      const publicacionesArray: Array<any>=[];
      for(let tp of publicaciones.data){

        publicacionesArray.push(tp);
      }
      return publicacionesArray;
    })
  );
}

/*getAllPropiedades(SellRent:number = 0):Observable<Ipropiedadbase> {
  let lista:Observable<any> = this.http.get('http://wsproyectoweb.azurewebsites.net/api/PropiedadCard/publicaciones');
  lista = this.jsonLista(lista);

  if (SellRent != 0){
     lista = lista.pipe(map((o:any) =>
     {
       const propiedades: Array<Ipropiedadbase> = [];
       for (let propiedad of o) {
         if( propiedad.sellRent === SellRent)
          propiedades.push(propiedad);
       }
       return propiedades;
     }))
  }
  return lista;
}*/

/*getAllPropiedades(SellRent:number) {
  return this.http.get('http://wsproyectoweb.azurewebsites.net/api/PropiedadCard/publicaciones').toPromise(

  ).then((data:any)=>{
   this.listaPropiedades=[];
    for (let propiedad of data.data) {


      if( propiedad.sellRent === SellRent)
      this.listaPropiedades.push();

    }

    console.log(this.listaPropiedades);
    return this.listaPropiedades;
  });

}*/

jsonLista(o:Observable<JSON>):Observable<any>{
  return o.pipe(map((o:any)=>{
    const lista:Array<any> = [];
    for (let item of o.data) {
       lista.push(item);
    }
    return lista;
  }));
}

}
