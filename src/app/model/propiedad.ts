import { Ipropiedadbase } from "./ipropiedadbase";

export class Propiedad implements Ipropiedadbase{

  Id!: number;
  SellRent!: number;
  Name!: string;
  PType!: string;
  Price!: number;
  BuiltArea!: number;
  Address!: string;
  City!: string;
  Maintenance?: number;
  ImageUrl!: string;
  Description!: string;
  PostedOn!: string;
  PostedBy!: number;
}
