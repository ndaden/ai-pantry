import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import AddAiProducts from "./AddAiProducts";

const AddAiProductPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return <AddAiProducts user={user} />;
};

export default AddAiProductPage;
