"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { buttonVariants } from "./ui/button";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const DropdownNavbar = () => {
  const route = useRouter();

  const goToList = () => {
    route.push("/pantry/list");
  };

  const goToAddForm = () => {
    route.push("/pantry/add");
  };

  const goToAddWithAi = () => {
    route.push("/pantry/upload");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link
          className={buttonVariants({ size: "sm", variant: "ghost" })}
          href={""}
        >
          <span>My Pantry</span>
          <CaretDownIcon />
        </Link>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={goToList}>View my list</DropdownMenuItem>
        <DropdownMenuItem onClick={goToAddForm}>Add item</DropdownMenuItem>
        <DropdownMenuItem onClick={goToAddWithAi}>
          Add items with AI
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownNavbar;
