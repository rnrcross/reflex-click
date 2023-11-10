import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReflexClickComponent } from './reflex-click.component';
import { PopupComponent } from '../../shred/popup';
import { ClickBoxComponent, FieldComponent, GameNotificationComponent, ScoreComponent } from './components';

@NgModule({
  declarations: [
    ReflexClickComponent,
    GameNotificationComponent,
    ClickBoxComponent,
    FieldComponent,
    ScoreComponent,
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
export class ReflexClickModule {
}
