import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatmodalPageRoutingModule } from './chatmodal-routing.module';

import { ChatmodalPage } from './chatmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatmodalPageRoutingModule
  ],
  declarations: [ChatmodalPage]
})
export class ChatmodalPageModule {}
