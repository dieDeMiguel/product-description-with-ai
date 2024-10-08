import { z } from "zod";

const EditorBlock = z.object({
  id: z.string(),
  type: z.enum(["paragraph", "header"]),
  data: z.object({
    text: z.string(),
    level: z.number().optional(),
  }),
});
const EditorBlocksSchema = z.object({
  blocks: z.array(EditorBlock),
});

export default EditorBlocksSchema;
