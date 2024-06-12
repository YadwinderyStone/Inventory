import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { QualityCheckComponent } from './quality-check/quality-check.component';
import { QualityCheckListComponent } from './quality-check-list/quality-check-list.component';
const routes: Routes = [
  {
    path: '',
    component: QualityCheckComponent,
    canActivate: [AuthGuard]
  },
  {

    path: 'qualitychecklist',
    component: QualityCheckListComponent,
    canActivate: [AuthGuard]
  },
 
  //{
  //  path: 'bulk_inventory',
  //  component: BulkInventoryComponent,
  //  data: { claimType: 'INVE_VIEW_INVENTORIES' },
  //  canActivate: [AuthGuard]
  //},
  //{
  //  path: 'bulk-inventory-list',
  //  component: BulkUploadInventoryListComponent,
  //  canActivate: [AuthGuard]
  //},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QualityCheckRoutingModule { }
