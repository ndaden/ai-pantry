"use client";

import { client } from "@/app/api/[[...route]]/client";
import Dialog from "@/components/Dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useProductController from "@/lib/hooks/useProductController";
import { ProductView } from "@/lib/types/ProductView";
import { ChevronDownIcon } from "lucide-react";

const Product = ({
  product,
  refreshProductList,
}: {
  product: ProductView;
  refreshProductList: () => Promise<void>;
}) => {
  const { updateProductMutation, isPendingUpdateProduct } =
    useProductController({ refreshProductList });

  const addQuantityHandler = (product: ProductView) => {
    updateProductMutation({
      id: product.id,
      categoryId: product.categoryId,
      label: product.label,
      quantity: product.quantity + 1,
      quantityUnit: product.quantityUnit,
      userId: product.userId,
    });
  };

  const deleteProductHandler = (id: string) => {
    client.api.product({ id }).delete();
    refreshProductList();
  };

  const subtractQuantityHandler = (product: ProductView) => {
    if (product.quantity > 1) {
      updateProductMutation({
        id: product.id,
        categoryId: product.categoryId,
        label: product.label,
        quantity: product.quantity - 1,
        quantityUnit: product.quantityUnit,
        userId: product.userId,
      });
    }
  };
  return (
    <Card key={product.id} className="relative my-1 p-0 bg-green-100/50">
      <CardHeader className="flex flex-row justify-between items-center p-3">
        <div>
          <CardTitle>{product.label}</CardTitle>
          <CardDescription>
            {product.quantity} {product.quantityUnit}
          </CardDescription>
        </div>
        <div className="flex gap-1">
          <Button
            variant={"ghost"}
            className="text-3xl p-2"
            onClick={() => subtractQuantityHandler(product)}
          >
            -
          </Button>
          <Button
            variant={"ghost"}
            className="text-3xl p-2"
            onClick={() => addQuantityHandler(product)}
          >
            +
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} className="p-2">
                <ChevronDownIcon size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="p-0" asChild>
                <Dialog
                  message="Voulez vous vraiment supprimer"
                  onConfirm={() => deleteProductHandler(product.id)}
                >
                  <Button className="w-full">Supprimer</Button>
                </Dialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
    </Card>
  );
};

export default Product;
