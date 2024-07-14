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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Field, Radio, RadioGroup } from "@headlessui/react";
import { cn } from "@/lib/utils";
import {
  CarrotIcon,
  CherryIcon,
  DatabaseIcon,
  Grid2X2Icon,
} from "lucide-react";

const pantryFormSchema = z.object({
  itemName: z.string().min(3).max(50),
  category: z.enum(["conserves", "legumes", "fruits", "consomables"]),
  quantityUnit: z.enum(["boite", "piece", "litre", "kilogramme"]),
  quantity: z.enum(["1", "2", "3", "4", "more"]),
});

const PantryForm = () => {
  const CATEGORIES = [
    {
      id: "categorie-1",
      name: "Consomables",
      value: "consomables",
      icon: <Grid2X2Icon className="w-5 h-5" />,
    },
    {
      id: "categorie-2",
      name: "Conserves",
      value: "conserves",
      icon: <DatabaseIcon size={20} />,
    },
    {
      id: "categorie-3",
      name: "Fruits",
      value: "fruits",
      icon: <CherryIcon size={20} />,
    },
    {
      id: "categorie-4",
      name: "Légumes",
      value: "legumes",
      icon: <CarrotIcon size={20} />,
    },
  ] as const;

  const UNITS = [
    { id: "unit-1", name: "Kilogramme", value: "kilogramme" },
    { id: "unit-2", name: "Litre", value: "litre" },
    { id: "unit-3", name: "Boîte", value: "boite" },
    { id: "unit-4", name: "Pièce", value: "piece" },
  ] as const;

  const QUANTITIES = [
    { id: "q-1", name: "1", value: "1" },
    { id: "q-2", name: "2", value: "2" },
    { id: "q-3", name: "3", value: "3" },
    { id: "q-4", name: "4", value: "4" },
    { id: "q-5", name: "Plus", value: "more" },
  ] as const;

  const form = useForm<z.infer<typeof pantryFormSchema>>({
    resolver: zodResolver(pantryFormSchema),
    defaultValues: {
      itemName: "",
      category: undefined,
      quantityUnit: "piece",
      quantity: undefined,
    },
  });

  const onSubmit = (v) => {
    console.log(JSON.stringify(v, null, 2));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="itemName"
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
          name="category"
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormLabel className="">Catégorie</FormLabel>
              <Field className="flex flex-wrap justify-center gap-3 mt-5">
                {CATEGORIES.map((categorie) => {
                  return (
                    <Radio
                      key={categorie.id}
                      value={categorie.value}
                      className={({ checked, hover }) =>
                        cn(
                          "flex items-center transition relative p-3 w-fit shadow-xl rounded-2xl border border-zinc-400",
                          { "border-black": hover },
                          { "bg-green-600 text-white border-0": checked }
                        )
                      }
                    >
                      <span className="mr-2">{categorie.icon}</span>
                      <span className="text-sm">{categorie.name}</span>
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
                      key={unit.id}
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
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <RadioGroup {...field}>
              <Field className="flex flex-wrap justify-center gap-3 mt-5">
                {QUANTITIES.map((quantity) => {
                  return (
                    <Radio
                      key={quantity.id}
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
        <Button type="submit" className="sm:w-fit w-full" size={"lg"}>
          Ajouter
        </Button>
      </form>
    </Form>
  );
};

export default PantryForm;
