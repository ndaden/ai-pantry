import { Skeleton } from "@/components/ui/skeleton";

const LoadingProductList = () => {
  return (
    <div className="space-y-3 mx-3 my-3">
      <Skeleton className="h-10 w-[100%]"></Skeleton>
      <Skeleton className="h-10 w-[100%]"></Skeleton>
      <Skeleton className="h-10 w-[100%]"></Skeleton>
    </div>
  );
};

export default LoadingProductList;
