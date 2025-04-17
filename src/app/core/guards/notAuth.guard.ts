// auth.guard.ts
import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';

export const notAuthGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (localStorage.getItem('user')) {
    return router.createUrlTree(['/users']);
  } else {
    return true;
  }
};
