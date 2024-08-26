"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Field, Radio, RadioGroup } from "@headlessui/react";
import { cn } from "@/lib/utils";
import {
  CarrotIcon,
  CherryIcon,
  DatabaseIcon,
  Grid2X2Icon,
  Loader2,
} from "lucide-react";
import { QuantityUnit } from "@/lib/types/QuantityUnit";
import { Product } from "@/lib/types/Product";
import { useState } from "react";
import { QUANTITIES, UNITS } from "./constants";
import useProductController from "@/lib/hooks/useProductController";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const pantryFormSchema = z.object({
  userId: z.string(),
  label: z.string().min(3).max(50),
  categoryId: z.string().min(24), // ObjectId
  quantityUnit: z.nativeEnum(QuantityUnit),
  quantity: z.number().min(1).max(100).describe("toto"),
});

const CATEGORY_ICON = [
  {
    name: "Consommables",
    icon: <Grid2X2Icon className="w-5 h-5" />,
  },
  {
    name: "Conserves",
    icon: <DatabaseIcon size={20} />,
  },
  {
    name: "Fruits",
    icon: <CherryIcon size={20} />,
  },
  {
    name: "Légumes",
    icon: <CarrotIcon size={20} />,
  },
] as const;

const PantryForm = () => {
  const { user } = useKindeBrowserClient();
  const [moreQuantity, setMoreQuantity] = useState(false);

  const {
    addProductMutation,
    isPendingAddProduct,
    categories,
    isLoadingCategories,
  } = useProductController({ refreshProductList: () => Promise.resolve() });

  const form = useForm<z.infer<typeof pantryFormSchema>>({
    resolver: zodResolver(pantryFormSchema),
    defaultValues: {
      userId: "",
      label: "",
      categoryId: "",
      quantityUnit: QuantityUnit.Piece,
      quantity: 1,
    },
  });

  const onSubmit: SubmitHandler<Product> = (product) => {
    addProductMutation({ ...product, userId: user?.id || "" });
  };

  return isLoadingCategories ? (
    <div className="flex-1 flex flex-col items-center justify-center">
      <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2" />
    </div>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Libellé</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tomate"
                  className="h-12 text-lg"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormLabel className="">Catégorie</FormLabel>
              <Field className="flex flex-wrap justify-center gap-3 mt-5">
                {(categories?.data || []).map((categorie) => {
                  return (
                    <Radio
                      key={categorie.id}
                      value={categorie.id}
                      className={({ checked, hover }) =>
                        cn(
                          "flex items-center transition relative p-3 w-fit shadow-xl rounded-2xl border border-zinc-400",
                          { "border-black": hover },
                          { "bg-green-600 text-white border-0": checked }
                        )
                      }
                    >
                      <span className="mr-2">
                        {
                          CATEGORY_ICON.find((c) => c.name === categorie.label)
                            ?.icon
                        }
                      </span>
                      <span className="text-sm">{categorie.label}</span>
                    </Radio>
                  );
                })}
              </Field>
            </RadioGroup>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="quantityUnit"
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormLabel>Quantité</FormLabel>
              <Field className="flex flex-wrap justify-center gap-3 mt-5">
                {UNITS.map((unit) => {
                  return (
                    <Radio
                      key={unit.name}
                      value={unit.value}
                      className={({ checked, hover }) =>
                        cn(
                          "flex items-center transition relative p-3 w-fit shadow-xl rounded-2xl border border-zinc-400",
                          { "border-black": hover },
                          { "bg-green-600 text-white border-0": checked }
                        )
                      }
                    >
                      <span className="text-sm">{unit.name}</span>
                    </Radio>
                  );
                })}
              </Field>
            </RadioGroup>
          )}
        ></FormField>
        <div className="flex justify-center items-baseline">
          {!moreQuantity && (
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <RadioGroup {...field}>
                  <Field className="flex flex-wrap justify-center gap-3 mt-5">
                    {QUANTITIES.map((quantity) => {
                      return (
                        <Radio
                          key={quantity.value}
                          value={quantity.value}
                          className={({ checked, hover }) =>
                            cn(
                              "flex items-center transition relative p-3 w-fit shadow-xl rounded-2xl border border-zinc-400",
                              { "border-black": hover },
                              { "bg-green-600 text-white border-0": checked }
                            )
                          }
                        >
                          <span className="text-sm">{quantity.name}</span>
                        </Radio>
                      );
                    })}
                  </Field>
                </RadioGroup>
              )}
            ></FormField>
          )}
          {moreQuantity && (
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Saisir la quantité"
                      className="h-10 text-lg shadow-lg border-zinc-400 w-14 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      type="number"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      onBlur={field.onBlur}
                      value={Number.parseInt(`${field.value}`)}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button
            type="button"
            onClick={() => {
              setMoreQuantity((prev) => !prev);
            }}
            variant={"outline"}
            className="ml-3 h-13 py-3 border rounded-2xl border-zinc-400 shadow-lg"
          >
            {moreQuantity ? "x" : "Plus"}
          </Button>
        </div>

        <Button type="submit" className="sm:w-fit w-full" size={"lg"}>
          Ajouter
        </Button>
      </form>
    </Form>
  );
};

export default PantryForm;
