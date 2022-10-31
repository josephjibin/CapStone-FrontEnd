import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTodosComponent } from './add-edit-todos.component';

describe('AddEditTodosComponent', () => {
  let component: AddEditTodosComponent;
  let fixture: ComponentFixture<AddEditTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTodosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
