import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { LayersIcon, LogOutIcon, PlusIcon } from "lucide-react";
import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  const isTest = false;

  return (
    <nav className="sticky h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            pantry <span className="text-green-600">AI</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            {user || isTest ? (
              <>
                <Link
                  href={"/pantry/start"}
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden md:flex",
                  })}
                >
                  <PlusIcon className="h-4 w-4 mr-2" /> Ajout produits
                </Link>
                <Link
                  href={"/pantry/list"}
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  <LayersIcon className="w-4 h-4 mr-2" /> Mon Stock
                </Link>

                <LogoutLink
                  className={buttonVariants({
                    size: "sm",
                    className: "bg-red-700",
                  })}
                >
                  <LogOutIcon className="w-4 h-4 text-white" />
                </LogoutLink>
                {isAdmin ? (
                  <Link
                    href={"/admin/dashboard"}
                    className={buttonVariants({ size: "sm", variant: "ghost" })}
                  >
                    Dashboard ✨
                  </Link>
                ) : null}
                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
              </>
            ) : (
              <>
                <Link
                  href={"/api/auth/register"}
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Nouveau compte
                </Link>
                <LoginLink
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Se connecter
                </LoginLink>

                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
