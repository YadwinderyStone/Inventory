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
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-bulk-inventory',
  templateUrl: './bulk-inventory.component.html',
  styleUrls: ['./bulk-inventory.component.scss']
})
export class BulkInventoryComponent extends BaseComponent implements OnInit {
  dataSource: InventoryDataSource;
  uploadedList:any = []
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
    let fileSelected = event?.files[0];
    if (!fileSelected) {
      return;
    }
    //this.previewFile = false;
    const fileExtension: string = fileSelected.name.split('.').pop()?.toLowerCase() || '';

    if (fileExtension === 'xls' || fileExtension === 'xlsx') {
      //this.addedFile = [];
      //this.addedFile.push(fileSelected);
    } else {
      //this.toastrService.error('Please upload valid file type')
    }
    //const target: DataTransfer = <DataTransfer>event.files;
    ////if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    //const reader: FileReader = new FileReader();
    //reader.onload = (e: any) => {
    //  const bstr: string = e.target.result;
    //  const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
    //  const wsname: string = wb.SheetNames[0];
    //  const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    //  this.uploadedList = XLSX.utils.sheet_to_json(ws, { header: 1 });
    //  this.uploadedList = this.uploadedList.slice(1).map((row: any) => {
    //    const obj: any = {};
    //    if (row[0] !== undefined) {
    //      this.uploadedList[0].forEach((key: string, index: number) => {
    //        obj[key] = row[index];
    //      });
    //    }
    //    return obj;
    //  });
    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const binaryStr = e.target.result;
      const workBook = XLSX.read(binaryStr, { type: 'binary' });
      const firstSheetName = workBook.SheetNames[0];
      const worksheet = workBook.Sheets[firstSheetName];
      this.uploadedList = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      this.uploadedList = this.uploadedList.slice(1).map((row: any) => {
           const obj: any = {};
           if (row[0] !== undefined) {
             this.uploadedList[0].forEach((key: string, index: number) => {
               obj[key] = row[index];
             });
           }
           return obj;
         });
      this.uploadedList = this.uploadedList.filter(obj => Object.keys(obj).length !== 0);
    };
    reader.readAsBinaryString(file);
     
    //reader.readAsBinaryString(target.files[0]);
  //}
    //let fileList: FileList = event.files;

    //if (fileList.length > 0) {
    //  let file: File = fileList[0];
    //  debugger;
    //  let exixtingFile = this.TheExcelFile.find((e: any) => e.name == file.name);
    //  if (exixtingFile) {
    //    alert('file already exist please choose another file');

    //  } else {

    //    this.TheExcelFile.push(file);
    //   /* this.uploadedFiles.push(file);*/
    //  }

    //}
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
