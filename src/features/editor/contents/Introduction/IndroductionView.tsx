import styles from "./Introduction.module.css";
import { IntroductionSectionValues } from "@/types";

export default function IndroductionView({
  heading,
  description,
  image,
}: Omit<IntroductionSectionValues, "enable">) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerContents}>
        <div className={styles.imageWrapper}>
          {image && <img src={image} alt="" />}
        </div>
        <div className={styles.textWrapper}>
          <h3
            className={styles.heading}
            dangerouslySetInnerHTML={{ __html: heading }}
          />
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </div>
  );
}
