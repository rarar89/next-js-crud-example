"use client";

import useSWR from "swr";
import type { Product, ResponseProduct } from "./types/product";
import { fetcher } from "./util/api";
import Link from "next/link";
import DeleteControl from "./_components/DeleteControl";

export default function Home() {
  // Using SWR hook instead of useEffect + useState
  const { data, error, isLoading } = useSWR<ResponseProduct>(
    "products",
    fetcher
  );

  // Derived products from the data
  const products: Product[] = data?.data || [];

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-400">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-purple-400">Products</h1>
      
      <div className="flex justify-center">
        <Link href="/create" className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-1 rounded-md mb-4 inline-block">Create Product</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border-t-4 border-purple-500">
            <div className="p-5">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-purple-300 mb-2">{product.name}</h2>
                <Link href={`/edit/${product.id}`}>Edit</Link>
              </div>
              <p className="text-gray-300 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-teal-400">${product.price.toFixed(2)}</p>
                <DeleteControl productId={product.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
