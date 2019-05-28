import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleEventComponent } from './sale-event.component';

describe('SaleEventComponent', () => {
  let component: SaleEventComponent;
  let fixture: ComponentFixture<SaleEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
