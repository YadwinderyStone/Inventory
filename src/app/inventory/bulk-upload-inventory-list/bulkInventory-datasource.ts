import { DataSource } from '@angular/cdk/table';
import { HttpResponse } from '@angular/common/http';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Inventory } from '@core/domain-classes/inventory';
import { InventoryService } from '../inventory.service';
import { InventoryResourceParameter } from '@core/domain-classes/inventory-resource-parameter';
import { BulkInventory } from '@core/domain-classes/bulk-Invetory';

export class BulkInventoryDataSource implements DataSource<BulkInventory> {
  private _entities$ = new BehaviorSubject<BulkInventory[]>([]);
  private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
  private loadingSubject$ = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject$.asObservable();
  private _count: number = 0;
  sub$: Subscription;

  public get count(): number {
    return this._count;
  }
  public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

  constructor(private inventoryService: InventoryService) {
    this.sub$ = new Subscription();
  }

  connect(): Observable<BulkInventory[]> {
    return this._entities$.asObservable();
  }

  disconnect(): void {
    this._entities$.complete();
    this.loadingSubject$.complete();
    this.sub$.unsubscribe();
  }

  loadData(inventoryResource: InventoryResourceParameter) {
    this.loadingSubject$.next(true);
    this.sub$ = this.inventoryService.getInventoryBulkList(inventoryResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject$.next(false)))
      .subscribe((resp:any) => {
        let paginationParam = new ResponseHeader();
        if (resp && resp.headers?.get('X-Pagination')) {
          paginationParam = JSON.parse(
            resp.headers.get('X-Pagination')
          ) as ResponseHeader;
        }
        this._responseHeaderSubject$.next(paginationParam);
        // const entities = [...resp?.body];
        const entities = [...resp];
        this._count = entities.length;
        this._entities$.next(entities);
      });
  }
}
