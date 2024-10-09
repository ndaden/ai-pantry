import { ReactNode, Suspense } from "react";
import LoadingAddProduct from "./loading";

const Layout = async ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<LoadingAddProduct />}>{children}</Suspense>;
};

export default Layout;
