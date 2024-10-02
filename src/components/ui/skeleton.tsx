import { cn } from "@/lib/utils";

function Skeleton({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-white", className)}
      {...props}
    >
      {children && children}
    </div>
  );
}
function PressReleaseGeneratorSkeleton() {
  return (
    <div className="w-full max-w-4xl p-4 flex flex-col gap-xl">
      <Skeleton className="text-2xl font-bold mb-4 h-8 pl-2 w-1/2 text-black">
        Generating Press Release
      </Skeleton>
      <Skeleton className="h-40 resize-none mb-4 w-full text-2xl text-black font-bold p-2">
        Some awesome content is coming to you..
      </Skeleton>
      <Skeleton className="w-full h-12" />
    </div>
  );
}

export { PressReleaseGeneratorSkeleton, Skeleton };
