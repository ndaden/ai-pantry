import { client } from "@/app/page";
import Product from "./product";
import { ProductView } from "@/lib/types/ProductView";
import { revalidatePath } from "next/cache";
import Link from "next/link";

const PantryList = async () => {
  const { data } = await client.api.product.list.get({
    fetch: { cache: "no-store" },
  });

  const refreshProductList = async () => {
    "use server";

    revalidatePath("/pantry/list", "layout");
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
