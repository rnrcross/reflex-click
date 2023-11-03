import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReflexClickComponent } from './reflex-click.component';
import { PopupComponent } from '../../shred/popup';
import { GameNotificationComponent } from './game-notification/game-notification.component';

@NgModule({
  declarations: [
    ReflexClickComponent,
    GameNotificationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PopupComponent,
  ],
  exports: [
    ReflexClickComponent
  ]
})
export class ReflexClickModule {}
