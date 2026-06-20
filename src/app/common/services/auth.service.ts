import { Inject, Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, User, user } from '@angular/fire/auth';
import { Observable, throwError } from 'rxjs';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;
  constructor(
    private auth:Auth,
    private toast:ToastService,
    private router:Router
  ) {
    this.user$ = user(this.auth);
  }

  async googleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(this.auth, provider);
      return credential.user;
    } catch (error) {
      this.toast.showError("Unable to login","Failed");
      return null;
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
      this.toast.showInfo("Logout");
      return null;
    } catch (error) {
      this.toast.showError("Unable to logout","Failed");
      return null;
    }
  }
}
