import { Product, ProductToCreate } from "../types/Product";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import { client } from "@/app/api/[[...route]]/client";
import { AiProduct } from "@/app/pantry/list/preview/AddAiProducts";
import { useCategoryIndex } from "./useCategoryIndex";

const useProductController = ({
  refreshProductList,
}: {
  refreshProductList: () => Promise<void>;
}) => {
  const { categories, isLoadingCategories } = useCategoryIndex();
  const { toast } = useToast();
  const route = useRouter();

  const addProduct = async (product: Product) => {
    try {
      const { data, error } = await client.api.product.add.post(product);
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  const addAiProduct = async (products: AiProduct[]) => {
    try {
      const { data, error } = await client.api.product["ai-add"].post(products);
      console.log({ data, error });
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  const updateProduct = async (product: ProductToCreate) => {
    try {
      const { id, ...productWithoutId } = product;
      const { data, error } = await client.api
        .product({ id: product.id as string })
        .put(productWithoutId);
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  const { mutate: addProductMutation, isPending: isPendingAddProduct } =
    useMutation({
      mutationFn: addProduct,
      onError: (error) => alert(error.message),
      onSuccess: (data) => {
        toast({
          title: "Votre produit a été ajouté.",
          variant: "default",
        });

        route.refresh();
        setTimeout(() => {
          route.push("/pantry/list");
        }, 500);
      },
    });

  const {
    mutate: addAiProductsMutation,
    isPending: isPendingAddAiProductsMutation,
  } = useMutation({
    mutationFn: addAiProduct,
    onError: (error) => console.log(error),
    onSuccess: (data) => {
      toast({
        title: "Vos produits ont été ajoutés avec succés.",
        variant: "default",
      });
    },
  });

  const { mutate: updateProductMutation, isPending: isPendingUpdateProduct } =
    useMutation({
      mutationFn: updateProduct,
      onError: (error) => alert(error.message),
      onSuccess: (data) => {
        toast({
          title: "Votre produit a été mis à jour",
          variant: "default",
        });
        refreshProductList();
      },
    });

  return {
    categories,
    isLoadingCategories,
    addProductMutation,
    addAiProductsMutation,
    isPendingAddAiProductsMutation,
    isPendingAddProduct,
    updateProductMutation,
    isPendingUpdateProduct,
  };
};

export default useProductController;
