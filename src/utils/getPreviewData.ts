import { BuilderStore } from "@/store";

/**
 * preview용 데이터를 local storage에 저장
 */
export function getPreviewData() {
  try {
    const storage = window.sessionStorage;
    const data = storage.getItem("previewData");

    if (data) {
      const { createdAt, ...parsedData } = JSON.parse(data);
      return parsedData as Omit<
        BuilderStore,
        "setBuilderMetadata" | "setBuilderContents"
      >;
    }
  } catch (e) {
    console.log(e);
  }
}
