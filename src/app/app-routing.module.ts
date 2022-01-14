import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPropiedadComponent } from './property/propiedad-card/add-propiedad/add-propiedad.component';
import { PropiedadDetailComponent } from './property/propiedad-card/propiedad-detail/propiedad-detail.component';
import { PropiedadListComponent } from './property/propiedad-card/propiedad-list/propiedad-list.component';
import { AuthGuard } from './security/authguard';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';

const routes: Routes = [
  {path: '', component: PropiedadListComponent, canActivate: [AuthGuard]},
  {path: 'add-propiedades', component: AddPropiedadComponent,canActivate: [AuthGuard]},
  {path: 'propiedad-detail/:id', component: PropiedadDetailComponent, canActivate: [AuthGuard]},
  {path:'login', component: UserLoginComponent},
  {path:'register', component: UserRegisterComponent},
  {path: '**', component: PropiedadListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
