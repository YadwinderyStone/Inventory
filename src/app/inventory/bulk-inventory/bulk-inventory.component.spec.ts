import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkInventoryComponent } from './bulk-inventory.component';

describe('BulkInventoryComponent', () => {
  let component: BulkInventoryComponent;
  let fixture: ComponentFixture<BulkInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
