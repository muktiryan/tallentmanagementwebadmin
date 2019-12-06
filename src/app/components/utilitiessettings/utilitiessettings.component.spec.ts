import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilitiessettingsComponent } from './utilitiessettings.component';

describe('UtilitiessettingsComponent', () => {
  let component: UtilitiessettingsComponent;
  let fixture: ComponentFixture<UtilitiessettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilitiessettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilitiessettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
