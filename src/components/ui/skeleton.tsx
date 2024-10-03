import { cn } from "@/lib/utils";
import { WandSparkles } from "lucide-react";

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
      <Skeleton className="text-xl font-bold mb-4 h-12 pt-2 pl-2 w-1/2 text-black" />
      <Skeleton className="h-40 resize-none mb-4 w-full text-2xl text-black font-bold flex items-center justify-center">
        <WandSparkles size={40} />
      </Skeleton>
      <Skeleton className="w-full h-12 text-xl pt-2 pl-2 text-black font-bold" />
    </div>
  );
}

export { PressReleaseGeneratorSkeleton, Skeleton };
