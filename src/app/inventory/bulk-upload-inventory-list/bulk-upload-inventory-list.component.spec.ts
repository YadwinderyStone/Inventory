import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadInventoryListComponent } from './bulk-upload-inventory-list.component';

describe('BulkUploadInventoryListComponent', () => {
  let component: BulkUploadInventoryListComponent;
  let fixture: ComponentFixture<BulkUploadInventoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkUploadInventoryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkUploadInventoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
