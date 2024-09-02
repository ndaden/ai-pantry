import Product from "./product";
import { ProductView } from "@/lib/types/ProductView";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { client } from "@/app/api/[[...route]]/client";
import { getAuthHeaders } from "@/lib/utils";
import { cookies } from "next/headers";

const PantryList = async () => {
  const { data } = await client.api.product.list.get({
    fetch: { cache: "no-cache", credentials: "same-origin" },
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
    <div className="text-center mt-5">
      <p>Aucun produit</p>
      <p>
        Ajoutez-en en{" "}
        <Link className="text-green-600 font-bold" href="/pantry/upload">
          prenant une photo
        </Link>{" "}
        ou en{" "}
        <Link className="text-green-600 font-bold" href="/pantry/add">
          utilisant le formulaire.
        </Link>
      </p>
    </div>
  );
};

export default PantryList;
