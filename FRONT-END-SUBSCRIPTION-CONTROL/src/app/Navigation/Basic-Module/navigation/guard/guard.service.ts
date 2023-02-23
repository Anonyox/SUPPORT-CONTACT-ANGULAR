import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthComponent } from 'src/app/Modules/Production/Basic-Module/auth/auth-component/auth.component';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthComponent, private router: Router ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | boolean{

      if(this.authService.usuarioAutenticado()){return true;}


      else{this.router.navigate(['']);  return false;}






  }
}
