import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { ApiauthService } from 'src/app/servicios/apiauth.service';

@Component({
  selector: 'app-user-perfil',
  templateUrl: './user-perfil.component.html',
  styleUrls: ['./user-perfil.component.scss']
})
export class UserPerfilComponent implements OnInit {
 usuario: User;
 passwd: string;
  constructor(public authService: ApiauthService) {
    this.usuario = this.authService.UsuarioData;
    this.passwd = this.authService.UsuarioData.contraseña;
   }

  ngOnInit() {

  }


}
