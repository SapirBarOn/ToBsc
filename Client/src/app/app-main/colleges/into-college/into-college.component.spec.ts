import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntoCollegeComponent } from './into-college.component';

describe('IntoCollegeComponent', () => {
  let component: IntoCollegeComponent;
  let fixture: ComponentFixture<IntoCollegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntoCollegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntoCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
