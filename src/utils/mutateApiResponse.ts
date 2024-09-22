import { v4 as uuidv4 } from "uuid";

export default function mutateApiResponse(response: string) {
  return {
    blocks: [
      {
        type: "paragraph",

        data: {
          text: response,
        },
        id: uuidv4(),
      },
    ],

    version: "2.22.0",

    time: Date.now(),
  };
}
