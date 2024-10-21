import { client } from "@/app/api/[[...route]]/client";
import { useQuery } from "@tanstack/react-query";

export const useCategoryIndex = () => {
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => client.api.category.list.get(),
  });

  return { categories, isLoadingCategories };
};
