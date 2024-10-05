import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const ImpressumPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-around p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle>Impressum</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            This website is a project developed to provide a wrapper around
            OpenAI&apos;s ChatGPT API. The content generated by this service is
            created by an AI model and is not manually reviewed or verified by
            us.
          </p>
          <p className="mb-4">
            <strong>Disclaimer:</strong> We are not responsible for the content
            created by the AI model. The generated content may not always be
            accurate, complete, or up-to-date. Users should verify the
            information independently before relying on it.
          </p>
          <p className="mb-4">
            For more information about the limitations and disclaimers related
            to OpenAI&apos;s services, please refer to OpenAI&apos;s official
            disclaimer:
            <a
              href="https://openai.com/policies/service-terms/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline ml-1"
            >
              OpenAI Disclaimer
            </a>
            .
          </p>
          <p>
            <strong>Contact Information:</strong>
            <br />
            Diego de Miguel
            <br />
            Sillemstraße 43
            <br />
            Hamburg, 20257
            <br />
            Email: {""}
            <a
              href="mailto:diedemiguel@gmail.com"
              className="text-blue-500 hover:underline"
            >
              diedemiguel@gmail.com
            </a>
            <br />
          </p>
        </CardContent>
      </Card>
      <Link href="/" className="bg-white px-2 py-1 rounded-lg text-black mb-10">
        <Label htmlFor="/" className="cursor-pointer">
          Home
        </Label>
      </Link>
    </div>
  );
};

export default ImpressumPage;