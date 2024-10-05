import { Skeleton } from "./skeleton";

const EditorPlaceholder: React.FC = () => {
  return (
    <div className="animate-pulse space-y-4 max-w-[650px] m-auto">
      <Skeleton className="h-8 bg-gray-300 rounded w-3/4" />
      <Skeleton className="h-6 bg-gray-300 rounded w-full" />
      <Skeleton className="h-6 bg-gray-300 rounded w-full" />
      <Skeleton className="h-6 bg-gray-300 rounded w-full" />
      <Skeleton className="h-6 bg-gray-300 rounded w-full" />
      <Skeleton className="h-6 bg-gray-300 rounded w-full" />
      <Skeleton className="h-8 bg-gray-300 rounded w-5/6" />
      <Skeleton className="h-6 bg-gray-300 rounded w-full" />
      <Skeleton className="h-6 bg-gray-300 rounded w-full" />
      <Skeleton className="h-6 bg-gray-300 rounded w-full" />
      <Skeleton className="h-6 bg-gray-300 rounded w-full" />
      <Skeleton className="h-8 bg-gray-300 rounded w-full" />
      <Skeleton className="h-8 bg-gray-300 rounded w-5/6" />
      <Skeleton className="h-6 bg-gray-300 rounded w-full" />
      <Skeleton className="h-6 bg-gray-300 rounded w-full" />
      <Skeleton className="h-6 bg-gray-300 rounded w-full" />
      <Skeleton className="h-6 bg-gray-300 rounded w-full" />
      <Skeleton className="h-6 bg-gray-300 rounded w-full" />
    </div>
  );
};

export default EditorPlaceholder;
