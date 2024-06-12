import { Guid } from "guid-typescript";

export class bulkinventory {
  ProductMasterID: Guid;
  SourceName: string;
  WSN: string;
  WID: string;
  FSN: string;
  SKU: string;
  ListingID: string;
  OrderID: bigint;
  QCremark: string;
  Grade: string;
  ProductT: string;
  HSN_SAC: bigint;
  IGSTrate: bigint;
  FSP: bigint;
  MRP: bigint;
  Rejected: string;
  PI_Date: DateOnly;
  FktLink: string;
  Wh_Locatin: string;
  Brand: string;
  Vertical: string;
  Cat_type: string;
  Area: string;
  Dest_Location: string;
  Vrp: string;
  BatchNumber: string;
  Category: string;


}
export interface DateOnly {
  year: number;
  month: number;
  day: number;
}
