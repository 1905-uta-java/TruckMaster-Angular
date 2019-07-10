import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRoutesComponent } from './manager-routes.component';

describe('ManagerRoutesComponent', () => {
  let component: ManagerRoutesComponent;
  let fixture: ComponentFixture<ManagerRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
