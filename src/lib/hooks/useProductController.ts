import { client } from "@/app/page";
import { Product } from "../types/Product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const useProductController = () => {
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
          title: "Votre produit a été ajouté",
          variant: "default",
        });
        route.push("/pantry/list");
      },
    });

  return {
    categories,
    isLoadingCategories,
    addProductMutation,
    isPendingAddProduct,
  };
};

export default useProductController;
