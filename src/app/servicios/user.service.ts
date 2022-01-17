import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private http: HttpClient) { }

addUser(user: User) {
 console.log(user);
  /*let usuario = JSON.stringify(user)
  console.log(usuario);
  let users:any=[];
  if (localStorage.getItem('Usuario')) {
    users =  localStorage.getItem('Usuario');
    users = [user, ...users];
  } else {
    users = [user];
  }
  localStorage.setItem('Usuario', JSON.stringify(user));*/

    return this.http.post('http://wsproyectoweb.azurewebsites.net/api/Registro', user);
}
}

