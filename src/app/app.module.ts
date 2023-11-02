import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReflexClickModule } from "./features/reflex-click";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReflexClickModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
