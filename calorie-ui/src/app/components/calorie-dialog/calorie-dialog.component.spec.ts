import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalorieDialogComponent } from './calorie-dialog.component';

describe('CalorieDialogComponent', () => {
  let component: CalorieDialogComponent;
  let fixture: ComponentFixture<CalorieDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalorieDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalorieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
