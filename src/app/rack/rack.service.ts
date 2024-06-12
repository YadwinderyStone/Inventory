import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { debug } from 'console';


@Injectable({
  providedIn: 'root'
})
export class RackService {
  api: any;
  //private i = "https://localhost:44346/api";
  constructor(private http: HttpClient) {

    this.api = environment.apiUrl;
  }
  getAllRack(): Observable<any> {
    return this.http.get<any>(`Rack/GetAll`);
  }
  getAllRackData(): Observable<any> {
    debugger;
    return this.http.get<any>(`FetchRack/GetAllRackData`);
  }
  //getSingle(): Observable<any> {
  //  return this.http.get<any>(`${this.api}Rack/GetSingleRack{ID}`);
  //}

  getSingle(): Observable<any> {
   return this.http.get<any>(`Rack/GetSingleRack{ID}`);
  }
  FetchRack(rackId: string): Observable<void> {
    debugger;
    if (rackId == null) {
      throw new Error('Invalid rackId');
    }
    const customParams = new HttpParams();
    return this.http.get<void>(`FetchRack/SingleFetchRack/${rackId}`);
  }
  getAllWarehouse(): Observable<any> {
    return this.http.get<any>(`${this.api}warehouse/list`);
  }
  AddRack(rack): Observable<any> {
    debugger;
    return this.http.post<any>(`Rack/SaveRack`, rack);
  }

  AddRemark(rack): Observable<any> {
    debugger;
    return this.http.post<any>(`Rack/SaveRack`, rack);
  }
  SaveCheckboxProducts(selectedProductTitles): Observable<any> {
    return this.http.post<any>(`Rack/SaveCheckboxProducts`, selectedProductTitles);
  }

  SaveProductReview(ProductReviewsdata): Observable<any> {
    debugger;
    return this.http.post<any>(`Rack/SaveProductRemark`, ProductReviewsdata);
  }
  isProductInRack(rackID: string): Observable<any> {
    debugger;
    return this.http.get<any>(`FetchRack/CheckProductInRack?rackID=${rackID}`);
  }


  updateRack(rack): Observable<any> {
    debugger;
    return this.http.put<any>(`Rack/UpdateRack`, rack);
  }
  deleteRack(rackId: string): Observable<void> {
    debugger

    if (!rackId || rackId === '00000000-0000-0000-0000-000000000000') {
      throw new Error('Invalid rackId');
    }
    const customParams = new HttpParams();
    return this.http.delete<void>(`Rack/DeleteRack/${rackId}`);
  }
  
  deleteRackData(rackDataID: string): Observable<void> {
    debugger;
    if (!rackDataID || rackDataID === '00000000-0000-0000-0000-000000000000') {
      throw new Error('Invalid rackId');
    }
    const customParams = new HttpParams();
    return this.http.delete<void>(`FetchRack/DeleteRackData/${rackDataID}`);
  }

}
