"use client";

import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon, SparklesIcon, XIcon } from "lucide-react";
import { AiProduct } from "./AddAiProducts";
import SwipeableCard from "@/components/SwipeableCard";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const AiSuggestedProduct = ({
  product,
  onAddQuantity,
  onSubtractQuantity,
  onDeleteProduct,
  onEditProductLabel,
}: {
  product: AiProduct;
  onAddQuantity: (p: AiProduct) => void;
  onSubtractQuantity: (p: AiProduct) => void;
  onDeleteProduct: (p: AiProduct) => void;
  onEditProductLabel: (p: AiProduct, newLabel: string) => void;
}) => {
  const [editLabel, setEditLabel] = useState<boolean>(false);
  const [newProductLabel, setNewProductLabel] = useState<string>("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  return (
    <SwipeableCard className="relative my-1 p-0 bg-green-100/50">
      <CardHeader className="flex flex-row justify-between items-center p-3">
        <div>
          <CardTitle>
            <SparklesIcon className="h-4 w-4 inline mr-3 text-zinc-400" />
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
                  onClick={() => {
                    onEditProductLabel(product, newProductLabel);
                    setEditLabel(false);
                  }}
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
            - {product.category}
          </CardTitle>
          <CardDescription className="ml-8 mt-3">
            {product.quantity} {product.quantityUnit}
          </CardDescription>
        </div>
        <div className="flex gap-1">
          <Button
            variant={"ghost"}
            className="text-3xl p-2"
            onClick={() => onSubtractQuantity(product)}
          >
            -
          </Button>
          <Button
            variant={"ghost"}
            className="text-3xl p-2"
            onClick={() => onAddQuantity(product)}
          >
            +
          </Button>
        </div>
      </CardHeader>
      <Dialog
        open={showDeleteDialog}
        onOpenChange={(isOpen) => setShowDeleteDialog(isOpen)}
      >
        <DialogContent>
          <div>Voulez-vous vraiment supprimer ce produit ?</div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"}>Annuler</Button>
            </DialogClose>
            <Button onClick={() => onDeleteProduct(product)}>Confirmer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SwipeableCard>
  );
};

export default AiSuggestedProduct;
