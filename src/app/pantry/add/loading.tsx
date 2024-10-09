import { Skeleton } from "@/components/ui/skeleton";

const LoadingAddProduct = () => {
  return (
    <div className="space-y-3 mx-3 my-3">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]"></Skeleton>
        <Skeleton className="h-10 w-[100%]"></Skeleton>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]"></Skeleton>
        <div className="flex justify-center space-x-2">
          <Skeleton className="h-10 w-[40px]"></Skeleton>
          <Skeleton className="h-10 w-[40px]"></Skeleton>
          <Skeleton className="h-10 w-[40px]"></Skeleton>
          <Skeleton className="h-10 w-[40px]"></Skeleton>
        </div>
      </div>
      <div className="space-y-6">
        <Skeleton className="h-4 w-[100px]"></Skeleton>
        <div className="flex justify-center space-x-2">
          <Skeleton className="h-10 w-[40px]"></Skeleton>
          <Skeleton className="h-10 w-[40px]"></Skeleton>
          <Skeleton className="h-10 w-[40px]"></Skeleton>
          <Skeleton className="h-10 w-[40px]"></Skeleton>
        </div>
        <div className="flex justify-center space-x-2">
          <Skeleton className="h-10 w-[40px]"></Skeleton>
          <Skeleton className="h-10 w-[40px]"></Skeleton>
          <Skeleton className="h-10 w-[40px]"></Skeleton>
          <Skeleton className="h-10 w-[40px]"></Skeleton>
        </div>
        <Skeleton className="h-8 w-[100%]"></Skeleton>
      </div>
    </div>
  );
};

export default LoadingAddProduct;
