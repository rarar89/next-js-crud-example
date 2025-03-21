"use client";

import { useParams, useRouter } from "next/navigation";
import FormProduct from "../../_components/FormProduct";
import { fetcher, updateProduct } from "../../util/api";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import { Product, ProductEditData } from "@/app/types/product";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data, error: fetchError, mutate: mutateProduct, isLoading } = useSWR<Product>(
    id ? `products/${id}` : null,
    fetcher
  );

  const editProductHanlder = async (productData: ProductEditData) => {
    await updateProduct(parseInt(id as string), productData);
    mutateProduct();
    mutate("products");
    router.push("/");
  }

  if (fetchError || !id) {
    return <div className="text-red-400">Error: {fetchError?.message || "Product ID not provided"}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 min-h-screen">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-purple-400">Edit Product</h1>
          <Link 
            href="/"
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded-md transition-colors"
          >
            Back to Products
          </Link>
        </div>
        {isLoading && (
          <div className="w-full max-w-md h-80 bg-gray-700 rounded-lg animate-pulse"></div>
        )}
        {data && (
          <FormProduct 
            product={data}
            onSubmit={editProductHanlder} 
            submitButtonText="Update Product"
          />
        )}
      </div>
    </div>
  );
}
