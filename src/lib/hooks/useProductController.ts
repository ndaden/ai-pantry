import { Product } from "../types/Product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { AiProduct } from "@/app/pantry/list/preview/page";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { client } from "@/app/api/[[...route]]/client";

const useProductController = ({
  refreshProductList,
}: {
  refreshProductList: () => Promise<void>;
}) => {
  const { toast } = useToast();
  const route = useRouter();
  const { getUser } = useKindeAuth();

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

  const addAiProduct = async (product: AiProduct[]) => {
    const user = getUser();
    const productsToAdd = product.map((p) => ({
      ...p,
      userId: user?.id || "",
    }));
    try {
      const { data, error } = await client.api.product["ai-add"].post(
        productsToAdd
      );
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  const updateProduct = async (product: Product) => {
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

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => client.api.category.list.get(),
  });

  const { mutate: addProductMutation, isPending: isPendingAddProduct } =
    useMutation({
      mutationFn: addProduct,
      onError: (error) => alert(error.message),
      onSuccess: (data) => {
        toast({
          title: "Votre produit a été ajouté.",
          variant: "default",
        });
        route.push("/pantry/list");
      },
    });

  const {
    mutate: addAiProductsMutation,
    isPending: isPendingAddAiProductsMutation,
  } = useMutation({
    mutationFn: addAiProduct,
    onError: (error) => alert(error.message),
    onSuccess: (data) => {
      toast({
        title: "Vos produits ont été ajoutés avec succés.",
        variant: "default",
      });
      route.push("/pantry/list");
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
