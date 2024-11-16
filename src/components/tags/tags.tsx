import React, { use } from "react";
import TagsList from "../image-uploader/tags-list";

type Props = {
  tagsPromise: Promise<string[]>;
};

export default function Tags({ tagsPromise }: Props) {
  const tags = use(tagsPromise);
  return (
    <div className="max-w-maxWidthEditorContent m-auto flex flex-col gap-4 mt-4 text-black">
      <h3 className="font-bold">Product Tags:</h3>
      {tags?.length > 0 && <TagsList tags={tags} />}
    </div>
  );
}
