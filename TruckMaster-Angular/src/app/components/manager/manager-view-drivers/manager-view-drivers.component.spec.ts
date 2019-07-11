import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerViewDriversComponent } from './manager-view-drivers.component';

describe('ManagerViewDriversComponent', () => {
  let component: ManagerViewDriversComponent;
  let fixture: ComponentFixture<ManagerViewDriversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerViewDriversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerViewDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
