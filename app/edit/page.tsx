"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FormProduct from "../_components/FormProduct";
import { fetcher, updateProduct } from "../util/api";
import Link from "next/link";
import { Product } from "../types";
import useSWR from "swr";

export default function EditProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch the product data
  const { data, error, isLoading } = useSWR<Product>(
    productId ? `/products/${productId}` : null,
    fetcher
  );

  const handleSubmit = async (productData: Omit<Product, "id">) => {
    if (!productId) return;
    
    setIsSubmitting(true);
    try {
      await updateProduct(parseInt(productId), productData);
      router.push("/");
    } catch {
      alert("Failed to update product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading product data...</div>;
  }

  if (error || !productId) {
    return <div className="text-red-400">Error: {error?.message || "Product ID not provided"}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 min-h-screen">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-purple-400">Edit Product</h1>
          <Link 
            href="/"
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Back to Products
          </Link>
        </div>
        
        {data && (
          <FormProduct 
            product={data}
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting}
            submitButtonText="Update Product"
          />
        )}
      </div>
    </div>
  );
}
