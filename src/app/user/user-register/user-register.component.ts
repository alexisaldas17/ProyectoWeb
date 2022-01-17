import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { first } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { AlertifyService } from 'src/app/servicios/alertify.service';
import { ApiauthService } from 'src/app/servicios/apiauth.service';
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
  loading = false;
  submitted = false;
  constructor(private fg: FormBuilder,
              private router: Router,
              private alertify: AlertifyService,
              private userService: UserService,
              private route: ActivatedRoute,
              private apiAuthService: ApiauthService) {}

  ngOnInit() {
    this.crearFormRegistro();
  }
  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertify.clear();

    // stop here if form is invalid
    if (this.registerationForm.invalid) {
        return;
    }

    this.loading = true;
    this.apiAuthService.register(this.userData())
        .pipe(first())
        .subscribe(
           (data:any)  => {
                this.alertify.success('Registration successful');
                this.router.navigate(['/login'], { relativeTo: this.route });
                this.registerationForm.reset();
            },
          (            error: string) => {
                this.alertify.error(error);
                this.loading = false;
            });
    }


    crearFormRegistro() {
      this.registerationForm = this.fg.group({
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  /*addUser(user: any) {
    let users:any=[];
    if (localStorage.getItem('Users')) {
      users =  localStorage.getItem('Users');
      users = [user, ...users];
    } else {
      users = [user];
    }
    localStorage.setItem('Users', JSON.stringify(user));
  }*/

  userData(): User{
    return this.user ={
      nombre: this.userName.value,
      email: this.email.value,
      contraseña: this.password.value
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

    // convenience getter for easy access to form fields
    get f() { return this.registerationForm.controls; }
}

