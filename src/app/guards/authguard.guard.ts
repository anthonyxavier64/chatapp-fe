import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { filter, map, take } from 'rxjs/operators';
import { UsermanagerService } from '../services/usermanager.service';

@Injectable({
  providedIn: 'root',
})
export class AuthguardGuard implements CanLoad {
  constructor(private authService: AuthService, private userManager: UsermanagerService,
    private router: Router) {}

  canLoad():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isAuthenticated.pipe(
      filter(val => val !== null),
      take(1),
      map(isAuthenticated => {
        console.log(isAuthenticated);
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigateByUrl('/tabs/tab1');
          return false;
        }
      })
    )
  }
}
