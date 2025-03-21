export type ResponseProduct = {
  data: Product[];
}

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
}

export type ProductEditData = Omit<Product, "id">;