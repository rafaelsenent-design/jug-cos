export interface ApiResponseCosmeticos {
  cosmeticos: dataApi
}

export interface dataApi {
  info: Info
  cosmeticos: Cosmetico[]
}

export interface Info {
  total: number
  pages: number
}

export interface Cosmetico {
  _id: string
  name: string
  image: string
  type: string
  brand: string
  price: number
}

export interface ApiResponseMessage {
  message: string
}

export interface ApiResponseGetJuguetes {
  juguetes: Juguete[]
}

export interface Juguete {
  _id?: string;
  nombre: string;
  imagen: string;
  categoria: string;
  edadMinima: number;
  precio: number;
}

export interface Toast{
  text: string;
  className: string;
}
