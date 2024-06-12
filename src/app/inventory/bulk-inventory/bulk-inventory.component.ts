import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BulkInventoryModel } from '../../core/domain-classes/bulk-inventory';
import { ManageInventoryComponent } from '../manage-inventory/manage-inventory.component';
import { MatDialog } from '@angular/material/dialog';
import { BaseComponent } from '../../base.component';
import { TranslationService } from '../../core/services/translation.service';
import { InventoryDataSource } from '../inventory-list/inventory-datasource';
import { InventoryResourceParameter } from '../../core/domain-classes/inventory-resource-parameter';
import { InventoryService } from '../inventory.service';
import { Router, RouterLinkActive } from '@angular/router';
//import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-bulk-inventory',
  templateUrl: './bulk-inventory.component.html',
  styleUrls: ['./bulk-inventory.component.scss']
})
export class BulkInventoryComponent extends BaseComponent implements OnInit {
  dataSource: InventoryDataSource;
  inventoryResource: InventoryResourceParameter;
  uploadedFiles: File[] = [];
  ImportResultHtml = "";
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    public translationService: TranslationService,
    private InventoryService: InventoryService,
    private route: Router

  ) {
    super(translationService);
  }

  ngOnInit(): void {
  }
  TheExcelFile: File[] = [];

  onImportFileChange(event) {
   
    let fileList: FileList = event.files;

    if (fileList.length > 0) {
      let file: File = fileList[0];
      debugger;
      let exixtingFile = this.TheExcelFile.find((e: any) => e.name == file.name);
      if (exixtingFile) {
        alert('file already exist please choose another file');

      } else {

        this.TheExcelFile.push(file);
       /* this.uploadedFiles.push(file);*/
      }

    }
  }


  addBulkInventory(): any {
    debugger;
  this.InventoryService.addBulkInventory(this.TheExcelFile).subscribe(res => {
    let subCategoryList = res;
    this.route.navigateByUrl('inventory/bulk-inventory-list');
     
    }, error => {
     // this.toastrService.error(error);
    })
  }

  deleteFile(index: number) {
    this.TheExcelFile.splice(index, 1); // Remove the element at the given index
  }
  CancelImport() {
    this.uploadedFiles = null;
    this.TheExcelFile = null;
    this.route.navigateByUrl('inventory/bulk-inventory-list').then(() => {
      window.location.reload();
    });
    //this.Fetch(true);
  }

}
