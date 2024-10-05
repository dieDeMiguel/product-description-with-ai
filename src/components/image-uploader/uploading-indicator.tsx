import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const UploadingIndicator: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        "flex gap-2 items-center text-black font-semibold justify-center gap-s w-8 h-8 rounded-full bg-blue-500",
        className
      )}
    >
      <Loader2 className="text-white animate-spin" size={16} />
    </div>
  );
};

export default UploadingIndicator;
