import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http"
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { PropiedadCardComponent } from './property/propiedad-card/propiedad-card.component';
import { PropiedadListComponent } from './property/propiedad-list/propiedad-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HousingService } from './servicios/housing.service';
import { AddPropiedadComponent } from './property/add-propiedad/add-propiedad.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { AlertifyService } from './servicios/alertify.service';
import { AuthService } from './servicios/auth.service';
import { UserService } from './servicios/user.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { JwtInterceptor } from './security/jwt.interceptor';
import { ApiauthService } from './servicios/apiauth.service';
import { HomeComponent } from './home/home.component';
import { UploadphotosService } from './servicios/uploadphotos.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { UploadFormComponent } from './photos/upload-form/upload-form.component';
import { UploadDetailComponent } from './photos/upload-detail/upload-detail.component';
import { UploadListComponent } from './photos/upload-list/upload-list.component';
import { EditPropiedadDetailComponent } from './property/edit-propiedad-detail/edit-propiedad-detail.component';
import { PropiedadDetailComponent } from './property/propiedad-detail/propiedad-detail.component';
import { UserPerfilComponent } from './user/user-perfil/user-perfil.component';
import { MapComponent } from './map/map.component';
import { MapDetalleComponent } from './map/map-detalle/map-detalle.component';
import { CarouselComponent } from './shared/carousel/carousel.component';

@NgModule({
  declarations: [

    AppComponent,
    PropiedadCardComponent,
    PropiedadListComponent,
      NavBarComponent,
      AddPropiedadComponent,
      UserLoginComponent,
      UserRegisterComponent,
      UserPerfilComponent,
      HomeComponent,
      UploadFormComponent,
      UploadDetailComponent,
      UploadListComponent,
      EditPropiedadDetailComponent,
      PropiedadDetailComponent,
      MapComponent,
      MapDetalleComponent,
      CarouselComponent


   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,

  ],
  providers: [HousingService, AlertifyService, AuthService, UserService, ApiauthService, UploadphotosService,
  {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
