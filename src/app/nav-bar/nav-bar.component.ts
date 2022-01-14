import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'react-bootstrap';
import { User } from '../model/user';
import { AlertifyService } from '../servicios/alertify.service';
import { ApiauthService } from '../servicios/apiauth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  loggedinUser!: any;
  usuario!: User;
  userName!: any;
  constructor(private alertify: AlertifyService,
    private apiService: ApiauthService,
    private router: Router) {
      this.apiService.usuario.subscribe(res=>{
        this.usuario=res;
        this.userName = res.nombre;
        console.log("Cambio el objeto: "+ res);
      });
     }

  ngOnInit() {
  }

  loggedin(){
    this.loggedinUser = localStorage.getItem('token');
    return this.loggedinUser;
  }
  onLogout(){
    this.apiService.logout();
    this.alertify.success("Has salido de la aplicacion");
    this.router.navigate(['/login']);
  }

}
