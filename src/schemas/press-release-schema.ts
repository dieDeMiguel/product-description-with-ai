import { z } from "zod";

const EditorBlock = z.object({
  type: z.enum(["paragraph", "header"]),
  data: z.object({
    text: z.string(),
    level: z.number().optional(),
  }),
  id: z.string(),
});
const EditorBlocksSchema = z.object({
  blocks: z.array(EditorBlock),
});

export default EditorBlocksSchema;
