import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';
import { Subject } from 'rxjs';
import { Alert, AlertType } from '../model/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';
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
    clear(id = this.defaultId) {
      this.subject.next(new Alert({ id }));
  }

   // convenience methods
   successRegister(message: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertType.Success, message }));
}
  // main alert method
  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
}
}
