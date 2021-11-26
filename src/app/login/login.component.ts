import { Component, OnInit, Optional } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, signInAnonymously, signInWithPopup, signOut, User } from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private readonly userDisposable: Subscription | undefined;
  public readonly user: Observable<User | null> = EMPTY;

  showLoginButton = false;
  showLogoutButton = false;

  form: FormGroup | any;
  submitted!: boolean;

  constructor(
    @Optional() private auth: Auth,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    if (auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.showLoginButton = !isLoggedIn;
        this.showLogoutButton = isLoggedIn;
      });
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  async loginEmail() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    const {email, password} = this.form.value;

    await this.authService.loginEmail(email, password);
    await this.afterSignIn();
  }

  async login() {
    return await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  async loginAnonymously() {
    return await signInAnonymously(this.auth);
  }

  async logout() {
    await signOut(this.auth);
    await this.router.navigate(['/login']);
  }

  private afterSignIn() {
    // Do after login stuff here, such router redirects, toast messages, etc.
    // const redirectUrl = this.auth.redirectUrl;
    // this.auth.redirectUrl = Constants.redirectUrl;
    return this.router.navigate(['/']);
  }
}
