import styles from "./GlobalNavigation.module.css";
import useBuilderStore from "@/store";
import { setPreviewData } from "@/utils/setPreviewData";

export default function GlobalNavigation() {
  const { setBuilderContents, setBuilderMetadata, ...state } =
    useBuilderStore();

  const handleClickPreview = () => {
    const result = setPreviewData(state);

    if (result) {
      window.open("/preview");
    }
  };

  return (
    <header className={styles.gnb}>
      <button onClick={handleClickPreview}>미리보기</button>
    </header>
  );
}
