import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  );
}
function PressReleaseGeneratorSkeleton() {
  return (
    <div className="w-full max-w-4xl p-4 flex flex-col gap-xl">
      <Skeleton className="text-2xl font-bold mb-4 h-8 w-1/2" />
      <Skeleton className="h-40 resize-none mb-4 w-full" />
      <Skeleton className="w-full h-12" />
    </div>
  );
}

export { PressReleaseGeneratorSkeleton, Skeleton };
