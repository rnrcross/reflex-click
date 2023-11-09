import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PopupService } from '../../shred/popup';
import { GameNotificationComponent } from './components';
import { GameService } from './services';

const WINNER_INFO = {
  title: 'Congratulations!',
  description: `Your reflexes are outstanding!\n You\'ve mastered the challenge with impressive skill.`,
}
const LOOSER_INFO = {
  title: 'Almost there!',
  description: `Your reflexes are getting better with every try.\n Give it another shot and show what you're capable of!`,
}

@Component({
  selector: 'app-reflex-click',
  templateUrl: './reflex-click.component.html',
  styleUrls: ['./reflex-click.component.css']
})
export class ReflexClickComponent implements OnInit, OnDestroy {
  public timerRangeValue = 1000;
  private gameSubscription!: Subscription;

  constructor(
    private readonly popupService: PopupService,
    public readonly gameService: GameService,
  ) {}

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.gameSubscription.unsubscribe();
  }

  private initBoxesToggleObserver(): void {
    if (this.gameSubscription) this.gameSubscription.unsubscribe();
    this.gameSubscription = this.gameService.gameStream()
      .subscribe({
        complete: () => {
          const componentRef =  this.popupService.open(GameNotificationComponent);
          const notificationInfo = this.gameService.playerPoints > this.gameService.computerPoints ? WINNER_INFO : LOOSER_INFO

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

  public onTimerRangeChange() {
    this.gameService.setTimer(this.timerRangeValue);
  }
}
