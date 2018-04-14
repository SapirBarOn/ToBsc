import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubEngComponent } from './sub-eng.component';

describe('SubEngComponent', () => {
  let component: SubEngComponent;
  let fixture: ComponentFixture<SubEngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubEngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubEngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
