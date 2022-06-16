import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import {Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../pages/empleados/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class canAdminGuard implements CanActivate {
  constructor(private authSvc:AuthService){}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authSvc.user$.pipe(
      take(1),
      map((user) => user && this.authSvc.isAdmin(user)),
      tap( (canAdmin) => {
        if (!canAdmin) {
          window.alert('Acceso denegado. Necesitas permisos de admin');
        }
      })
    );
  }
  
}
