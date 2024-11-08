import React, { use } from "react";
import TagsList from "../image-uploader/keywords-list";

type Props = {
  tagsPromise: Promise<string[]>;
};

export default function Tags({ tagsPromise }: Props) {
  const tags = use(tagsPromise);
  return (
    <div className="max-w-maxWidthEditorContent m-auto flex flex-col gap-10 mt-4 text-black space-y-2">
      <h3 className="font-bold">Product Tags:</h3>
      {tags?.length > 0 && <TagsList tags={tags} />}
    </div>
  );
}
