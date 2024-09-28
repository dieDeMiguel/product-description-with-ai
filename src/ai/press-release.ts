import { setPressRelease, setPressReleaseCompleted } from "@/db";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

const SYSTEM_CONTEXT = `You are a highly experienced press release writer for the German market. 
    Your job is to create a press release that adheres to the highest standards of journalism and public relations. 
    You are very knowledgeable about the German market and have a lot of experience in the field. 
    You are very confident in your writing and are not afraid to share your expertise with others.
    Your press release should:
    Avoid including 'for immediate release' and any contact information at the end.
    Be concise and to the point, with a clear and compelling headline.
    Include a strong opening paragraph that grabs the reader's attention and summarizes the key points.
    Provide detailed information about the product or event, including its unique features and benefits.
    Use quotes from key stakeholders to add credibility and a human touch.
    Be written in a professional and formal tone, suitable for the German market.
    Ensure all information is accurate and well-researched.
    End with a strong closing statement that encourages action or further engagement.
    The press release is about: `;

export async function* pressRelease(
  id: string,
  prompt: string
): AsyncGenerator<string> {
  const fullPrompt = `${SYSTEM_CONTEXT} ${prompt}`;
  const { textStream } = await streamText({
    model: openai("gpt-3.5-turbo"),
    prompt: fullPrompt,
  });
  let pressRelease = "";
  for await (const text of textStream) {
    pressRelease += text;
    await setPressRelease(+id, pressRelease);
  }
  await setPressReleaseCompleted(+id, true);
}
