"use client";

import { Button } from "@/components/ui/button";
import AiSuggestedProduct from "./aiSuggestedProduct";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export interface AiProduct {
  label: string;
  category: string;
  quantity: number;
  quantityUnit: string;
}

const ProductListPreview = () => {
  const route = useRouter();
  const { toast } = useToast();
  const aiData = sessionStorage.getItem("ai-data");

  const handleValidateAndAdd = () => {
    sessionStorage.removeItem("ai-data");
    toast({
      title: "Produits ajoutés à votre liste",
    });
    route.push("/pantry/list");
  };

  if (aiData && JSON.parse(aiData)) {
    const aiSuggestedProducts: AiProduct[] = JSON.parse(aiData);
    return (
      <div>
        <div>Produits suggérés :</div>
        {aiSuggestedProducts.map((aiProduct) => {
          return (
            <AiSuggestedProduct key={aiProduct.label} product={aiProduct} />
          );
        })}
        <Button onClick={handleValidateAndAdd} className="w-full my-4">
          Valider et ajouter les produits
        </Button>
      </div>
    );
  } else {
    return <div>No data to preview</div>;
  }
};

export default ProductListPreview;
