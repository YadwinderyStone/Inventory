import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RackService } from '../rack.service';
import { TranslationService } from '../../core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/security/auth.service';
import { Warehouse } from '../../core/domain-classes/warehouse';
import { WarehouseService } from '../../core/services/warehouse.service';
import { Guid } from 'guid-typescript';
import { BaseComponent } from 'src/app/base.component';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
@Component({
  selector: 'app-rack',
  templateUrl: './rack.component.html',
  styleUrls: ['./rack.component.scss']
})
export class RackComponent extends BaseComponent implements OnInit {
  rackList: any[] = [];
  isDropdownOpen: boolean = false;
  rackForm: FormGroup
  visible: boolean;
  data: any[] = [];
  loading: boolean = true;
  totalRecords: any = 5;
  wareHouseData: any[] = [];
  addItem: boolean = false
  isId: any;
  warehouses: Warehouse[] = [];
  pageSize = 1;
  skip = 0

  constructor(private fb: FormBuilder,
    private rackService: RackService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private commonDialogService: CommonDialogService,
    public translationService: TranslationService,
    private warehouseService: WarehouseService
  ) {
    super(translationService);
    // this.getRack();
  };
  ngOnInit() {
    this.initializeFormData();
    this.getWarehouse();
  }
  getWarehouse() {
    this.warehouseService.getAll().subscribe(warehouses => {
      this.warehouses = warehouses;
    })
  }
  initializeFormData() {
    this.rackForm = this.fb.group({
      Id: [Guid, Validators.required],
      RackName: ['', Validators.required],
      RackDescription: [''],
    });
  }
  getRack() {
    let data = {
      skip: this.skip,
      pageSize: this.pageSize
    }
    this.loading = true
    this.rackService.getAllRack(data).subscribe((res) => {
      this.data = res
      this.totalRecords = res?.totalRecords || 5
      this.rackList = this.data;
      console.log(this.rackList, "rackList")
      this.loading = false
    },
      error => {
        this.loading = false
        /*  this.localToast.handleHttpErrorResponse(error)*/
        this.toastrService.error(this.translationService.getValue('error'));
      }
    )
  }

  showDialog() {
    this.rackForm.reset();
    this.isId = ''
    this.visible = true;
  }

  edit(item: any) {
    this.isId = item.id;
    item.warehouseName = this.wareHouseData[0];
    this.rackForm.patchValue(item)
    this.visible = true;
  }

  submitForm() {
    if (this.rackForm.invalid) {
      this.authService.markAsDirty(this.rackForm)
      this.rackForm.markAllAsTouched();
      return
    }
    let fb: any = this.rackForm.value;
    this.addItem = true;
    if (this.isId) {
      let data = {
        RackID: this.isId, Id: fb.Id, RackName: fb.RackName, RackDescription: fb.RackDescription
      }
      debugger
      this.rackService.updateRack(data).subscribe(res => {
        this.toastrService.success(this.translationService.getValue('Update Successully'));
        this.getRack();
        this.visible = false;
        this.addItem = false;
        this.rackForm.reset();
      }, error => {
        this.toastrService.error(error);
        this.addItem = false;
      })
    } else {
      this.rackService.AddRack(fb).subscribe((res) => {
        this.getRack();
        this.visible = false;
        this.addItem = false;
        this.rackForm.reset();
        this.toastrService.success(this.translationService.getValue('Save Successully'));
      },
        error => {
          this.addItem = false;
          this.getRack();
          this.visible = false;
          this.toastrService.error(this.translationService.getValue('error'));
        }
      )
    }
  }
  editRack(item: any, event: MouseEvent) {
    item.editable = true;
    this.isId = item.rackID;
    this.rackForm.controls["Id"].setValue(item.warehouseId);
    this.rackForm.controls["RackName"].setValue(item.rackName);
    this.rackForm.controls["RackDescription"].setValue(item.rackDescription);
    this.visible = true;
    console.log("Saving:", item);
    this.isDropdownOpen = true;
    // this.toastrService.success(this.translationService.getValue('UPDATED_SUCCESSFULLY'));
  }

  deleteRack(item: any) {
    const areU = this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE');
    this.sub$.sink = this.commonDialogService.deleteConformationDialog(`${areU} : ${item.rackName}`)
      .subscribe(isTrue => {
        if (isTrue) {
          this.isId = item.rackID;
          this.rackService.deleteRack(item.rackID).subscribe(c => {
            this.toastrService.success(this.translationService.getValue('DELETED_SUCCESSFULLY'));
            item.editable = !item.editable;
            this.getRack();
          }, error => {
            this.toastrService.error(error);
          });
        }
      });

  }

  loadRackList(event: any) {
    this.skip = event.first;
    this.pageSize = event.rows;
    this.getRack();
  }


}



