"use client";

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
import { useToast } from "@/components/ui/use-toast";
import { ChevronDownIcon } from "lucide-react";
import { AiProduct } from "./page";

const AiSuggestedProduct = ({ product }: { product: AiProduct }) => {
  const { toast } = useToast();

  const addQuantityHandler = (label: string, unit: string) => {
    toast({
      title: `${label}: 1 ${unit} ajouté !`,
      variant: "default",
    });
  };

  const subtractQuantityHandler = (label: string, unit: string) => {
    toast({
      title: `${label}: 1 ${unit} supprimé !`,
      variant: "default",
    });
  };
  return (
    <Card className="relative my-1 p-0 bg-green-100/50">
      <CardHeader className="flex flex-row justify-between items-center p-3">
        <div>
          <CardTitle>
            {product.label} - {product.category}
          </CardTitle>
          <CardDescription>
            {product.quantity} {product.quantityUnit}
          </CardDescription>
        </div>
        <div className="flex gap-1">
          <Button
            variant={"ghost"}
            className="text-3xl p-2"
            onClick={() => subtractQuantityHandler(product.label, " pieces")}
          >
            -
          </Button>
          <Button
            variant={"ghost"}
            className="text-3xl p-2"
            onClick={() => addQuantityHandler(product.label, " pieces")}
          >
            +
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="">
              <Button variant={"ghost"} className="p-2">
                <ChevronDownIcon size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Dialog
                  message="Voulez vous vraiment supprimer"
                  onConfirm={() => {}}
                >
                  <Button>Supprimer</Button>
                </Dialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
    </Card>
  );
};

export default AiSuggestedProduct;
