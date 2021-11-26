import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import { LocalStorageService } from '@core/services/local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isLoggedIn!: Observable<any | null>;

  private userSource = new BehaviorSubject<any>(null);
  public user$ = this.userSource.asObservable();

  constructor(
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    // this.isLoggedIn =
    this.populate();
  }

  populate() {
    const user = this.localStorageService.getItem('user');
    if (user) {
      this.userSource.next(user);
    }
  }

  login(username: string, password: string) {
    return this.apiService.post(`/users/login.php`, {
      username,
      password
    }).pipe(
      tap(res => {
        console.log(res);
        this.userSource.next(res);
        this.localStorageService.setItem('user', res);
      })
    );
  }

  async logout() {
    this.userSource.next(null);
    this.localStorageService.removeItem('user');
    await this.router.navigate(['/login']);
  }

  getRID(rid: string) {
    return this.apiService.get(`/users/getRID.php?rid=${rid}`);
  }
}

