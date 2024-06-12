import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Guid } from 'guid-typescript';


@Injectable({
  providedIn: 'root'
})
export class RackService {
  api: any;
  constructor(private http: HttpClient) {
    this.api = environment.apiUrl;
  }
  getAllRack(data): Observable<any> {
    return this.http.get<any>(`Rack/GetAll?skip=${data?.skip}&pageSize=${data?.pageSize}`);
  }
  //getSingle(): Observable<any> {
  //  return this.http.get<any>(`${this.api}Rack/GetSingleRack{ID}`);
  //}

  getSingle(): Observable<any> {
   return this.http.get<any>(`Rack/GetSingleRack{ID}`);
  }
  getAllWarehouse(): Observable<any> {
    return this.http.get<any>(`${this.api}warehouse/list`);
  }
  AddRack(rack): Observable<any> {
    debugger;
    return this.http.post<any>(`Rack/SaveRack`, rack);
  }
  updateRack(rack): Observable<any> {
    return this.http.put<any>(`Rack/UpdateRack`, rack);
  }
  deleteRack(rackId: string): Observable<void> {
    if (!rackId || rackId === '00000000-0000-0000-0000-000000000000') {
      throw new Error('Invalid rackId');
    }
    const customParams = new HttpParams();
    return this.http.delete<void>(`Rack/DeleteRack/${rackId}`);
  }
}
