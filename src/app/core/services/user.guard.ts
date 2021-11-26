import { Injectable, Optional } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { NotifyService } from './notify.service';
import { UserService } from '@core/services/user.service';

@Injectable({
  providedIn: 'root'
})

export class UserGuard implements CanActivate {
  constructor(
    private router: Router,
    @Optional() private auth: Auth,
    private notify: NotifyService,
    private userService: UserService,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.user$.pipe(
      // map(u => !!u),
      tap((user) => {
        // console.log(user);
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
