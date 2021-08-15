import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsermanagerService } from '../services/usermanager.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  user: {
    email: string;
    password: string;
  };

  constructor(
    private auth: AuthService,
    private userManager: UsermanagerService,
    private router: Router
  ) {
    this.user = {
      email: '',
      password: '',
    };
  }

  handleLogin() {
    this.auth.login(this.user).then((result) => {
      if (result) {
        this.userManager.setUser(result['userObj']);
        this.router.navigateByUrl('tabs/tab3', { replaceUrl: true });
      } else {
        console.log('no result');
      }
    });
  }
}
