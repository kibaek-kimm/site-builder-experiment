import { BuilderStore } from "@/store";

/**
 * preview용 데이터를 local storage에 저장
 */
export function setPreviewData(
  buildData: Omit<BuilderStore, "setBuilderMetadata" | "setBuilderContents">
) {
  if (buildData) {
    const data = { ...buildData, createdAt: new Date() };
    const storage = window.sessionStorage;
    storage.setItem("previewData", JSON.stringify(data));

    return true;
  }
}
