"use client";
import { Boxes, SparklesIcon, TextIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const EmptyProductList = () => {
  const route = useRouter();

  const goToAddWithAi = () => {
    route.push("/pantry/upload");
  };

  const goToAddWithForm = () => {
    route.push("/pantry/add");
  };

  return (
    <div className="text-center mt-5">
      <div className="text-zinc-400 flex justify-center">
        <Boxes className="h-12 w-12" />
      </div>
      <div className="my-8">Your list is empty. Please add some items.</div>
      <div className="my-4">
        <Button
          type="submit"
          className="sm:w-fit w-full h-16"
          size={"lg"}
          onClick={goToAddWithAi}
        >
          <SparklesIcon className="mx-2" /> Add item with AI
        </Button>
      </div>
      <div className="my-4">
        <Button
          type="submit"
          variant={"outline"}
          className="sm:w-fit w-full h-16"
          size={"lg"}
          onClick={goToAddWithForm}
        >
          <TextIcon className="mx-2" /> Add item via form
        </Button>
      </div>
    </div>
  );
};

export default EmptyProductList;
