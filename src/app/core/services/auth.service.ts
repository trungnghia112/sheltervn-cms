import { Injectable, Optional } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { traceUntilFirst } from '@angular/fire/performance';
import { Router } from '@angular/router';
import { setDoc } from '@firebase/firestore';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

// import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn!: Observable<any | null>;

  private userSource = new BehaviorSubject<any>(null);
  public user$ = this.userSource.asObservable();

  constructor(
    @Optional() private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    if (this.auth) {
      this.isLoggedIn = authState(this.auth)
        .pipe(
          traceUntilFirst('auth'),
          switchMap((user: any) => {
            return user ? getDoc(doc(this.firestore, 'users', user.uid)) : of(null);
          }),
          map((docSnap: any) => {
            return docSnap && docSnap.exists() ? docSnap.data() : null;
          })
        );
    } else {
      this.isLoggedIn = of(null);
    }
  }

  async loginEmail(email: string, password: string) {
    console.log(email);
    console.log(password);

    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    await this.updateUserData(userCredential.user);
  }

  async logout() {
    await signOut(this.auth);
    this.userSource.next(null);
    await this.router.navigate(['/login']);
  }

  // Sets user data to firestore after successful login
  private async updateUserData(user: any) {
    let userData = {
      ...user.providerData[0],
      uid: user.uid
    };

    const docRef = doc(this.firestore, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    } else {
      const userRef = doc(this.firestore, 'users', user.uid);
      setDoc(userRef, userData, { merge: true });
    }
  }

  private async updateUserData2(user: any) {
    // const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    // const userRes = await userRef.valueChanges().pipe(take(1)).toPromise();
    // let userData = {
    //   ...user.providerData[0],
    //   uid: user.uid
    // };
    // if (!userRes) {
    //   return userRef.set({
    //     ...userData,
    //   }, {merge: true});
    // }
    // return false;
  }
}
