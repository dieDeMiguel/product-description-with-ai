"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";
import translations from "../translations/impressum-translations";

const ImpressumPage = () => {
  const [language, setLanguage] = useState<"en" | "de">("en");
  const {
    title,
    content,
    homeLink,
    language: languageLabel,
    english,
    german,
  } = translations[language];

  return (
    <div className="flex h-screen flex-col items-center justify-around p-4">
      <Card className="max-w-2xl w-full relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="absolute top-5 right-8">
            <button className="text-gray-500 hover:text-black rounded">
              {languageLabel}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => setLanguage("en")}>
              {english}
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setLanguage("de")}>
              {german}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {content.map((paragraph, index) => (
            <p className="mb-4" key={index}>
              {paragraph}
            </p>
          ))}
        </CardContent>
      </Card>
      <Link href="/" className="text-gray-300 hover:text-white cursor-pointer">
        {homeLink}
      </Link>
    </div>
  );
};

export default ImpressumPage;
