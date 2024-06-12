import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { BulkInventoryComponent } from './bulk-inventory/bulk-inventory.component';
import { BulkUploadInventoryListComponent } from './bulk-upload-inventory-list/bulk-upload-inventory-list.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryListComponent,
    data: { claimType: 'INVE_VIEW_INVENTORIES' },
    canActivate: [AuthGuard]
  },

  {
    path: 'bulk_inventory',
    component: BulkInventoryComponent,
    data: { claimType: 'INVE_VIEW_INVENTORIES' },
    canActivate: [AuthGuard]
  },
  {
    path: 'bulk-inventory-list',
    component: BulkUploadInventoryListComponent,
    canActivate: [AuthGuard]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
