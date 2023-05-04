import styles from "./HighlightCard.module.css";
import { HighlightCardSectionValues } from "@/types";

export default function HighlightCardView({
  heading,
  cardList,
}: Omit<HighlightCardSectionValues, "enable">) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerContents}>
        <h2
          className={styles.heading}
          dangerouslySetInnerHTML={{ __html: heading }}
        />

        {cardList && cardList.length > 0 && (
          <ul className={styles.cardList}>
            {cardList.map((cardItem, index) => (
              <li key={index} className={styles.cardItem}>
                <h3
                  className={styles.cardTitle}
                  dangerouslySetInnerHTML={{ __html: cardItem.title }}
                />
                <p
                  className={styles.cardDescription}
                  dangerouslySetInnerHTML={{ __html: cardItem.description }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
