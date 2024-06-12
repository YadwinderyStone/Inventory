import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-quality-check-list',
  templateUrl: './quality-check-list.component.html',
  styleUrls: ['./quality-check-list.component.scss']
})
export class QualityCheckListComponent implements OnInit {
  isModalVisible: boolean = false;
  isModVisible: boolean = false;
  isWriteVisible: boolean = false;
  scanProductDetails : boolean = false;
  ProductName : any;
  RackName: any;
  loading: boolean = true;
  theList: any[] = [];
  filteredList: any[] = [];
  qcList:any = [{rackName:'QC1'}]
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.filteredList = [];
    this.theList = [];
    this.getProductBulk();
  }
  hideModal() {
    this.isModalVisible = false;
    this.isModVisible = false;
    this.isWriteVisible = false;
    this.scanProductDetails = false;
  }


  submitScanProductDetail(){


  }


  openDialog(item: any){
    debugger;
   // this.RackName = item.rackName;
    // this.RackID = item.rackID;
    // this.WarehouseID = item.warehouseId;
    this.isWriteVisible = true;
  }


  openScanDialogue(item: any){
    debugger;
    this.scanProductDetails = true;
    this.ProductName = item.productTitle
    
  }



  getProductBulk() {
    debugger;
    this.productService.getProductBulk().subscribe(c => {
      debugger;
      this.theList = [...c];
      this.filteredList = [];
      this.filteredList = this.theList;
      console.log(this.filteredList, "Finventrybulk")
    });
  }

  


}
