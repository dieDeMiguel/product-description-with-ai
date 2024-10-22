import { z } from "zod";

const EditorBlock = z
  .object({
    id: z.string(),
    type: z.enum(["paragraph", "header"]),
    data: z.object({
      text: z.string(),
      level: z.number().optional(),
    }),
  })
  .refine(
    (block) => {
      if (block.type === "header") {
        return block.data.level === 1 || block.data.level === 4;
      }
      return true;
    },
    {
      message: "Header level must be 1 or 4",
      path: ["data", "level"],
    }
  );

const EditorBlocksSchema = z.object({
  blocks: z.array(EditorBlock),
});

export default EditorBlocksSchema;
