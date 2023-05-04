"use client";

import Preview from "@/features/editor/core/Preview";
import { getPreviewData } from "@/utils/getPreviewData";
import { useEffect, useState } from "react";

export default function PreviewPage() {
  const [isReady, setIsReady] = useState<boolean>();
  const previewState = getPreviewData() ?? {};

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }
  return <Preview {...previewState} />;
}
