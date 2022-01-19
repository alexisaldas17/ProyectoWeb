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
  Fotos!: Ifotos[];
  Description!: string;
  Años!: number;
  PostedOn!: string;
  PostedBy!: number;
}
