import { MainSectionValues } from "@/types";
import styles from "./Main.module.css";

export default function MainView({
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
