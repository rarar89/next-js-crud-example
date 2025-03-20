"use client";

import { useActionState } from "react";
import type { ProductEditData } from "../types/product";

interface FormProductProps {
  product?: ProductEditData;
  onSubmit: (product: ProductEditData) => Promise<void>; 
  submitButtonText?: string;
}

export default function FormProduct({
  product,
  onSubmit,
  submitButtonText = "Save Product",
}: FormProductProps) {

  const [error, submitProduct, isPending] = useActionState<string | null, FormData>(
    async (previousState, formData) => {

      try {
        await onSubmit({
          name: (formData.get('name') as string) ?? '',
          price: parseFloat(formData.get('price') !== "" ? formData.get('price') as string : '0'),
          description: (formData.get('description') as string) ?? '',
        });
        return null;
      } catch {
        return "Failed to create product. Please try again.";
      }
    },
    null,
  );

  if(error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <form action={submitProduct} className="bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-purple-300 mb-2">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={product?.name || ''}
          className={`w-full p-2 bg-gray-700 border rounded-md text-white border-gray-600`}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-purple-300 mb-2">
          Price ($)
        </label>
        <input
          type="number"
          id="price"
          name="price"
          step="0.01"
          min="0"
          defaultValue={product?.price.toString() || 0}
          className={`w-full p-2 bg-gray-700 border rounded-md text-white border-gray-600`}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="description" className="block text-purple-300 mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={product?.description || ''}
          className={`w-full p-2 bg-gray-700 border rounded-md text-white border-gray-600`}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-purple-800 disabled:cursor-not-allowed"
      >
        {isPending ? "Submitting..." : submitButtonText}
      </button>
    </form>
  );
}
