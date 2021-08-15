import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatmodalPage } from './chatmodal.page';

const routes: Routes = [
  {
    path: '',
    component: ChatmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatmodalPageRoutingModule {}
