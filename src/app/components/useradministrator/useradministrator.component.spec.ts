import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseradministratorComponent } from './useradministrator.component';

describe('UseradministratorComponent', () => {
  let component: UseradministratorComponent;
  let fixture: ComponentFixture<UseradministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseradministratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseradministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
