import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect, RedirectType } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/", RedirectType.replace);
  }

  return (
    <MaxWidthWrapper className="flex-1 flex flex-col">
      {children}
    </MaxWidthWrapper>
  );
};

export default Layout;
