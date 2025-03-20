export interface ResponseProduct {
  data: Product[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}