"use client";

import { client } from "@/app/api/[[...route]]/client";
import SwipeableCard from "@/components/SwipeableCard";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useLongPress } from "@/lib/hooks/useLongPress";
import useProductController from "@/lib/hooks/useProductController";
import { ProductView } from "@/lib/types/ProductView";
import { CheckIcon, XIcon } from "lucide-react";
import React, { useRef, useState } from "react";

const Product = ({
  product,
  refreshProductList,
}: {
  product: ProductView;
  refreshProductList: () => Promise<void>;
}) => {
  const productRef = useRef();
  const { hasPressed, setHasPressed } = useLongPress({
    element: productRef.current,
    duration: 2000,
  });

  const [isPendingDeleteProduct, setIsPendingDeleteProduct] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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

  const deleteProductHandler = async (id: string) => {
    setIsPendingDeleteProduct(true);
    await client.api.product({ id }).delete();
    await refreshProductList();
    setIsPendingDeleteProduct(false);
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

  const [editLabel, setEditLabel] = useState<boolean>(false);
  const [newProductLabel, setNewProductLabel] = useState<string>("");

  const saveNewProductLabelHandler = (product: ProductView) => {
    updateProductMutation({
      id: product.id,
      categoryId: product.categoryId,
      label: newProductLabel,
      quantity: product.quantity,
      quantityUnit: product.quantityUnit,
      userId: product.userId,
    });
    setEditLabel(false);
  };

  return isPendingDeleteProduct || isPendingUpdateProduct ? (
    <div className="mx-1 my-3">
      <Skeleton className="h-10 w-[100%]"></Skeleton>
    </div>
  ) : (
    <SwipeableCard
      ref={productRef}
      key={product.id}
      className="relative my-1 p-0 bg-green-100"
      onSwipeLeft={() => setShowDeleteDialog(true)}
    >
      <CardHeader className="flex flex-row justify-between items-center p-3">
        <div>
          <CardTitle>
            {editLabel ? (
              <div className="flex space-x-0">
                <Input
                  className="bg-white"
                  defaultValue={product.label}
                  onChange={(e) => setNewProductLabel(e.target.value)}
                />
                <Button
                  disabled={!newProductLabel}
                  size={"sm"}
                  variant={"link"}
                  className="text-green-600 px-2"
                  onClick={() => saveNewProductLabelHandler(product)}
                >
                  <CheckIcon className="h-4 w-4" />
                </Button>
                <Button
                  size={"sm"}
                  variant={"link"}
                  className="text-red-600 px-2"
                  onClick={() => setEditLabel(false)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant={"link"}
                className="text-black decoration-dotted underline p-0"
                onClick={() => setEditLabel(true)}
              >
                {product.label}
              </Button>
            )}
          </CardTitle>
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
        </div>
      </CardHeader>
      <Dialog
        open={showDeleteDialog}
        onOpenChange={(isOpen) => setShowDeleteDialog(isOpen)}
      >
        <DialogContent aria-description="delete product confirmation">
          <DialogTitle>Voulez-vous vraiment supprimer ce produit ?</DialogTitle>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"}>Annuler</Button>
            </DialogClose>
            <Button onClick={() => deleteProductHandler(product.id)}>
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={hasPressed}
        onOpenChange={() => {
          setHasPressed(false);
        }}
      >
        <DialogContent aria-description="edit product properties">
          <DialogTitle>Modifier : {product.label}</DialogTitle>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"}>Annuler</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SwipeableCard>
  );
};

export default Product;
