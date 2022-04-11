import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFoodEntriesComponent } from './admin-food-entries.component';

describe('AdminFoodEntriesComponent', () => {
  let component: AdminFoodEntriesComponent;
  let fixture: ComponentFixture<AdminFoodEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFoodEntriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFoodEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
