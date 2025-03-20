"use client";

import { useState, useEffect } from "react";
import { Product } from "../types";

interface FormProductProps {
  product?: Product;
  onSubmit: (product: Omit<Product, "id">) => Promise<void>;
  isSubmitting?: boolean;
  submitButtonText?: string;
}

export default function FormProduct({
  product,
  onSubmit,
  isSubmitting = false,
  submitButtonText = "Save Product",
}: FormProductProps) {
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    description: "",
  });

  // If product is provided (edit mode), populate the form
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await onSubmit(formData);
      
      // If this is a create form (no product prop), reset the form
      if (!product) {
        setFormData({
          name: "",
          price: 0,
          description: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-purple-300 mb-2">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
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
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          min="0"
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
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`w-full p-2 bg-gray-700 border rounded-md text-white border-gray-600`}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-purple-800 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : submitButtonText}
      </button>
    </form>
  );
}
