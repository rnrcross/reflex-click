import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PopupService } from '../../shred/popup';
import { GameNotificationComponent } from './components';
import { GameService } from './services';
import { LOOSER_INFO, WINNER_INFO } from './constants';
import { NotificationInfo } from './interfaces';

@Component({
  selector: 'app-reflex-click',
  templateUrl: './reflex-click.component.html',
  styleUrls: ['./reflex-click.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReflexClickComponent implements OnDestroy {
  public timerRangeValue = 1000;
  private gameSubscription!: Subscription;

  constructor(
    private readonly popupService: PopupService,
    public readonly gameService: GameService,
  ) {}

  public ngOnDestroy(): void {
    this.gameSubscription.unsubscribe();
  }

  private initBoxesToggleObserver(): void {
    if (this.gameSubscription) this.gameSubscription.unsubscribe();
    this.gameSubscription = this.gameService.gameStream()
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

  public onStartClick(): void {
    this.gameService.resetGame();
    this.gameService.setTimer(this.timerRangeValue);
    this.initBoxesToggleObserver();
  }

  public onBoxClick(index: number): void {
    this.gameService.setClickedByIndex(index);
  }

  public onTimerRangeChange(): void {
    this.gameService.setTimer(this.timerRangeValue);
  }
}
