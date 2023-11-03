import { Component, OnDestroy, OnInit } from '@angular/core';
import { concatMap, delay, finalize, from, of, pairwise, startWith, Subscription, takeWhile } from 'rxjs';
import { ClickBoxStatusEnum } from './enums';
import { PopupService } from '../../shred/popup';
import { GameNotificationComponent } from './game-notification/game-notification.component';

@Component({
  selector: 'app-reflex-click',
  templateUrl: './reflex-click.component.html',
  styleUrls: ['./reflex-click.component.css']
})
export class ReflexClickComponent implements OnInit, OnDestroy {
  boxesQuantity = 100;
  private pointsToWin = 2;
  public playerPoints = 0;
  public computerPoints = 0;
  public timer = 1000;
  public clickBoxes: ClickBoxStatusEnum[] = new Array(this.boxesQuantity).fill(ClickBoxStatusEnum.neutral);
  randomBoxes: number[] = [];
  subscription!: Subscription;
  BoxClassMap = {
    [ClickBoxStatusEnum.neutral]: 'neutral',
    [ClickBoxStatusEnum.active]: 'active',
    [ClickBoxStatusEnum.success]: 'success',
    [ClickBoxStatusEnum.failed]: 'failed',
  }
  protected readonly BoxStatusEnum = ClickBoxStatusEnum;

  constructor(private popupService: PopupService) {}

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get isGameContinue(): boolean {
    return this.computerPoints < this.pointsToWin && this.playerPoints < this.pointsToWin;
  }

  public onStartClick(): void {
    this.clickBoxes = this.clickBoxes.fill(ClickBoxStatusEnum.neutral);
    this.randomBoxes = this.getRandomArray(this.pointsToWin * 2, this.clickBoxes.length);
    this.playerPoints = this.computerPoints = 0;
    // this.restart$.next();
    this.initBoxesToggleObserver();
  }

  public onBoxClick(index: number): void {
    if (this.clickBoxes.at(index) === ClickBoxStatusEnum.active) {
      this.clickBoxes[index] = ClickBoxStatusEnum.success;
      this.playerPoints++;
    }
  }

  private initBoxesToggleObserver(): void {
    if (this.subscription) this.subscription.unsubscribe();
    console.log(this.randomBoxes);
    this.subscription = from(this.randomBoxes)
      .pipe(
        startWith(-1),
        pairwise(),
        concatMap(value => of(value)
          .pipe(
            takeWhile(() => this.isGameContinue),
            delay(this.timer),
          )
        ),
        finalize(() => {
          console.log('game over')
          this.popupService.open(GameNotificationComponent);

        }),
      ).subscribe(([prev, curr]) => {
        console.log(prev, curr);
        if (this.clickBoxes.at(prev) === ClickBoxStatusEnum.active) {
          this.clickBoxes[prev] = ClickBoxStatusEnum.failed;
          this.computerPoints++;
        }
        if (curr >= 0 && this.isGameContinue) this.clickBoxes[curr] = ClickBoxStatusEnum.active;
      });
  }

  getRandomArray(length: number, limit: number): number[] {
    const randomSet = new Set<number>();

    while (randomSet.size < length) {
      const randomNumber = Math.floor(Math.random() * limit);

      randomSet.add(randomNumber);
    }

    return Array.from(randomSet);
  }
}
