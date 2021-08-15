import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { UsermanagerService } from '../services/usermanager.service';
import { UserserviceService } from '../services/userservice.service';
import { ModalController } from '@ionic/angular';
import { ChatmodalPage } from '../modals/chatmodal/chatmodal.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  user: User;
  userList: User[];

  constructor(
    private userManager: UsermanagerService,
    private authService: AuthService,
    private userService: UserserviceService,
    private router: Router,
    private modalController: ModalController
  ) {}

  ionViewWillEnter() {
    this.getCurrentUser();
  }

  async getCurrentUser() {
    const currentUser = await this.userManager.getUser();
    if (currentUser) {
      this.user = currentUser;
      this.getUsers();
    } else {
      this.user = null;
    }
  }

  getUsers() {
    if (this.user) {
      this.userService.getUsers().then((response) => {
        if (response) {
          response.subscribe(
            (response) => {
              console.log(response);
              const filtered = response.filter(
                (val) => val.email !== this.user.email
              );
              this.userList = filtered;
            },
            (error) => {
              console.log(error);
            }
          );
        }
      });
    }
  }

  handleClickChat(user) {
    this.presentModal(user);
  }



  async handleLogout() {
    const result = await this.authService.logout();
    console.log(result);
    this.router.navigateByUrl('', { replaceUrl: true });
  }

  async presentModal(user) {
    const modal = await this.modalController.create({
      component: ChatmodalPage,
      componentProps: {
        'me': this.user,
        'user': user
      }
    });
    return await modal.present();
  }
}
