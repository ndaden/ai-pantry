import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import AddProduct from "./AddProduct";

const AddProductPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return <AddProduct user={user} />;
};

export default AddProductPage;
