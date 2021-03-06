import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from '../model/login';
import { Response } from '../model/response';
import { User } from '../model/user';
import { AlertifyService } from './alertify.service';
const httpOptions={
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ApiauthService {
url:string ='http://wsproyectoweb.azurewebsites.net/api/User/login';
authChange = new Subject<boolean>();

private usuarioSubject!: BehaviorSubject<any>;
public usuario!: Observable<any>;
public get UsuarioData():User{

  return this.usuarioSubject.value;
}

constructor(private http: HttpClient,
            private alertify: AlertifyService) {
  this.usuarioSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('Usuario')!));
  this.usuario= this.usuarioSubject.asObservable();
}

login(login: Login):Observable<any>{

  return this.http.post<any>(this.url, login, httpOptions).pipe(
    map(res=>{
      if(res.exito=== 1){

        const user: any = res.data;
        localStorage.setItem('Usuario', JSON.stringify(user));
        this.authChange.next(true);
        this.usuarioSubject.next(user);
      }
     return res;
    })
  );

}

logout(){
  localStorage.removeItem('Usuario');
  this.usuarioSubject.next(null);
}
register(user: User) {
  return this.http.post('http://wsproyectoweb.azurewebsites.net/api/Registro', user);
}
}
