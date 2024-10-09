import Product from "./product";
import { ProductView } from "@/lib/types/ProductView";
import { revalidatePath } from "next/cache";
import { client } from "@/app/api/[[...route]]/client";
import { getAuthHeaders } from "@/lib/utils";
import { cookies } from "next/headers";
import EmptyProductList from "@/components/EmptyProductList";

const PantryList = async () => {
  const { data } = await client.api.product.list.get({
    fetch: { cache: "no-store", credentials: "same-origin" },
    headers: getAuthHeaders(cookies()),
  });

  const refreshProductList = async () => {
    "use server";

    revalidatePath("/pantry/list");
  };

  return data && data.length > 0 ? (
    <div>
      {data.map((item) => {
        return (
          <Product
            key={item.id}
            product={item as ProductView}
            refreshProductList={refreshProductList}
          />
        );
      })}
    </div>
  ) : (
    <EmptyProductList />
  );
};

export default PantryList;
