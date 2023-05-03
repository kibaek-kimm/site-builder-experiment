import { MainSectionValues } from "@/types";
import styles from "./MainTitle.module.css";

export default function MainTitleView({
  heading,
  backgroundImage,
}: Omit<MainSectionValues, "enable">) {
  return (
    <div className={styles.wrapper}>
      <h1
        className={styles.heading}
        dangerouslySetInnerHTML={{ __html: heading }}
      />
      <div className={styles.mainImage}>
        {backgroundImage && <img src={backgroundImage} alt="" />}
      </div>
    </div>
  );
}
