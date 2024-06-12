import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { ProductService } from '../product.service';
import { bulkinventory } from '../../core/domain-classes/bulkinventory';

@Component({
  selector: 'app-upload-bulk-product',
  templateUrl: './upload-bulk-product.component.html',
  styleUrls: ['./upload-bulk-product.component.scss']
})
export class UploadBulkProductComponent extends BaseComponent implements OnInit {
  uploadedFiles: File[] = [];
  bulkinventory: bulkinventory[] = [];;
  ImportResultHtml = "";
  constructor(
    private productService: ProductService,
  ) {
      super();
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
  addBulkProducts(): any {
    debugger;
    this.productService.addBulkProducts(this.TheExcelFile).subscribe(res => {
      let subCategoryList = res;

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
    //this.Fetch(true);
  }

}
