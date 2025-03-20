import { startTransition, useActionState } from "react";
import { deleteProduct } from "../util/api";
import { mutate } from "swr";

const DeleteControl = ({ productId }: { productId: number }) => {

  const [deleteError, performDelete, isDeletingProduct] = useActionState(
    async (previousState: string | null, id: number) => {
      
      try {
        await deleteProduct(id);
        return null;
      } catch {
        return "Failed to delete product. Please try again.";
      } finally {
        mutate('products');
      }
    },
    null,
  );

  return (
    <>
      {deleteError && (
          <div className="bg-red-500 text-white p-3 rounded-md mb-4 mx-auto max-w-md">
            {deleteError}
          </div>
        )}
      <button
        onClick={() => {
          if (!confirm("Are you sure you want to delete this product?")) {
            return null;
          }
          startTransition(() => performDelete(productId));
        }}
        disabled={isDeletingProduct}
        className={`${
          isDeletingProduct
            ? "bg-gray-600"
            : "bg-red-400 hover:bg-red-500"
        } text-white px-3 py-1 rounded-md transition-colors`}
      >
        {isDeletingProduct ? "Deleting..." : "Delete"}
      </button>
    </>
  );
};

export default DeleteControl;


