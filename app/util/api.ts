import type { Product, ProductEditData } from "../types/product";

export const apiUrl = 'https://zsktjgscpewgdpdm.apimimic.com';

// Fetcher function for SWR
export const fetcher = async (url: string) => {
  const res = await fetch(`${apiUrl}/${url}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export const createProduct = async (product: ProductEditData): Promise<Product> => {
  const response = await fetch(`${apiUrl}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create product');
  }
  
  return response.json();
}

export const updateProduct = async (id: number, product: ProductEditData): Promise<Product> => {
  const response = await fetch(`${apiUrl}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update product');
  }
  
  return response.json();
}

export const deleteProduct = async (id: number): Promise<boolean> => {
  const response = await fetch(`${apiUrl}/products/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }

  return true;
}
  
  