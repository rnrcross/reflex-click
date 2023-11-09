import { Component, HostBinding, HostListener, Input } from '@angular/core';

import { PopupService } from './services';

@Component({
  standalone: true,
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {

  constructor(private popupService: PopupService) {}

  @HostListener('document:keydown.escape')
  onEscape() {
    this.popupService.close();
  }

  onCloseClick() {
    this.popupService.close();
  }
}
