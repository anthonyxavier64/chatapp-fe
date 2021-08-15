import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  newUser: {
    email: string,
    password: string,
    rePassword: string,
    firstName: string,
    lastName: string
  };

  constructor(private auth: AuthService, private router: Router) {
    this.newUser = {
      email: '',
      password: '',
      rePassword: '',
      firstName: '',
      lastName: ''
    }
  }

  handleRegister() {
    this.auth.registerUser(this.newUser).subscribe(
      response => {
        console.log(response)
        this.router.navigateByUrl('/tabs/tab2', { replaceUrl: true });
      },
      error => {
        console.log(error)
      }
    );
  }
}
