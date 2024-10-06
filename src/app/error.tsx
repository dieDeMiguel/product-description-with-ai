"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen p-4">
      <Card className="max-w-md w-full text-start">
        <CardHeader>
          <CardTitle>Oops! Something went wrong.</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-500">
            We couldn&apos;t find the page you were looking for.
          </p>
          <Link
            href="/"
            className="block text-center text-gray-500 hover:text-black cursor-pointer"
          >
            Home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorPage;
