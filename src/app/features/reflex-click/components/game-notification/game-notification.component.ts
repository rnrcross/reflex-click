import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-notification',
  templateUrl: './game-notification.component.html',
  styleUrls: ['./game-notification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameNotificationComponent {
  @Input() title: string = 'Congratulations!';
  @Input() description: string = `Your reflexes are outstanding!\n You\'ve mastered the challenge with impressive skill.`;
}
