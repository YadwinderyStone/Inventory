import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RackComponent } from './rack/rack.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { RackRoutingModule } from './rack-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RackComponent
  ],
  imports: [
    CommonModule,
    RackRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    FileUploadModule,
    HttpClientModule,
    DialogModule,
    HttpClientModule,
    SharedModule,
    DropdownModule,
    TableModule,
  ]
})
export class RackModule { }
