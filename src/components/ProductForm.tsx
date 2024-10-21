"use client";

import { z } from "zod";
import { QuantityUnit } from "@/lib/types/QuantityUnit";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategoryIndex } from "@/lib/hooks/useCategoryIndex";
import LoadingAddProduct from "@/app/pantry/add/loading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Field, Radio, RadioGroup } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { CATEGORY_ICON } from "@/app/appConstants";
import { QUANTITIES, UNITS } from "@/app/pantry/add/constants";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Product } from "@/lib/types/Product";

const pantryFormSchema = z.object({
  userId: z.string(),
  label: z.string().min(3).max(50),
  categoryId: z.string().min(24), // ObjectId
  quantityUnit: z.nativeEnum(QuantityUnit),
  quantity: z.number().min(1).max(100).describe("toto"),
});

interface ProductFormProps {
  defaultValues?: Product;
  onSubmit: SubmitHandler<Product> | ((params: any) => void);
  isSubmitLoading: boolean;
  isProductCreation: boolean;
}

const ProductForm = ({
  defaultValues,
  onSubmit,
  isSubmitLoading,
  isProductCreation,
}: ProductFormProps) => {
  const [moreQuantity, setMoreQuantity] = useState(false);
  const { categories, isLoadingCategories } = useCategoryIndex();

  const form = useForm<z.infer<typeof pantryFormSchema>>({
    resolver: zodResolver(pantryFormSchema),
    defaultValues: {
      userId: defaultValues?.userId || "",
      label: defaultValues?.label || "",
      categoryId: defaultValues?.categoryId || "",
      quantityUnit: defaultValues?.quantityUnit || QuantityUnit.Piece,
      quantity: defaultValues?.quantity || 1,
    },
  });

  return isLoadingCategories ? (
    <LoadingAddProduct />
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
                {(categories?.data || []).map(
                  (categorie: { id: string; label: string }) => {
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
                            CATEGORY_ICON.find(
                              (c) => c.name === categorie.label
                            )?.icon
                          }
                        </span>
                        <span className="text-sm">{categorie.label}</span>
                      </Radio>
                    );
                  }
                )}
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
                              {
                                "bg-green-600 text-white border-0": checked,
                              }
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
          {isSubmitLoading ? (
            <Loader2 className="animate-spin h-6 w-6 " />
          ) : isProductCreation ? (
            "Ajouter"
          ) : (
            "Enregistrer"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
