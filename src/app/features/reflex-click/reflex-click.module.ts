import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReflexClickComponent } from './reflex-click.component';
import { PopupComponent } from '../../shred/popup';
import { GameNotificationComponent } from './components/game-notification/game-notification.component';
import { ClickBoxComponent } from './components/click-box/click-box.component';

@NgModule({
  declarations: [
    ReflexClickComponent,
    GameNotificationComponent,
    ClickBoxComponent
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
