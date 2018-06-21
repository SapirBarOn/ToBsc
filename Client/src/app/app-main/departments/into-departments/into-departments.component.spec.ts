import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntoDepartmentsComponent } from './into-departments.component';

describe('IntoDepartmentsComponent', () => {
  let component: IntoDepartmentsComponent;
  let fixture: ComponentFixture<IntoDepartmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntoDepartmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntoDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
