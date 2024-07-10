"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const pantryFormSchema = z.object({
  itemName: z.string().min(3).max(50),
  category: z.enum(["Conserves", "Légumes", "Fruits", "Consommables"]),
  quantityUnit: z.enum(["Boîte", "Pièce", "Litre", "Kilogramme"]),
  quantity: z.enum(["1", "2", "3", "4", "More"]),
});

const PantryForm = () => {
  const form = useForm<z.infer<typeof pantryFormSchema>>({
    resolver: zodResolver(pantryFormSchema),
    defaultValues: {
      itemName: "",
      category: undefined,
      quantityUnit: "Pièce",
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
              <FormLabel>Item designation</FormLabel>
              <FormControl>
                <Input placeholder="Tomate" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="single"
                  size={"lg"}
                  variant={"outline"}
                  className="flex flex-wrap"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  onBlur={field.onBlur}
                  disabled={field.disabled}
                >
                  <ToggleGroupItem
                    value="Conserves"
                    aria-label="one item"
                    size={"lg"}
                    color="#0B3B2C"
                  >
                    Conserves
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Légumes"
                    aria-label="two items"
                    size={"lg"}
                  >
                    Légumes
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Fruits"
                    aria-label="three items"
                    size={"lg"}
                  >
                    Fruits
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Consommables"
                    aria-label="four items"
                    size={"lg"}
                  >
                    Consommables
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantityUnit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="single"
                  size={"lg"}
                  variant={"outline"}
                  className="flex flex-wrap"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  onBlur={field.onBlur}
                  disabled={field.disabled}
                >
                  <ToggleGroupItem
                    value="Boîte"
                    aria-label="one item"
                    size={"lg"}
                  >
                    Boîte
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Pièce"
                    aria-label="two items"
                    size={"lg"}
                  >
                    Pièce
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Litre"
                    aria-label="three items"
                    size={"lg"}
                  >
                    Litre
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Kilogramme"
                    aria-label="four items"
                    size={"lg"}
                  >
                    Kilogramme
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ToggleGroup
                  type="single"
                  size={"lg"}
                  variant={"outline"}
                  className="flex flex-wrap"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  onBlur={field.onBlur}
                  disabled={field.disabled}
                >
                  <ToggleGroupItem value="1" aria-label="one item" size={"lg"}>
                    1
                  </ToggleGroupItem>
                  <ToggleGroupItem value="2" aria-label="two items" size={"lg"}>
                    2
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="3"
                    aria-label="three items"
                    size={"lg"}
                  >
                    3
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="4"
                    aria-label="four items"
                    size={"lg"}
                  >
                    4
                  </ToggleGroupItem>

                  <ToggleGroupItem
                    value="More"
                    aria-label="four items"
                    size={"lg"}
                  >
                    More
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="sm:w-fit w-full" size={"lg"}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default PantryForm;
