import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySubEngComponent } from './my-sub-eng.component';

describe('MySubEngComponent', () => {
  let component: MySubEngComponent;
  let fixture: ComponentFixture<MySubEngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySubEngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySubEngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
