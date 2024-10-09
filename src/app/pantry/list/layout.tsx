import { ReactNode, Suspense } from "react";
import LoadingProductList from "./loading";

const Layout = async ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<LoadingProductList />}>{children}</Suspense>;
};

export default Layout;
