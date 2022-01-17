import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/servicios/alertify.service';
import { ApiauthService } from 'src/app/servicios/apiauth.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  public email!: string;
  public password!: string;

  public loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  /*public loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });*/

  constructor(
    private alertify: AlertifyService,
    private router: Router,
    private formBuilder: FormBuilder,
    public auth: ApiauthService
  ) {
    if (this.auth.UsuarioData) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {}
 
  onLogin() {
    this.auth.login(this.loginForm.value).subscribe((response) => {
      if (response.exito === 1) {
        this.router.navigate(['/add-propiedades']);
      }
      window.location.reload();
    });
  }
}
