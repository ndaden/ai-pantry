export const dynamic = "force-dynamic";

import Product from "./product";
import { ProductView } from "@/lib/types/ProductView";
import { revalidatePath } from "next/cache";
import { client } from "@/app/api/[[...route]]/client";
import { getAuthHeaders } from "@/lib/utils";
import { cookies } from "next/headers";
import EmptyProductList from "@/components/EmptyProductList";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const PantryList = async () => {
  const { data } = await client.api.product.list.get({
    fetch: { cache: "no-store", credentials: "same-origin" },
    headers: getAuthHeaders(cookies()),
  });

  const refreshProductList = async () => {
    "use server";

    revalidatePath("/pantry/list");
  };

  const _data: Record<string, ProductView[]> = data;

  const categories = Object.keys(_data);

  return categories && categories.length > 0 ? (
    <div>
      <Link
        href={"/pantry/start"}
        className={buttonVariants({
          size: "lg",
          className: "flex md:hidden w-full my-3",
        })}
      >
        <PlusIcon className="h-4 w-4 mr-2" /> Ajout produits
      </Link>

      {categories.map((category, idx) => (
        <div key={idx}>
          <div className="font-bold my-3">{category}</div>
          {_data[category].map((item: ProductView) => {
            return (
              <Product
                key={item.id}
                product={item}
                refreshProductList={refreshProductList}
              />
            );
          })}
        </div>
      ))}
    </div>
  ) : (
    <EmptyProductList />
  );
};

export default PantryList;
