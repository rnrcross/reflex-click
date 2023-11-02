import { Component, HostBinding, Input } from '@angular/core';

import { PopupService } from './services';

@Component({
  standalone: true,
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  @Input() isVisible = true;
  @HostBinding('style.display') get display() {
    return this.isVisible ? 'flex' : 'none';
  }

  constructor(private popupService: PopupService) {}

  onCloseClick() {
    this.isVisible = false;
  }
}
