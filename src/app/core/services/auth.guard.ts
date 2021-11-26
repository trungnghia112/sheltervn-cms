import { Injectable, Optional } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { authState } from 'rxfire/auth';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
// import { AuthService } from './auth.service';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    @Optional() private auth: Auth,
    private notify: NotifyService,
    private authService: AuthService,
    // private authService: AuthService,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn.pipe(
      // map(u => !!u),
      tap((user) => {
        console.log(user);
        if (!user) {
          console.log('access denied');
          this.notify.update('You must be logged in!', 'error');
          this.router.navigate(['/login']);
        }
      }),
      map(u => !!u)
    );
  }
}
