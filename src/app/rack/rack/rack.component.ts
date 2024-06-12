import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RackService } from '../rack.service';
import { TranslationService } from '../../core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/security/auth.service';
import { Warehouse } from '../../core/domain-classes/warehouse';
import { WarehouseService } from '../../core/services/warehouse.service';
import { Guid } from 'guid-typescript';
import { ProductService } from '../../product/product.service';
import { Router } from '@angular/router';
//import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
//import { Brand } from '../../core/domain-classes/brand';
@Component({
  selector: 'app-rack',
  templateUrl: './rack.component.html',
  styleUrls: ['./rack.component.scss']
})
export class RackComponent implements OnInit {
  rackList: any[] = [];
  //rackDataList: any[] = [];
  isDropdownOpen: boolean = false;
  rackForm: FormGroup
  remarkForm: FormGroup
  visible: boolean;
  data: any[] = [];
  loading: boolean = true;
  wareHouseData: any[] = [];
  addItem: boolean = false
  addremark: boolean = false
  isId: any;
  warehouses: Warehouse[] = [];
  filteredList: any[] = [];
  theList: any[] = [];
  productTitle: string = '';
  grade: string = '';

  selectedData:any ;

  constructor(
    private fb: FormBuilder, private rackService: RackService, private authService: AuthService,
     private toastrService: ToastrService, public translationService: TranslationService, 
     private warehouseService: WarehouseService, private productService: ProductService, private router: Router) {
    this.getRack();
    ;
    //this.getRackData();
  };
  ngOnInit() {
    this.filteredList = [];
    this.theList = [];
    this.getProductBulk();
    this.initializeFormData();
    this.createRemarkForm();
    this.getWarehouse();
  }
  getWarehouse() {
    this.warehouseService.getAll().subscribe(warehouses => {
      this.warehouses = warehouses;
      console.log(this.warehouses)
    })
  }
  initializeFormData() {
    this.rackForm = this.fb.group({
      Id: [Guid, Validators.required],
      /*      RackID:[''],*/
      RackName: ['', Validators.required],
      RackDescription: [''],
    });
  }
  createRemarkForm() {
    this.remarkForm = this.fb.group({
      Remars: ['',Validators.required],
    });
  }
  getRack() {
    this.loading = true
    this.rackService.getAllRack().subscribe((res) => {
      ;
      this.data = res
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
  //getRackData() {
  //  this.loading = true
  //  this.rackService.getAllRackData().subscribe((res) => {
  //    ;
  //    this.data = res
  //    this.rackDataList = this.data;
  //    console.log(this.rackDataList, "rackDataList")
  //    this.loading = false
  //  },

  //    error => {
  //      this.loading = false
  //      /*  this.localToast.handleHttpErrorResponse(error)*/
  //      this.toastrService.error(this.translationService.getValue('error'));
  //    }
  //  )
  //}
  getProductBulk() {
 debugger;
    this.productService.getProductBulk().subscribe(c => {
      ;
      this.theList = [...c];
      this.filteredList = [];
      this.filteredList = this.theList;
      console.log(this.filteredList, "Finventrybulk")
    });
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
    ;
    if (this.rackForm.invalid) {
      this.authService.markAsDirty(this.rackForm)
      this.rackForm.markAllAsTouched();
      return
    }
    let fb: any = this.rackForm.value;
    this.addItem = true;
    if (this.isId) {
      var data = {
        RackID: this.isId, Id: fb.Id, RackName: fb.RackName, RackDescription: fb.RackDescription
      }
      var _retun = this.rackService.updateRack(data).subscribe((res) => {
        
        this.toastrService.success(this.translationService.getValue('Update Successully'));
        this.getRack();
        this.visible = false;
        this.addItem = false;
        this.rackForm.reset();
      },
        error => {
          
          this.getRack();
          this.addItem = false;
          this.toastrService.error(this.translationService.getValue('error'));
        })
    } else {
      var _retun = this.rackService.AddRack(fb).subscribe((res) => {
        this.toastrService.success(this.translationService.getValue('Save Successully'));
        this.getRack();
        this.visible = false;
        this.addItem = false;
        this.rackForm.reset();
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
    this.toastrService.success(this.translationService.getValue('UPDATED_SUCCESSFULLY'));
  }

  deleteRack(item: any) {
    ;
    this.isId = item.rackID;
    this.rackService.deleteRack(item.rackID).subscribe(c => {
      this.toastrService.success(this.translationService.getValue('DELETED_SUCCESSFULLY'));
      item.editable = !item.editable;
      this.getRack();
    });
  }

  isModalVisible: boolean = false;
  isWriteVisible: boolean = false;
  isModVisible: boolean = false;
  RackName: any;
  RackID: any;
  WarehouseID: any;
  PutProductInRack(item: any) {
    debugger;
    this.filteredList = this.theList;

    this.RackName = item.rackName;
    this.RackID = item.rackID;
    this.WarehouseID = item.warehouseId;
    this.isModalVisible = true;
  }
  hideModal() {
    this.isModalVisible = false;
    this.isModVisible = false;
  }
  handleCheckboxChange(item): void {
    item.isSelected = !item.isSelected;
  }

  submitCheckbox(): void {
  debugger;
    this.filteredList = this.theList;
    // const selectedItems = this.theList.filter(item => item.isSelected);
    const selectedProductTitles = this.theList
      .filter(item => item.isSelected)
      .map(item => ({
        productID: item.productMasterID,
        productName: item.productTitle,
        RackID: this.RackID,
        WarehouseID: this.WarehouseID

      }));
    this.rackService.SaveCheckboxProducts(selectedProductTitles)
      .subscribe(response => {
        debugger;
        if (response != null)
        {
          this.isModalVisible = false;
          
        const newOrUpdatedProducts = response.data.newOrUpdatedProducts;
        const existingProducts = response.data.existingProducts;

        console.log('New or Updated Products:', newOrUpdatedProducts);
        console.log('Existing Products:', existingProducts);

        // Display success toast for new or updated products
        if (newOrUpdatedProducts.length > 0) {
          this.toastrService.success(
            this.translationService.getValue('UPDATED_SUCCESSFULLY')
          );
        }

        // Display info toast for existing products
        if (existingProducts.length > 0) {
          this.toastrService.info(
            `${existingProducts.length} product(s) already exist in the rack.`,
            'Existing Products'
          );
        }

        // Additional processing or UI updates as needed
      }
    }, error => {
      console.error('Error saving checkbox products:', error);
      this.toastrService.error(
        this.translationService.getValue('ERROR_OCCURRED'),
        'Error'
      );
    });

  console.log('Selected Product Titles:', selectedProductTitles);
}


  // submitCheckbox(): void {
  //   ;
  //   this.filteredList = this.theList;
  //   const selectedProductTitles = this.theList
  //     .filter(item => item.isSelected)
  //     .map(item => ({
  //       productID: item.productMasterID,
  //       productName: item.productTitle,
  //       RackID: this.RackID,
  //       WarehouseID: this.WarehouseID
  //     }));
  
  //   const existingProducts = [];
  
  //   // Loop through selected products and check if they are already in the rack
  //   selectedProductTitles.forEach(selectedProduct => {
  //     this.rackService.isProductInRack(selectedProduct.productID, this.RackID)
  //       .subscribe(isInRack => {
  //         if (isInRack) {
  //           existingProducts.push(selectedProduct);
  //         } else {
  //           // Save only products that are not already in the rack
  //           this.rackService.SaveCheckboxProducts([selectedProduct])
  //             .subscribe(response => {
  //               if (response != null) {
  //                 this.isModalVisible = false;
  //               }
  //             });
  //         }
  //       });
  //   });
  
  //   if (existingProducts.length > 0) {
  //     console.log('These products are already in the rack:', existingProducts);
  //     existingProducts.forEach(product => {
  //       alert(`Product ${product.productName} is already in rack ${product.RackID}`);
  //     });
  //   }
  // }
  
  WriteRemark(){
    this.isWriteVisible = true;
  }

  submitRemark(): void {
    if (this.remarkForm.invalid) {
      this.remarkForm.markAllAsTouched();
      return
    }
    this.filteredList = this.theList;
    let userData = JSON.parse(localStorage.getItem('authObj'))
     const ProductReviewsdata = {

        userId:userData?.id,
        userName:userData?.firstName,
      productID :this.list[0]?.productID,
      productName: this.list[0]?.productName,
      WareHouseID : this.list[0]?.whereHoueseID,
      productRemark: this.remarkForm?.value?.Remars,
}
    this.rackService.SaveProductReview(ProductReviewsdata)
      .subscribe(response => {
        if (response?.success)
        {
          this.toastrService.success('Remarks added successfully')
          this.isWriteVisible = false;
          //this.updateProductRemark(ProductReviewsdata.productID, ProductReviewsdata.productRemark); 
         this.getProductBulk();
        //  this.filteredList.forEach(product => {
        //   if (product.productID === productID) {
        //     product.QCRemark = 'done';}
        //   })
        
        }else{

        }
      },error=>{
        this.toastrService.error(error)
      });
  }

  list:any=[];
  ShowProductOFRack(item: any) {

    this.RackName = item.rackName;
    this.rackService.FetchRack(item.rackID)
      .subscribe(response => {
        
        console.log("RackDatas", response);
        this.list = response;
        this.isModVisible = true;
      });
   
  }



  RemoveFromRack(rackDataID: any) {
    ;
    this.isId = rackDataID;
    this.rackService.deleteRackData(rackDataID).subscribe(c => {
      this.toastrService.success(this.translationService.getValue('DELETED_SUCCESSFULLY'));
      this.getRack();
      this.isModVisible = false;
    });
  }
}



