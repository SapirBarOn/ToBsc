import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertUsersComponent } from './expert-users.component';

describe('ExpertUsersComponent', () => {
  let component: ExpertUsersComponent;
  let fixture: ComponentFixture<ExpertUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
