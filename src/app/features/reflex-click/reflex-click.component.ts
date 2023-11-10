import { ChangeDetectionStrategy, Component } from '@angular/core';

import { GameService } from './services';
import { OpponentEnum } from './enums';

@Component({
  selector: 'app-reflex-click',
  templateUrl: './reflex-click.component.html',
  styleUrls: ['./reflex-click.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReflexClickComponent {
  constructor(
    public readonly gameService: GameService,
  ) {}

  public readonly opponentEnum = OpponentEnum;
}
