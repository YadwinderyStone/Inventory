import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { RackComponent } from './rack/rack.component';
const routes: Routes = [
  {
    path: '',
    component: RackComponent,
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
export class RackRoutingModule { }
