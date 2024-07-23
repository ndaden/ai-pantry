import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import axios, { AxiosProgressEvent } from "axios";

interface UploadResponse {
  success: boolean;
  message: string;
}

const useUploadFile = ({
  setUploadProgress,
  onUploadFinished,
}: {
  setUploadProgress: Dispatch<SetStateAction<number>>;
  onUploadFinished: (data: UploadResponse) => void;
}) => {
  const uploadFileMutation = useMutation<UploadResponse, Error, File>({
    mutationFn: (file: File) =>
      uploadFile(file, (progress) => {
        setUploadProgress(progress);
      }),
    onSuccess: (data) => {
      setUploadProgress(100);
      onUploadFinished(data);
    },
    onError: () => {
      setUploadProgress(0);
    },
  });
  return uploadFileMutation;
};

const uploadFile = async (
  file: File,
  onProgress: (progress: number) => void
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post("/api/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / (progressEvent.total || 1)
      );
      onProgress(percentCompleted);
    },
  });

  return response.data;
};

export default useUploadFile;
