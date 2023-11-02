import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReflexClickComponent } from './reflex-click.component';

describe('ReflexClickComponent', () => {
  let component: ReflexClickComponent;
  let fixture: ComponentFixture<ReflexClickComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReflexClickComponent]
    });
    fixture = TestBed.createComponent(ReflexClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
