import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Inventory } from '@core/domain-classes/inventory';
import { InventoryHistory } from '@core/domain-classes/inventory-history';
import { InventoryHistoryResourceParameter } from '@core/domain-classes/inventory-history-resource-parameter';
import { InventoryResourceParameter } from '@core/domain-classes/inventory-resource-parameter';
import { Observable, throwError } from 'rxjs';
import { BulkInventoryModel } from '../core/domain-classes/bulk-inventory';
import { catchError, map, tap } from 'rxjs/operators';
import { bulkinventory } from '../core/domain-classes/bulkinventory';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  getInventories(
    resourceParams: InventoryResourceParameter
  ): Observable<HttpResponse<Inventory[]>> {
    const url = 'inventory';
    const customParams = new HttpParams()
      .set('Fields', resourceParams.fields)
      .set('OrderBy', resourceParams.orderBy)
      .set('PageSize', resourceParams.pageSize.toString())
      .set('Skip', resourceParams.skip.toString())
      .set('SearchQuery', resourceParams.searchQuery)
      .set('productName', resourceParams.productName ? resourceParams.productName : '')

    return this.http.get<Inventory[]>(url, {
      params: customParams,
      observe: 'response',
    });

  }

  getInventoriesReport(
    resourceParams: InventoryResourceParameter
  ): Observable<HttpResponse<Inventory[]>> {
    const url = 'inventory';
    const customParams = new HttpParams()
      .set('Fields', resourceParams.fields)
      .set('OrderBy', resourceParams.orderBy)
      .set('PageSize', 0)
      .set('Skip', 0)
      .set('SearchQuery', resourceParams.searchQuery)
      .set('productName', resourceParams.productName ? resourceParams.productName : '')

    return this.http.get<Inventory[]>(url, {
      params: customParams,
      observe: 'response',
    });

  }

  addInventory(inventory: Inventory): Observable<Inventory> {
    const url = 'inventory';
    return this.http.post<Inventory>(url, inventory);
  }

  getInventoryHistories(
    resourceParams: InventoryHistoryResourceParameter
  ): Observable<HttpResponse<InventoryHistory[]>> {
    const url = 'inventory/history';
    const customParams = new HttpParams()
      .set('Fields', resourceParams.fields)
      .set('OrderBy', resourceParams.orderBy)
      .set('PageSize', resourceParams.pageSize.toString())
      .set('Skip', resourceParams.skip.toString())
      .set('SearchQuery', resourceParams.searchQuery)
      .set('productId', resourceParams.productId)

    return this.http.get<InventoryHistory[]>(url, {
      params: customParams,
      observe: 'response',
    });
  }

  addBulkInventory(files: File[]): Observable<string[]> {
    debugger
    if (!files || files.length === 0) {
      return throwError('No files selected for upload');
    }
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    return this.http.post<string[]>('ExcelUpload/BulkUpload', formData).pipe(
      map((response: string[]) => response), // Optional: Handle successful response
      catchError((error: HttpErrorResponse) => {
        console.error('Error uploading files:', error);
        return throwError(error); // Re-throw for handling at a higher level
      })
    );
  }
  getInventoruBulk() {
    debugger
    const customParams = new HttpParams();
    const url = `ExcelUpload/GetAllExcelData`;
    return this.http.get<bulkinventory[]>(url, {
      params: customParams
    });
  }
  UpdateDate(ietem: any): Observable<void> {
    debugger
    const url = `ExcelUpload/UpdateExcelUpload/${ietem.productMasterID}`;
    console.log('POST Request URL:', url);
    console.log('POST Request Payload:', ietem);
    return this.http.post<void>(url, ietem)
      .pipe(
        tap(() => console.log('POST Request successful')),
        catchError(error => {
          console.error('POST Request error:', error);
          throw error; // Rethrow the error to propagate it
        })
      );
  }
  deleteProduct(id: string): Observable<void> {
    debugger
    const customParams = new HttpParams();
    const url = `ExcelUpload/Delete/${id}`;
    return this.http.delete<void>(url, {
      params: customParams
    });
  }
}
