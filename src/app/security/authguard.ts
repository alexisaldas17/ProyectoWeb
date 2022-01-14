import {Injectable} from '@angular/core'
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiauthService } from '../servicios/apiauth.service';
@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
/**
 *
 */
constructor( private router: Router,
              private auth: ApiauthService) {


}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const usuario= this.auth.UsuarioData;
    if(usuario){
      return true;
    }
   this.router.navigate(["/login"]);
    return false;
  }

}
