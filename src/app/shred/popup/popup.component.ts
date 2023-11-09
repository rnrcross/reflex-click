import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';

import { PopupService } from './services';

@Component({
  standalone: true,
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent {
  constructor(private popupService: PopupService) {}

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.popupService.close();
  }

  public onCloseClick(): void {
    this.popupService.close();
  }
}
