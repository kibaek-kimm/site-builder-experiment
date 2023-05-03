"use client";

import Preview from "@/features/editor/core/Preview";
import useBuilderStore from "@/store";

export default function PreviewPage() {
  const { setBuilderContents, setBuilderMetadata, ...state } =
    useBuilderStore();
  return <Preview {...state} />;
}
