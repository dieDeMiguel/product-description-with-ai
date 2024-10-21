import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";

const steps = [
  { title: "Send Prompt", description: "Sending your prompt to Sam Altman" },
  {
    title: "Generating Description",
    description: "AI creates your product description",
  },
  { title: "Generate Tags", description: "Extracting relevant tags" },
];

function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex flex-col justify-center sm:flex-row sm:justify-between items-center h-screen">
      {steps.map((step, index) => (
        <div
          key={index}
          className="flex flex-col items-center w-full sm:w-1/3 my-2 sm:my-0 mx-2"
        >
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center mb-2",
              currentStep > index + 1
                ? "bg-green-500"
                : currentStep === index + 1
                ? "bg-blue-500"
                : "bg-gray-300"
            )}
          >
            {currentStep > index + 1 ? (
              <Check className="text-white" size={16} />
            ) : currentStep === index + 1 ? (
              <Loader2 className="text-white animate-spin" size={16} />
            ) : (
              <span className="text-white">{index + 1}</span>
            )}
          </div>
          <div className="text-center flex flex-col items-center">
            <p className="font-semibold text-white">{step.title}</p>
            <p className="text-sm text-gray-200 h-12 flex items-center justify-center">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Stepper;
