import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBulkProductComponent } from './upload-bulk-product.component';

describe('UploadBulkProductComponent', () => {
  let component: UploadBulkProductComponent;
  let fixture: ComponentFixture<UploadBulkProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadBulkProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadBulkProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
