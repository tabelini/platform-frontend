import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndPointListComponent } from './end-point-list.component';

describe('EndPointListComponent', () => {
  let component: EndPointListComponent;
  let fixture: ComponentFixture<EndPointListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndPointListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndPointListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
