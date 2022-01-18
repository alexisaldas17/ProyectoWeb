import { Fotos } from "./fotos";
import { Ifotos } from "./ifotos";
import { Ipropiedadbase } from "./ipropiedadbase";

export class Propiedad implements Ipropiedadbase{
  ImageUrl: any;

  Id!: number;
  SellRent!: number;
  Name!: string;
  PType!: string;
  Price!: number;
  BuiltArea!: number;
  Address!: string;
  City!: string;
  Maintenance?: number;
  Fotos!: Ifotos[];
  Description!: string;
  PostedOn!: string;
  PostedBy!: number;
}
