import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditToDoComponent } from './add-edit-to-do.component';

describe('AddEditToDoComponent', () => {
  let component: AddEditToDoComponent;
  let fixture: ComponentFixture<AddEditToDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditToDoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
