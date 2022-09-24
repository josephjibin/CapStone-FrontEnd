import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPrioritiesComponent } from './list-priorities.component';

describe('ListPrioritiesComponent', () => {
  let component: ListPrioritiesComponent;
  let fixture: ComponentFixture<ListPrioritiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPrioritiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPrioritiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
