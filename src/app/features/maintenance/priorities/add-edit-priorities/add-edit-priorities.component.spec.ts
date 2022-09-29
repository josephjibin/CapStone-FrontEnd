import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPrioritiesComponent } from './add-edit-priorities.component';

describe('AddEditPrioritiesComponent', () => {
  let component: AddEditPrioritiesComponent;
  let fixture: ComponentFixture<AddEditPrioritiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPrioritiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPrioritiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
