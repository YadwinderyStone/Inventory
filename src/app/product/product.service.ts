import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@core/domain-classes/product';
import { ProductResourceParameter } from '@core/domain-classes/product-resource-parameter';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { bulkinventory } from '../core/domain-classes/bulkinventory';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(
    resourceParams: ProductResourceParameter
  ): Observable<HttpResponse<Product[]>> {
    const url = 'product';
    const customParams = new HttpParams()
      .set('fields', resourceParams.fields)
      .set('orderBy', resourceParams.orderBy)
      .set('pageSize', resourceParams.pageSize.toString())
      .set('skip', resourceParams.skip.toString())
      .set('searchQuery', resourceParams.searchQuery)
      .set('name', resourceParams.name)
      .set('id', resourceParams.id)
      .set('categoryId', resourceParams.categoryId ? resourceParams.categoryId : '')
      .set('unitId', resourceParams.unitId ? resourceParams.unitId : '')
      .set('barcode', resourceParams.barcode ? resourceParams.barcode : '')
      .set('brandId', resourceParams.brandId ? resourceParams.brandId : resourceParams.brandId);
    return this.http.get<Product[]>(url, {
      params: customParams,
      observe: 'response',
    });
  }

  getProudct(id: string): Observable<Product> {
    const url = `product/${id}`;
    return this.http.get<Product>(url);
  }

  addProudct(product: Product): Observable<Product> {
    const url = 'product';
    return this.http.post<Product>(url, product);
  }

  updateProudct(id: string, product: Product): Observable<Product> {
    const url = `product/${id}`;
    return this.http.put<Product>(url, product);
  }


  deleteProudct(id: string): Observable<void> {
    const url = `product/${id}`;
    return this.http.delete<void>(url);
  }
  addBulkProducts(files: File[]): Observable<string[]> {
    debugger
    if (!files || files.length === 0) {
      return throwError('No files selected for upload');
    }

    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    return this.http.post<string[]>('BulkProduct/AddBulkProduct', formData).pipe(
      map((response: string[]) => response),
      catchError((error: HttpErrorResponse) => {
        console.error('Error uploading files:', error);
        return throwError(error); 
      })
    );
  }
  deleteProduct(id: string): Observable<void> {
    debugger
    const customParams = new HttpParams();
    const url = `BulkProduct/DeleteBulkProduct/${id}`;
    return this.http.delete<void>(url, {
      params: customParams
    });
  }
  UpdateDate(ietem: any): Observable<void> {
    debugger
    const url = `BulkProduct/UpdateProductUpload/${ietem.productMasterID}`;
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
  getProductBulk() {
    debugger
    const customParams = new HttpParams();
    const url = `BulkProduct/GetAllProductData`;
    return this.http.get<bulkinventory[]>(url, {
      params: customParams
    });
  }
}
