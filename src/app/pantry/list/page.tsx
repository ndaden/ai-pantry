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

const PantryList = () => {
  const { toast } = useToast();
  const ITEMS = [
    {
      id: "1",
      label: "Lait de coco en conserve avec huile de palme",
      category: "Consomables",
      quantityUnit: "Pièce",
      quantity: 1,
    },
    {
      id: "2",
      label: "Tomate cerise",
      category: "Consomables",
      quantityUnit: "Kg",
      quantity: 2,
    },
    {
      id: "3",
      label: "Eau",
      category: "Consomables",
      quantityUnit: "L",
      quantity: 5,
    },
    {
      id: "4",
      label: "Poudre de coco",
      category: "Consomables",
      quantityUnit: "Boîtes",
      quantity: 6,
    },
    {
      id: "5",
      label: "Thon",
      category: "Consomables",
      quantityUnit: "Pièces",
      quantity: 10,
    },
  ];

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
    <div>
      {ITEMS.map((item) => {
        return (
          <Card key={item.id} className="relative my-1 p-0 bg-green-100/50">
            <CardHeader className="flex flex-row justify-between items-center p-3">
              <div>
                <CardTitle>{item.label}</CardTitle>
                <CardDescription>
                  {item.quantity} {item.quantityUnit}
                </CardDescription>
              </div>
              <div className="flex gap-1">
                <Button
                  variant={"ghost"}
                  className="text-3xl p-2"
                  onClick={() =>
                    subtractQuantityHandler(item.label, item.quantityUnit)
                  }
                >
                  -
                </Button>
                <Button
                  variant={"ghost"}
                  className="text-3xl p-2"
                  onClick={() =>
                    addQuantityHandler(item.label, item.quantityUnit)
                  }
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
                      <Dialog message="Voulez vous vraiment supprimer">
                        <Button>Supprimer</Button>
                      </Dialog>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
};

export default PantryList;
