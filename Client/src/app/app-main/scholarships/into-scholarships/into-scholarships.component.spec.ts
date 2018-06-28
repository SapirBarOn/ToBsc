import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntoScholarshipsComponent } from './into-scholarships.component';

describe('IntoScholarshipsComponent', () => {
  let component: IntoScholarshipsComponent;
  let fixture: ComponentFixture<IntoScholarshipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntoScholarshipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntoScholarshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
