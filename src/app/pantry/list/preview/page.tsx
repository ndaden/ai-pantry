"use client";

import { Button } from "@/components/ui/button";
import AiSuggestedProduct from "./aiSuggestedProduct";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { SESSION_STORAGE_AI_DATA_KEY } from "@/app/appConstants";

export interface AiProduct {
  id?: string;
  label: string;
  category: string;
  quantity: number;
  quantityUnit: string;
}

const ProductListPreview = () => {
  const route = useRouter();
  const { toast } = useToast();

  const aiData: AiProduct[] = JSON.parse(
    sessionStorage.getItem(SESSION_STORAGE_AI_DATA_KEY) || "[]"
  );

  const handleValidateAndAdd = () => {
    sessionStorage.removeItem(SESSION_STORAGE_AI_DATA_KEY);
    toast({
      title: "Produits ajoutés à votre liste",
    });
    route.push("/pantry/list");
  };

  const updateAiData = (aiProducts: AiProduct[]) => {
    sessionStorage.setItem(
      SESSION_STORAGE_AI_DATA_KEY,
      JSON.stringify(aiProducts)
    );
  };

  const onAddQuantity = (product: AiProduct) => {
    const productIndex = aiData.findIndex((p) => p.id === product.id);

    aiData[productIndex] = {
      ...aiData[productIndex],
      quantity: Number(aiData[productIndex].quantity) + 1,
    };

    updateAiData(aiData);
  };

  const onSubstractQuantity = (product: AiProduct) => {};
  const onDeleteProduct = (product: AiProduct) => {};

  return (
    <div>
      <div>Produits suggérés :</div>
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
        Valider et ajouter les produits
      </Button>
    </div>
  );
};

export default ProductListPreview;
