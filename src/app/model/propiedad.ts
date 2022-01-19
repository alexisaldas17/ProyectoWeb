import { Fotos } from "./fotos";
import { Ifotos } from "./ifotos";
import { IpropiedadCard } from "./ipropiedad-card";
import { Ipropiedadbase } from "./ipropiedadbase";

export class Propiedad implements IpropiedadCard{
  idPropiedad!: number;
  nombre!: string;
  ciudad!: string;
  precio!: number;
  areaM2!: number;
  descripcion!: string;
  imagenUrl: any;

  SellRent!: number;
  PType!: string;
  Direccion!: string;
  Fotos!: Ifotos[];
  Años!: number;
  PostedOn!: string;
  PostedBy!: number;
}
