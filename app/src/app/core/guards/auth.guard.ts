import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate() {
    return this.authService.isAuthenticated().pipe(
      map((res) => {
        if (!res) {
          this.router.navigate(['auth']);
        }
        return res;
      })
    );
  }
}
