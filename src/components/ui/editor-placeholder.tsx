import { Skeleton } from "./skeleton";

const EditorPlaceholder: React.FC = () => {
  return (
    <div className="animate-pulse  w-3/4 space-y-2 mt-4 m-auto">
      <Skeleton className="h-8 rounded w-3/4" />
      <Skeleton className="h-6 rounded w-full" />
      <Skeleton className="h-6 rounded w-full" />
      <Skeleton className="h-6 rounded w-full" />
      <Skeleton className="h-6 rounded w-full" />
      <Skeleton className="h-6 rounded w-full" />
      <Skeleton className="h-8 rounded w-3/4" />
      <Skeleton className="h-6 rounded w-full" />
      <Skeleton className="h-6 rounded w-full" />
      <Skeleton className="h-6 rounded w-full" />
      <Skeleton className="h-6 rounded w-full" />
      <Skeleton className="h-8 rounded w-full" />
      <Skeleton className="h-8 rounded w-3/4" />
      <Skeleton className="h-6 rounded w-full" />
      <Skeleton className="h-6 rounded w-full" />
      <Skeleton className="h-6 rounded w-full" />
      <Skeleton className="h-6 rounded w-full" />
      <Skeleton className="h-6 rounded w-full" />
    </div>
  );
};

export default EditorPlaceholder;
