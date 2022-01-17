import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'react-bootstrap';
import { User } from '../model/user';
import { AlertifyService } from '../servicios/alertify.service';
import { ApiauthService } from '../servicios/apiauth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  loggedinUser!: any;
  usuario!: User;
  //userName!: any;
  //isAuth = false;
   authSubscription!: Subscription;


  constructor(private alertify: AlertifyService,
    public apiService: ApiauthService,
    private router: Router) {
      this.usuario = this.apiService.UsuarioData;
    }


  ngOnInit() {
    //this.changeAuth();

  }

  /*private changeAuth(): void {
    this.authSubscription = this.apiService.authChange
      .subscribe(authStatus => {
        this.isAuth = authStatus;
      });
  }*/

  /*loggedin(){
    this.loggedinUser = localStorage.getItem('token');
    return this.loggedinUser;
  }*/
  onLogout(){
    this.apiService.logout();
    this.alertify.success("Has salido de la aplicacion");
    this.router.navigate(['/login']);
  }

}
