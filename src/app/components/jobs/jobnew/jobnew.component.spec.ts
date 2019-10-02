import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobnewComponent } from './jobnew.component';

describe('JobnewComponent', () => {
  let component: JobnewComponent;
  let fixture: ComponentFixture<JobnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
