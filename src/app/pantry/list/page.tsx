import { client } from "@/app/page";
import Product from "./product";

const PantryList = async () => {
  const { data } = await client.api.product.list.get({
    fetch: { cache: "no-store" },
  });

  return data ? (
    <div>
      {data.map((item) => {
        return <Product key={item.id} product={item} />;
      })}
    </div>
  ) : null;
};

export default PantryList;
