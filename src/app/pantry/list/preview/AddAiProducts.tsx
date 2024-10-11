"use client";

import { Button } from "@/components/ui/button";
import AiSuggestedProduct from "./aiSuggestedProduct";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { SESSION_STORAGE_AI_DATA_KEY } from "@/app/appConstants";
import { useSessionStorage } from "@/lib/hooks/useSessionStorage";
import useProductController from "@/lib/hooks/useProductController";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

export interface AiProduct {
  id?: string;
  userId: string;
  label: string;
  category: string;
  quantity: number;
  quantityUnit: string;
}

const AddAiProducts = ({ user }: { user: KindeUser<any> | null }) => {
  const { addAiProductsMutation } = useProductController({
    refreshProductList: () => Promise.resolve(),
  });

  const route = useRouter();
  const { toast } = useToast();

  const [aiData, setAiData, removeAiData] = useSessionStorage<AiProduct[]>(
    SESSION_STORAGE_AI_DATA_KEY,
    []
  );

  const handleValidateAndAdd = async () => {
    const aiProductsToAdd = aiData.map((product) => ({
      ...product,
      userId: user?.id || "",
    }));

    addAiProductsMutation(aiProductsToAdd);
    removeAiData();
    toast({
      title: "Produits ajoutés à votre liste",
    });
    route.push("/pantry/list");
  };

  const onAddQuantity = (product: AiProduct) => {
    const productIndex = aiData.findIndex((p) => p.id === product.id);

    aiData[productIndex] = {
      ...aiData[productIndex],
      quantity: Number(aiData[productIndex].quantity) + 1,
    };

    setAiData(aiData);
  };

  const onSubstractQuantity = (product: AiProduct) => {
    const productIndex = aiData.findIndex((p) => p.id === product.id);

    aiData[productIndex] = {
      ...aiData[productIndex],
      quantity: Number(aiData[productIndex].quantity) - 1,
    };

    setAiData(aiData);
  };
  const onDeleteProduct = (product: AiProduct) => {
    setAiData(aiData.filter((p) => p.id != product.id));
  };

  return (
    <div>
      <div className="my-6 font-semibold flex justify-center">
        Suggested products
      </div>
      {aiData.map((aiProduct) => {
        return (
          <AiSuggestedProduct
            key={aiProduct.id}
            product={aiProduct}
            onAddQuantity={onAddQuantity}
            onSubtractQuantity={onSubstractQuantity}
            onDeleteProduct={onDeleteProduct}
          />
        );
      })}
      <Button onClick={handleValidateAndAdd} className="w-full my-4">
        Add products
      </Button>
    </div>
  );
};

export default AddAiProducts;
