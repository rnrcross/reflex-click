import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickBoxComponent } from './click-box.component';

describe('ClickBoxComponent', () => {
  let component: ClickBoxComponent;
  let fixture: ComponentFixture<ClickBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClickBoxComponent]
    });
    fixture = TestBed.createComponent(ClickBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
