import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-chatmodal',
  templateUrl: './chatmodal.page.html',
  styleUrls: ['./chatmodal.page.scss'],
})
export class ChatmodalPage implements OnInit {
  @Input() me: User;
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
