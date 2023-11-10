import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PopupService } from '../../../../shred/popup';
import { GameService } from '../../services';
import { GameNotificationComponent } from '../game-notification';
import { NotificationInfo } from '../../interfaces';
import { LOOSER_INFO, WINNER_INFO } from '../../constants';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldComponent implements OnDestroy {
  public timerRangeValue = 1000;
  private gameSubscription!: Subscription;

  constructor(
    private readonly popupService: PopupService,
    public readonly gameService: GameService,
  ) { }

  public ngOnDestroy(): void {
    this.gameSubscription.unsubscribe();
  }

  public onStartClick(): void {
    this.startNewGame();
  }

  public onActiveBoxClick(index: number): void {
    this.gameService.setClickedByIndex(index);
  }

  public onTimerRangeChange(): void {
    this.gameService.setTimer(this.timerRangeValue);
  }

  private startNewGame(): void {
    if (this.gameSubscription) this.gameSubscription.unsubscribe();
    this.gameSubscription = this.gameService.initGameStream()
      .subscribe({
        complete: () => {
          const componentRef =  this.popupService.open(GameNotificationComponent);
          const notificationInfo: NotificationInfo = this.gameService.playerPoints > this.gameService.computerPoints
            ? WINNER_INFO
            : LOOSER_INFO;

          componentRef.instance.title = notificationInfo.title;
          componentRef.instance.description = notificationInfo.description;
        }
      });
  }
}
