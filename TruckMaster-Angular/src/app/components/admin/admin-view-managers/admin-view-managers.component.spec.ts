import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewManagersComponent } from './admin-view-managers.component';

describe('AdminViewManagersComponent', () => {
  let component: AdminViewManagersComponent;
  let fixture: ComponentFixture<AdminViewManagersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewManagersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
