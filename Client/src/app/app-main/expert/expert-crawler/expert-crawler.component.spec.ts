import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertCrawlerComponent } from './expert-crawler.component';

describe('ExpertCrawlerComponent', () => {
  let component: ExpertCrawlerComponent;
  let fixture: ComponentFixture<ExpertCrawlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertCrawlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertCrawlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
