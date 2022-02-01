export interface Ifotos {
  id?: number;
  isPrimary?: boolean;
  imagenUrl:string;
  title?: {
    first: string,
    second: string
  },
  subtitle?: string;
  link?: string;
  //image: string;
  order?: number;
  marginLeft?: number;
}
