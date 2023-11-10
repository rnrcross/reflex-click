import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ClickBoxStatusEnum } from '../../enums';

@Component({
  selector: 'app-click-box',
  templateUrl: './click-box.component.html',
  styleUrls: ['./click-box.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClickBoxComponent {
  @Input() status = ClickBoxStatusEnum.Neutral;
  @Output() activeClick = new EventEmitter<void>();

  public readonly boxClassMap = {
    [ClickBoxStatusEnum.Neutral]: 'neutral',
    [ClickBoxStatusEnum.Active]: 'active',
    [ClickBoxStatusEnum.Clicked]: 'success',
    [ClickBoxStatusEnum.Missed]: 'failed',
  }

  onBoxClick(): void {
    if (this.status === ClickBoxStatusEnum.Active) {
      this.activeClick.emit();
    }
  }
}
