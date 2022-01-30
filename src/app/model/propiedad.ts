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
  sellRent!: number;
  pType!: string;
  direccion!: string;
  fotos!: Ifotos[];
  años!: number;
  userId!: number | undefined;
  userName!:string;
  postedOn!: string;
  postedBy!: number;
  latitud!:number;
  longitud!:number;
  /**
   *
   */
  constructor() {


  }
}
