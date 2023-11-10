import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OpponentEnum } from '../../enums';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreComponent {
  @Input({ required: true }) public opponent!: OpponentEnum;
  @Input() public points: number = 0;

  public readonly scoreClassMap = {
    [OpponentEnum.Computer]: 'computer-points',
    [OpponentEnum.Player]: 'player-points',
  }
}
