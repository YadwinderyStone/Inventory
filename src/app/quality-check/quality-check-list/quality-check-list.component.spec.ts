import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityCheckListComponent } from './quality-check-list.component';

describe('QualityCheckListComponent', () => {
  let component: QualityCheckListComponent;
  let fixture: ComponentFixture<QualityCheckListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityCheckListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
