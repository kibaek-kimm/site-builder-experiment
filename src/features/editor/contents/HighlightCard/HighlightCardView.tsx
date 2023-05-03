import styles from "./HighlightCard.module.css";
import { HighlightCardSectionValues } from "@/types";

export default function HighlightCardView({
  heading,
  cardList,
}: Omit<HighlightCardSectionValues, "enable">) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerContents}>
        <h2 className={styles.heading}>{heading}</h2>

        {cardList && cardList.length > 0 && (
          <ul className={styles.cardList}>
            {cardList.map((cardItem, index) => (
              <li key={index} className={styles.cardItem}>
                <h3 className={styles.cardTitle}>{cardItem.title}</h3>
                <p className={styles.cardDescription}>{cardItem.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
