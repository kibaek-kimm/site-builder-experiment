import { useState } from "react";
import styles from "./Faq.module.css";
import { FAQdSectionValues } from "@/types";
import classNames from "classnames";

export default function FaqView({
  faqList,
}: Omit<FAQdSectionValues, "enable">) {
  const [activeIndex, setActiveIndex] = useState<number>();

  const handleClickItem = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    } else {
      setActiveIndex(undefined);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerContents}>
        <h2>자주 묻는 질문</h2>

        <ul className={styles.cardList} data-testid="faq-list">
          {faqList.map((faqInfo, index) => (
            <li
              key={index}
              className={classNames(styles.faqItem, {
                [styles.active]: index === activeIndex,
              })}
            >
              <a
                className={styles.toggleButton}
                onClick={() => handleClickItem(index)}
              >
                <div
                  className={styles.question}
                  dangerouslySetInnerHTML={{ __html: faqInfo.question }}
                />
              </a>

              <ul className={styles.answerList}>
                {faqInfo.answer.map((_answer, index) => (
                  <li
                    key={index}
                    className={styles.answerListItem}
                    dangerouslySetInnerHTML={{ __html: _answer }}
                  />
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
