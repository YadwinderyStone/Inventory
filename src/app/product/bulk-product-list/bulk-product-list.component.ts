import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { ProductDataSource } from '../../product/product-list/product-datasource';
import { MatSort } from '@angular/material/sort';
import { ProductService } from '../product.service';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-bulk-product-list',
  templateUrl: './bulk-product-list.component.html',
  styleUrls: ['./bulk-product-list.component.scss']
})
export class BulkProductListComponent implements OnInit {
  displayedColumns: string[] = ['action', 'imageUrl', 'name', 'brandName', 'categoryName', 'unitName', 'purchasePrice', 'salesPrice', 'mrp', 'warehouse'];
  filteredList: any[] = []; // Filtered list based on search query
  searchQuery: string = '';
  @ViewChild('dropdownMenu') dropdownMenu: ElementRef;
  isDropdownOpen: boolean = false;
  IsForUpdate: boolean = true;
  theList: any = [];
 // inventoryResource: InventoryResourceParameter;
  public filterObservable$: Subject<string> = new Subject<string>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: ProductDataSource;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public translationService: TranslationService,
    private toastrService: ToastrService,
    private productService: ProductService
  ) {
    this.filteredList = this.theList;
  }

  ngOnInit(): void {
    this.getProductBulk();
  }
  filterList() {
    debugger
    if (!this.searchQuery.trim()) {
      // If search query is empty, show all items
      this.filteredList = this.theList;
    } else {
      // Filter the list based on search query
      const query = this.searchQuery.toLowerCase().trim();
      this.filteredList = this.theList.filter(item =>
        item.sourceName.toLowerCase().includes(query)
      );
    }
  }
  toggleDropdown(item: any) {
    debugger
    if (!item.editable) {
      this.isDropdownOpen = !this.isDropdownOpen;
      if (this.isDropdownOpen) {
        this.dropdownMenu.nativeElement.focus();
      }
    }
  }

  editProduct(item: any, event: MouseEvent) {
    debugger
    event.preventDefault();
    item.editable = !item.editable;
    console.log("Saving:", item);
    this.isDropdownOpen = false;
  }

  UpdateDate(item: any) {
    debugger
    item;
    this.productService.UpdateDate(item)
      .pipe(
        tap((c: any) => {
          debugger;
          if (c.success === true) {
            item.editable = !item.editable;
            this.toastrService.success(this.translationService.getValue('UPDATE_SUCCESSFULLY'));
            this.getProductBulk();
            console.log('UpdateDate successful');
          } else {
            console.error('Error occurred or success is false.');
          }
        }),
        catchError(error => {
          //  console.error('UpdateDate error:', error);
          throw error; // Rethrow the error to propagate it
        })
      )
      .subscribe();
  }
  getProductBulk() {
    this.productService.getProductBulk().subscribe(c => {
      debugger;
      this.theList = [...c];
      this.filteredList = this.theList;
      debugger;
      console.log(this.theList, "inventrybulk")
      console.log(this.filteredList, "Finventrybulk")

    });
  }
  deleteProduct(item: any) {
    debugger;
    this.productService.deleteProduct(item.productMasterID).subscribe(c => {
      this.toastrService.success(this.translationService.getValue('DELETED_SUCCESSFULLY'));
      item.editable = !item.editable;
      this.getProductBulk();
    });
  }

}
