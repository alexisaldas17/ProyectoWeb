import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor() { }

addUser(user: User) {
  let users:any=[];
  if (localStorage.getItem('Usuario')) {
    users =  localStorage.getItem('Usuario');
    users = [user, ...users];
  } else {
    users = [user];
  }
  localStorage.setItem('Usuario', JSON.stringify(user));
}
}
