import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@microsoft/signalr';
import { InventoryService } from '../inventory.service';
import { catchError, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { InventoryResourceParameter } from '../../core/domain-classes/inventory-resource-parameter';
import { Subject, merge } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { ResponseHeader } from '../../core/domain-classes/response-header';
import { MatSort } from '@angular/material/sort';
import { SubSink } from 'subsink';
import { BaseComponent } from 'src/app/base.component';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { BulkInventoryDataSource } from './bulkInventory-datasource';

@Component({
  selector: 'app-bulk-upload-inventory-list',
  templateUrl: './bulk-upload-inventory-list.component.html',
  styleUrls: ['./bulk-upload-inventory-list.component.scss'],
})
export class BulkUploadInventoryListComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['action', 'sourceName', 'WSN', 'WID', 'FSN', 'SKU','ListingID','OrderID','QCremark','Grade', 'ProductTitle','HSN_SAC',
  'IGSTrate','FSP','MRP','Rejected','PI_Date','FktLink','Wh_Locatin','Brand','Vertical','Cat_type','Area','Dest_Location','Vrp',
  'BatchNumber','Category','createdDate','createdBy','modifiedDate','modifiedBy','deletedDate','deletedBy','isDeleted']
  
  columnsToDisplay: string[] = ["footer"];
  filteredList: any[] = []; // Filtered list based on search query
  searchQuery: string = '';
  search: string='';
  @ViewChild('dropdownMenu') dropdownMenu: ElementRef;
  isDropdownOpen: boolean = false;
  IsForUpdate: boolean = true;
  theList: any = [];
  inventoryResource: InventoryResourceParameter;
  public filterObservable$: Subject<string> = new Subject<string>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: BulkInventoryDataSource;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private commonDialogService: CommonDialogService,
    public translationService: TranslationService,
    private inventoryservice: InventoryService,
    private toastrService: ToastrService,

  ) {
    super(translationService);
    this.filteredList = this.theList;
    this.inventoryResource = new InventoryResourceParameter();
    this.inventoryResource.pageSize = 10;
    this.inventoryResource.skip = 0;
    this.inventoryResource.orderBy = 'createdDate desc';

  }
  ngOnInit(): void {
    // this.getInventoruBulk();
    this.dataSource = new BulkInventoryDataSource(this.inventoryservice);
    this.dataSource.loadData(this.inventoryResource);
    this.getResourceParameter();
    this.sub$.sink = this.filterObservable$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged())
      .subscribe((c) => {
        this.inventoryResource.skip = 0;
        this.paginator.pageIndex = 0;
        const strArray: Array<string> = c.split(':');
        if (strArray[0] === 'id') {
          this.inventoryResource.id = strArray[1];
        }
        if (strArray[0] === 'productId') {
          this.inventoryResource.productId = strArray[1];
        }
        if (strArray[0] === 'stock') {
          // Convert string to number using parseInt or parseFloat
          this.inventoryResource.stock = parseInt(strArray[1], 10); // Assuming base 10
        }
        if (strArray[0] === 'productName') {
          this.inventoryResource.productName = strArray[1];
        }
        this.dataSource.loadData(this.inventoryResource);
      });
  }
  getInventoruBulk() {
    this.inventoryservice.getInventoryBulkList(this.inventoryResource).subscribe((c:any) => {
      this.theList = [...c];
      // this.inventoryResource.totalCount = c?.totalCount || 20
      this.filteredList = this.theList;
      // console.log(this.theList, "inventrybulk")
      // console.log(this.filteredList, "Finventrybulk")

    });
  }
  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$
      .subscribe((c: ResponseHeader) => {
        if (c) {
          this.inventoryResource.pageSize = c.pageSize;
          this.inventoryResource.skip = c.skip;
          this.inventoryResource.totalCount = c.totalCount;
        }
      });
  }
  sub$: SubSink;
  ngAfterViewInit() {
    this.sub$.sink = this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((c: any) => {
          this.inventoryResource.skip = this.paginator.pageIndex * this.paginator.pageSize;
          this.inventoryResource.pageSize = this.paginator.pageSize;
          this.inventoryResource.orderBy = this.sort.active + ' ' + this.sort.direction;
          this.dataSource.loadData(this.inventoryResource);
        })
      )
      .subscribe();
  }
  filterList() {

    if (!this.searchQuery.trim()) {
      // If search query is empty, show all items
      this.filteredList = this.theList;
    } else {
      // Filter the list based on search query
      const query = this.searchQuery.toLowerCase().trim();
      this.filteredList = this.theList.filter(item =>
        item.sourceName.toLowerCase().ncludes(query)
      );
    }
  }
  toggleDropdown(item: any) {
    if (!item.editable) {
      this.isDropdownOpen = !this.isDropdownOpen;
      if (this.isDropdownOpen) {
        this.dropdownMenu.nativeElement.focus();
      }
    }
  }
  editProduct(item: any, event: MouseEvent) {
    event.preventDefault();
    item.editable = !item.editable;
    console.log("Saving:", item);
    this.isDropdownOpen = false;
  }
  UpdateDate(item: any) {
    item;
    this.inventoryservice.UpdateDate(item)
      .pipe(
        tap((c: any) => {
          if (c.success === true) {
            item.editable = !item.editable;
            this.toastrService.success(this.translationService.getValue('UPDATE_SUCCESSFULLY'));
            this.getInventoruBulk();
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
  deleteProduct(item: any) {
    this.sub$.sink = this.commonDialogService.deleteConformationDialog(this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE'))
      .subscribe(isTrue => {
    this.inventoryservice.deleteProduct(item.productMasterID).subscribe(c => {
      this.toastrService.success(this.translationService.getValue('DELETED_SUCCESSFULLY'));
      item.editable = !item.editable;
      this.getInventoruBulk();
    },error=>{
      this.toastrService.error(error);
    });})
  }



  onSearch(){
    if(this.search){
      this.inventoryResource.search = this.search;
      this.dataSource.loadData(this.inventoryResource);
    }
  }

onClear(){
  this.search = '';
    this.inventoryResource.search = this.search;
    this.dataSource.loadData(this.inventoryResource);
  }
}
