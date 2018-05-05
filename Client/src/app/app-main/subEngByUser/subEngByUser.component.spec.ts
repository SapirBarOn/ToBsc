import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubEngByUserComponent } from './subEngByUser.component';

describe('SubEngByUserComponent', () => {
  let component: SubEngByUserComponent;
  let fixture: ComponentFixture<SubEngByUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubEngByUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubEngByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
