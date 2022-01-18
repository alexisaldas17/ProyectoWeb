import { Fotos } from './fotos';
import { Ipropiedadbase } from './ipropiedadbase';

export interface Ipropiedad extends Ipropiedadbase {
  Id: number;
  SellRent: number;
  Name: string;
  TPropiedad: string;
  Price: number;
  BuiltArea: number;
  Address: string;
  //CityId { get; set; }
  Ciudad: string;
  Fotos: Fotos[];
  //FotoId { get; set; }
  Description: string;
  PostedOn: string;
  UserId: number;
  // UserName { get; set; }
  Latitud: number;
  Longitud: number;
}
