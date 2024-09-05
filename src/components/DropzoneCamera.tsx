import { cn } from "@/lib/utils";
import { Camera, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { Progress } from "./ui/progress";
import { useToast } from "./ui/use-toast";
import useUploadFile from "@/lib/hooks/useUploadFile";
import { SESSION_STORAGE_AI_DATA_KEY } from "@/app/appConstants";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import { AiProduct } from "@/app/pantry/list/preview/AddAiProducts";

const DropzoneCamera = () => {
  const { toast } = useToast();

  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const route = useRouter();

  const onDropRejected = (filesRejected: FileRejection[]) => {
    const [file] = filesRejected;

    toast({
      title: `${file.file.type} type is not supported.`,
      description: "Please provide file of type JPG or PNG",
      variant: "destructive",
    });
  };
  const onDropAccepted = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      uploadFileMutation.mutate(file);
    });
  };

  const [isPending, startTransition] = useTransition();

  const uploadFileMutation = useUploadFile({
    setUploadProgress,
    onUploadFinished: (data) => {
      startTransition(() => {
        const aiProducts: AiProduct[] = (data as unknown as AiProduct[]).map(
          (p) => {
            return { ...p, id: uuidv4() };
          }
        );

        sessionStorage.setItem(
          SESSION_STORAGE_AI_DATA_KEY,
          JSON.stringify(aiProducts)
        );
        route.push("/pantry/list/preview");
      });
    },
  });

  const isUploading = uploadFileMutation.isPending;

  return (
    <div
      className={cn(
        "relative h-full flex-1 my-8 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center"
      )}
    >
      <div className="relative flex flex-1 flex-col items-center justify-center w-full">
        <Dropzone
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="h-full w-full flex-1 flex flex-col items-center justify-center"
              {...getRootProps()}
            >
              <input
                {...getInputProps()}
                accept="image/*"
                capture="environment"
              />
              {isUploading || isPending ? (
                <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2" />
              ) : (
                <Camera className="h-6 w-6 text-zinc-500 mb-2" />
              )}
              <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <p>Uploading...</p>
                    <Progress
                      value={uploadProgress}
                      className="mt-2 w-40 h-2 bg-gray-300"
                    />
                  </div>
                ) : isPending ? (
                  <div className="flex flex-col items-center">
                    <p>Redirecting, please wait...</p>
                  </div>
                ) : (
                  <p>
                    <span className="font-semibold">Open camera</span>
                  </p>
                )}
              </div>
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
};

export default DropzoneCamera;
