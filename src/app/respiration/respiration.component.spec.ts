import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespirationComponent } from './respiration.component';

describe('RespirationComponent', () => {
  let component: RespirationComponent;
  let fixture: ComponentFixture<RespirationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespirationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
