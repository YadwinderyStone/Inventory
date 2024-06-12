import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkProductListComponent } from './bulk-product-list.component';

describe('BulkProductListComponent', () => {
  let component: BulkProductListComponent;
  let fixture: ComponentFixture<BulkProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkProductListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
