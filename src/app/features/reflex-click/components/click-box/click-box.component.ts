import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ClickBoxStatusEnum } from '../../enums';

@Component({
  selector: 'app-click-box',
  templateUrl: './click-box.component.html',
  styleUrls: ['./click-box.component.css']
})
export class ClickBoxComponent {
  @Input() status: ClickBoxStatusEnum = ClickBoxStatusEnum.neutral;
  @Output() activeClick = new EventEmitter<void>();

  BoxClassMap = {
    [ClickBoxStatusEnum.neutral]: 'neutral',
    [ClickBoxStatusEnum.active]: 'active',
    [ClickBoxStatusEnum.clicked]: 'success',
    [ClickBoxStatusEnum.missed]: 'failed',
  }

  onBoxClick(): void {
    if (this.status === ClickBoxStatusEnum.active) {
      this.activeClick.emit();
    }
  }
}