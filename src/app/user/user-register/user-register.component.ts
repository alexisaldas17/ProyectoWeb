import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as alertify from 'alertifyjs';
import { User } from 'src/app/model/user';
import { AlertifyService } from 'src/app/servicios/alertify.service';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  registerationForm!: FormGroup;
  user!: User;
  userSubmitted!: boolean;

  constructor(private fg: FormBuilder,
              private alertify: AlertifyService,
              private userService: UserService) {}

  ngOnInit() {
    /* this.registerationForm = new FormGroup({
      userName: new FormControl(),
      email: new FormControl(null,[Validators.required, Validators.email]),
      password:new FormControl(null,[Validators.required, Validators.minLength(8)]),
      confirmPass: new FormControl(null,[Validators.required]),
    }, /*this.passwordMatchingValidator);*/
    this.crearFormRegistro();
  }
  /*passwordMatchingValidator(fg: FormGroup): Validators{
    return fg.get('password').value === fg.get('confirmPass').value ? null : {notmatched: true};
  }*/
  onSubmit() {
    this.userSubmitted=true;
    if(this.registerationForm.valid){
      //this.user = Object.assign(this.user, this.registerationForm.value);

      this.userService.addUser(this.userData());
      this.registerationForm.reset();
      this.userSubmitted = false;
      this.alertify.success('Gracias, has sido registrado correctamente');
    }

  }
  crearFormRegistro() {
    this.registerationForm = this.fg.group({
      userName: [null, Validators.required],
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPass: new FormControl(null, [Validators.required]),
    });
  }
  addUser(user: any) {
    let users:any=[];
    if (localStorage.getItem('Users')) {
      users =  localStorage.getItem('Users');
      users = [user, ...users];
    } else {
      users = [user];
    }
    localStorage.setItem('Users', JSON.stringify(user));
  }

  userData(): User{
    return this.user ={
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value
    }
  }
  get userName() {
    return this.registerationForm.get('userName') as FormControl;
  }
  get email() {
    return this.registerationForm.get('email') as FormControl;
  }
  get password() {
    return this.registerationForm.get('password') as FormControl;
  }
  get confirmPass() {
    return this.registerationForm.get('confirmPass') as FormControl;
  }
}

