import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicamentsComponent } from './add-medicaments.component';

describe('AddMedicamentsComponent', () => {
  let component: AddMedicamentsComponent;
  let fixture: ComponentFixture<AddMedicamentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMedicamentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMedicamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
