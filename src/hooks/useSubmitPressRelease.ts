import { useRouter } from "next/navigation";
import { useState } from "react";

interface PressReleaseFormData {
  userInput: string;
}

interface UseSubmitPressReleaseResult {
  onSubmit: (data: PressReleaseFormData) => Promise<void>;
  isLoading: boolean;
  currentStep: number;
}

export const useSubmitProductDescription = (): UseSubmitPressReleaseResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const onSubmit = async (data: PressReleaseFormData) => {
    setIsLoading(true);

    try {
      // Delay step 1 so that step 2 takes proportionally not so long
      setTimeout(() => {
        setCurrentStep(2);
      }, 2500);
      // Step 1: Generate the press release
      const response = await fetch(`/api/generate-product-description`, {
        method: "POST",
        body: JSON.stringify({ prompt: data.userInput }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error generating the product description.");
      }

      const { pressRelease } = await response.json();

      // Step 2: Generate keywords
      setCurrentStep(3);
      const keywordsResponse = await fetch(`/api/generate-product-tags`, {
        method: "POST",
        body: JSON.stringify({ pressRelease }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!keywordsResponse.ok) {
        throw new Error("Error generating keywords.");
      }
      router.push(`/press-release/${pressRelease.id}`);
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        alert(error.message || "An unexpected error occurred.");
      } else {
        alert("An unexpected error occurred.");
      }
      setIsLoading(false);
      setCurrentStep(1);
    }
  };

  return { onSubmit, isLoading, currentStep };
};
