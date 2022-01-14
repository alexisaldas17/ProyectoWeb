import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

success(mensaje: string){
alertify.success(mensaje);
}
error(mensaje: string){
  alertify.error(mensaje);
  (mensaje);
  }
warning(mensaje: string){
    alertify.warning(mensaje);
    }
}
