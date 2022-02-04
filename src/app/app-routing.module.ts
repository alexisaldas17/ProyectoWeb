import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditPropiedadDetailComponent } from './property/edit-propiedad-detail/edit-propiedad-detail.component';
import { AddPropiedadComponent } from './property/add-propiedad/add-propiedad.component';
import { PropiedadDetailComponent } from './property/propiedad-detail/propiedad-detail.component';
import { PropiedadListComponent } from './property/propiedad-list/propiedad-list.component';
import { AuthGuard } from './security/authguard';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserPerfilComponent } from './user/user-perfil/user-perfil.component';
import { EditarPerfilComponent } from './user/editar-perfil/editar-perfil.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'add-propiedades', component: AddPropiedadComponent,canActivate: [AuthGuard]},
  {path: 'propiedad-detail/:id', component: PropiedadDetailComponent},
  {path: 'rent-propiedad', component: PropiedadListComponent},
  {path: 'sell-propiedad', component: PropiedadListComponent},
  {path: 'edit-propiedad/:id', component: EditPropiedadDetailComponent, canActivate: [AuthGuard]},
  {path: 'perfil/:id', component: UserPerfilComponent, canActivate: [AuthGuard]},
  {path: 'editar-perfil/:id', component: EditarPerfilComponent, canActivate: [AuthGuard]},

  {path:'login', component: UserLoginComponent},
  {path:'register', component: UserRegisterComponent},
  {path: '**', component: PropiedadListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: [

  ]
})
export class AppRoutingModule { }
