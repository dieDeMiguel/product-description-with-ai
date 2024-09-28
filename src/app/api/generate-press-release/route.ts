import { NextRequest, NextResponse } from "next/server";

import { inngest } from "@/inngest/client";
import { setGeneratedPressRelease } from "@/store/pressReleaseStore";
import { v4 as uuidv4 } from "uuid"; // Install uuid: npm install uuid

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || prompt.trim().length < 10) {
      return NextResponse.json(
        { error: "Input is too short." },
        { status: 400 }
      );
    }

    // Generate a unique identifier for this press release
    const id = uuidv4();

    // Trigger the Inngest function with the prompt and id
    await inngest.send({
      name: "generate/press-release",
      data: {
        prompt,
        id,
      },
    });

    // Optionally, store the initial state in an in-memory store
    // Note: In-memory stores are ephemeral and not suitable for production
    setGeneratedPressRelease(id, "");

    return NextResponse.json({ id }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/generate-press-release:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
