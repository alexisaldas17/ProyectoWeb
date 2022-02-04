import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { ApiauthService } from 'src/app/servicios/apiauth.service';
import { HousingService } from 'src/app/servicios/housing.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {
  usuario: User;
  passwd: string;
  editPerfilForm: FormGroup;
  constructor(public authService: ApiauthService,
    private housingService: HousingService,
    private fb: FormBuilder,
    private router: Router) {
    this.usuario = this.authService.UsuarioData;
    this.passwd = this.authService.UsuarioData.contraseña;
  }

  ngOnInit() {
    this.crearEditarUsuarioForm();
  }
  onSumbit(){
    if(this.editPerfilForm.valid){
      this.mapUsuario();
      this.housingService.editUsuario(this.usuario);
      this.router.navigate(['/perfil/'+this.usuario.id]);
    }
  }

  mapUsuario(){
    this.usuario.nombre = this.Nombre.value;
    this.usuario.contraseña = this.Password.value;
    this.usuario.email = this.Email.value;
  };

  crearEditarUsuarioForm() {

    this.editPerfilForm = this.fb.group({
      BasicInfo: this.fb.group({
        Nombre: [this.usuario.nombre, Validators.required],
        Password: [this.usuario.contraseña, Validators.required],
        Email: [this.usuario.email, Validators.required],
      }),

    });
  }

  get BasicInfo() {
    return this.editPerfilForm.controls.BasicInfo as FormGroup;
  }

  get Nombre() {
    return this.BasicInfo.controls.Nombre as FormControl;
  }
  get Password() {
    return this.BasicInfo.controls.Password as FormControl;
  }
  get Email() {
    return this.BasicInfo.controls.Email as FormControl;
  }




}
