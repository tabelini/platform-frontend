import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndPointEditComponent } from './end-point-edit.component';

describe('EndPointEditComponent', () => {
  let component: EndPointEditComponent;
  let fixture: ComponentFixture<EndPointEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndPointEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndPointEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
