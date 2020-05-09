import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailedComponent } from './order-detailed.component';

describe('OrderDetailedComponent', () => {
  let component: OrderDetailedComponent;
  let fixture: ComponentFixture<OrderDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
