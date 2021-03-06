import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { filter, map } from "rxjs/operators";

import { Observable } from 'rxjs';
import { Ipropiedadbase } from '../model/ipropiedadbase';
import { Propiedad } from '../model/propiedad';
import { Console } from 'console';
import { error } from '@angular/compiler/src/util';
import { User } from '../model/user';

const httpOptions={
  headers: new HttpHeaders({
    'Contend-Type': 'application/json',
   /* 'Access-Control-Allow-Origin':'*',*/
  })
}
@Injectable({
  providedIn: 'root'
})
export class HousingService {

   constructor(private http: HttpClient) { }

getAllPropiedades(SellRent: number): Observable<any[]>{
  return  this.http.get('http://wsproyectoweb.azurewebsites.net/api/PropiedadCard/publicaciones', httpOptions).pipe(
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
  //let  propiedad=JSON.stringify(property);
  //console.log(propiedad);
  return this.http.post('http://wsproyectoweb.azurewebsites.net/api/Propiedad/', property, httpOptions ).subscribe(
   response=> {
      alert(response);
    }
  );
  //localStorage.setItem('newProp', JSON.stringify(property));
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
getProvincias(){
  return this.http.get('http://wsproyectoweb.azurewebsites.net/api/Provincias').pipe(
    map((provincia:any)=>{
      const provinciasArray: Array<any>=[];
      for(let city of provincia.data){

        provinciasArray.push(city);
      }
      return provinciasArray;
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

editUsuario(usuario: User){
  return this.http.put('http://wsproyectoweb.azurewebsites.net/api/User/update', usuario, httpOptions)
  .subscribe((data:any)=>{
    if(data.exito===1){
      alert("Datos Actualizados Correctamente")
    }
  }, error=>{
    alert("Error: "+error)
  });
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

jsonLista(o:Observable<Object>):Observable<any>{
  return o.pipe(map((o:any)=>{
    const lista:Array<any> = [];
    for (let item of o.data) {
       lista.push(item);
    }
    return lista;
  }));
}

getPropiedadById(id: number):Observable<any>{
  return this.http.get('http://wsproyectoweb.azurewebsites.net/api/Propiedad/get/'+id,httpOptions);;
}

deletePropiedad(id:number){
return this.http.delete('http://wsproyectoweb.azurewebsites.net/api/Propiedad/delete/'+id, httpOptions);
}
deleleFotoById(idFoto: number){
 return this.http.delete('http://wsproyectoweb.azurewebsites.net/api/Propiedad/deleteFoto/'+idFoto, httpOptions);
}

updatePropiedadById(propiedad: Propiedad){
  return this.http.put('http://wsproyectoweb.azurewebsites.net/api/Propiedad/update/', propiedad, httpOptions)
  .subscribe((response:any)=>{
    if(response.exito===1){
      alert('Propiedad Actualizada!');
    }else
      alert("No se ha podido actualizar la Propiedad!")


    }/*, error=>{
        alert("Mensaje de error: "+ JSON.stringify(error))
        console.log(error)
    }*/

  );

}

}
