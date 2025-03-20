"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { Product, ResponseProduct } from "./types";
import { fetcher, deleteProduct } from "./util/api";

export default function Home() {
  // Using SWR hook instead of useEffect + useState
  const { data, error, isLoading } = useSWR<ResponseProduct>(
    "/products",
    fetcher
  );
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  // Derived products from the data
  const products: Product[] = data?.data || [];

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setIsDeleting(id);
      
      // Optimistic update
      const previousData = data;
      const optimisticData = {
        ...data,
        data: products.filter(product => product.id !== id)
      } as ResponseProduct;
      
      mutate("/products", optimisticData, false);
      
      try {
        await deleteProduct(id);
      } catch {
        // Revert to previous data if deletion fails
        mutate("/products", previousData, false);
        alert("Failed to delete product. Please try again.");
      } finally {
        setIsDeleting(null);
      }
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-400">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-purple-400">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border-t-4 border-purple-500">
            <div className="p-5">
              <h2 className="text-xl font-semibold text-purple-300 mb-2">{product.name}</h2>
              <p className="text-gray-300 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-teal-400">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={isDeleting === product.id}
                  className={`${
                    isDeleting === product.id
                      ? "bg-gray-600"
                      : "bg-red-600 hover:bg-red-700"
                  } text-white px-3 py-1 rounded-md transition-colors`}
                >
                  {isDeleting === product.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
