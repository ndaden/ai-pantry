import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <KindeProvider>
      <MaxWidthWrapper className="flex-1 flex flex-col">
        {children}
      </MaxWidthWrapper>
    </KindeProvider>
  );
};

export default Layout;
