"use client";

import { SubmitHandler } from "react-hook-form";
import { Product } from "@/lib/types/Product";
import useProductController from "@/lib/hooks/useProductController";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import ProductForm from "@/components/ProductForm";

const AddProduct = ({ user }: { user: KindeUser<any> | null | undefined }) => {
  const { addProductMutation, isPendingAddProduct } = useProductController({
    refreshProductList: () => Promise.resolve(),
  });

  const onSubmit: SubmitHandler<Product> = (product) => {
    addProductMutation({ ...product, userId: user?.id || "" });
  };

  return (
    <ProductForm
      onSubmit={onSubmit}
      isSubmitLoading={isPendingAddProduct}
      isProductCreation={true}
    />
  );
};

export default AddProduct;
