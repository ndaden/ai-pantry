"use client";

import { Button } from "@/components/ui/button";
import { SparklesIcon, TextIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const StartPage = () => {
  const route = useRouter();

  const goToAddWithAi = () => {
    route.push("/pantry/upload");
  };

  const goToAddWithForm = () => {
    route.push("/pantry/add");
  };
  return (
    <div className="text-center mt-5">
      <div>Comment souhaitez-vous ajouter vos produits ?</div>
      <div className="my-4 w-full">
        <Button
          type="submit"
          className="sm:w-fit w-full h-16"
          size={"lg"}
          onClick={goToAddWithAi}
        >
          <SparklesIcon className="mx-2" />
          Automatiquement via l&apos;IA
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
          <TextIcon className="mx-2" />
          Manuellement via formulaire
        </Button>
      </div>
    </div>
  );
};

export default StartPage;
