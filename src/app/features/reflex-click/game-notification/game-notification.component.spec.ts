import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameNotificationComponent } from './game-notification.component';

describe('GameNotificationComponent', () => {
  let component: GameNotificationComponent;
  let fixture: ComponentFixture<GameNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameNotificationComponent]
    });
    fixture = TestBed.createComponent(GameNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
