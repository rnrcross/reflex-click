import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  concatMap,
  delay,
  from,
  Observable,
  of,
  pairwise,
  startWith,
  takeWhile,
  tap
} from 'rxjs';

import { ClickBoxStatusEnum } from '../enums';
import { getRandomArray } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public get clickBoxes$(): Observable<ClickBoxStatusEnum[]> {
    return this._clickBoxes$.asObservable();
  }

  public get clickBoxes(): ClickBoxStatusEnum[] {
    return this._clickBoxes$.getValue();
  }

  private get isGameContinue(): boolean {
    return this.computerPoints < this.pointsToWin && this.playerPoints < this.pointsToWin;
  }

  public get playerPoints$(): Observable<number> {
    return this._playerPoints$.asObservable();
  }
  public get computerPoints$(): Observable<number> {
    return this._computerPoints$.asObservable();
  }
  public get playerPoints(): number {
    return this._playerPoints$.getValue();
  }
  public get computerPoints(): number {
    return this._computerPoints$.getValue();
  }

  private timer = 1000;
  private readonly pointsToWin = 2;
  private readonly boxesQuantity = 100;
  private readonly _clickBoxes$ = new BehaviorSubject<ClickBoxStatusEnum[]>(
    new Array(this.boxesQuantity).fill(ClickBoxStatusEnum.neutral)
  );
  private readonly _playerPoints$ = new BehaviorSubject<number>(0);
  private readonly _computerPoints$ = new BehaviorSubject<number>(0);

  public setTimer(ms: number): void {
    this.timer = ms;
  }
  public resetGame(): void {
    this._playerPoints$.next(0);
    this._computerPoints$.next(0);
    this.clickBoxes.fill(ClickBoxStatusEnum.neutral);
    this._clickBoxes$.next(this.clickBoxes);
  }

  public gameStream(): Observable<[number, number]> {
    const timer = this.timer;
    const randomBoxIndexes = getRandomArray(this.pointsToWin * 2, this.clickBoxes.length);

    return from(randomBoxIndexes)
      .pipe(
        startWith(-1),
        pairwise(),
        concatMap(value => of(value)
          .pipe(
            takeWhile(() => this.isGameContinue),
            delay(timer),
          )
        ),
        tap(([prev, curr]) => {
          this.setMissedByIndex(prev);
          if (this.isGameContinue) this.setActiveByIndex(curr);
        }),
      )
  }
  public setClickedByIndex(index: number): void {
    if (this.clickBoxes[index] !== ClickBoxStatusEnum.active) return;

    this.updateStatusByIndex(index, ClickBoxStatusEnum.clicked);
    this._playerPoints$.next(this.playerPoints + 1);
  }
  private setMissedByIndex(index: number): void {
    if (this.clickBoxes[index] !== ClickBoxStatusEnum.active) return;

    this.updateStatusByIndex(index, ClickBoxStatusEnum.missed);
    this._computerPoints$.next(this.computerPoints + 1);
  }

  private setActiveByIndex(index: number): void {
    if (this.clickBoxes[index] !== ClickBoxStatusEnum.neutral) return;

    this.updateStatusByIndex(index, ClickBoxStatusEnum.active);
  }

  private updateStatusByIndex(index: number, status: ClickBoxStatusEnum): void {
    if (index < 0) return;

    this.clickBoxes[index] = status;
    this._clickBoxes$.next(this.clickBoxes);
  }
}
