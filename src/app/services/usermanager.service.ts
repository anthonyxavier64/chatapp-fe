import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { ApiserviceService } from './apiservice.service';
import { AuthService } from './auth.service';
import { CURRENT_USER } from '../config';

@Injectable({
  providedIn: 'root',
})
export class UsermanagerService {
  currentUser: User;

  constructor(
    private apiService: ApiserviceService,
    private authService: AuthService
  ) {}

  setUser(user) {
    const aUser = new User().initWithJSON(user);
    this.currentUser = aUser;
    this.apiService.setLocalData(
      CURRENT_USER,
      JSON.stringify(this.currentUser)
    );
  }

  async getUser(): Promise<User> {
    await this.apiService.getLocalData(CURRENT_USER).then((result: string) => {
      if (result) {
        const user = new User().initWithJSON(JSON.parse(result));
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
    return this.currentUser;
  }

  // async getUser(): Promise<User> {
  //   await this.apiService.getLocalData(CURRENT_USER).then((result: string) => {
  //     if (result) {
  //       const user = new User().initWithJSON(JSON.parse(result));
  //       this.currentUser = user;
  //     } else {
  //       this.authService.getUserMe().subscribe(
  //         (response) => {
  //           console.log('authservice')
  //           this.currentUser = response;
  //         },
  //         (error) => {
  //           console.log(error);
  //           this.currentUser = null;
  //         }
  //       );
  //     }
  //   });
  //   return this.currentUser;
  // }
}
