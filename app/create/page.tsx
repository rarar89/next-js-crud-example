"use client";

import { useRouter } from "next/navigation";
import FormProduct from "../_components/FormProduct";
import { createProduct } from "../util/api";
import Link from "next/link";
import type { ProductEditData } from "../types/product";
import { mutate } from "swr";

export default function NewProductPage() {
  const router = useRouter();
  
  const createProductHandler = async (product: ProductEditData) => {
    await createProduct(product);
    mutate("products");
    router.push("/");
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 min-h-screen">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-purple-400">Add New Product</h1>
          <Link 
            href="/"
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded-md transition-colors"
          >
            Back to Products
          </Link>
        </div>
        
        <FormProduct 
          onSubmit={createProductHandler} 
          submitButtonText="Create Product"
        />
      </div>
    </div>
  );
}
