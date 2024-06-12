import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualityCheckComponent } from './quality-check/quality-check.component';
import { QualityCheckRoutingModule } from './quality-check-routing.module';
import { QualityCheckListComponent } from './quality-check-list/quality-check-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
/*import { NgxBarcodeModule } from 'ngx-barcode';*/
/*import { NgxBarcodeScannerModule } from 'ngx-barcode-scanner';*/
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SharedModule } from '../shared/shared.module';
import { FileUploadModule } from 'primeng/fileupload';
import { NgxBarcodeScannerModule } from '@eisberg-labs/ngx-barcode-scanner';




@NgModule({
  declarations: [
    QualityCheckComponent,
    QualityCheckListComponent
  ],
  imports: [
    CommonModule,
    QualityCheckRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    HttpClientModule,
    DialogModule,
    SharedModule,
    DropdownModule,
    TableModule,
    NgxBarcodeScannerModule

    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class QualityCheckModule { }
