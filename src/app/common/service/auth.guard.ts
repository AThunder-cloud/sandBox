import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

export const AuthGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return from(
    new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => resolve(user));
    })
  ).pipe(map((user) => (user ? true : router.createUrlTree(['/login']))));
};
