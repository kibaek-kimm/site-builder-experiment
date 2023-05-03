import styles from "./Faq.module.css";
import { FAQdSectionValues } from "@/types";

export default function FaqView({
  faqList,
}: Omit<FAQdSectionValues, "enable">) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerContents}>
        <h2>자주 묻는 질문</h2>

        <ul className={styles.cardList} data-testid="faq-list">
          {faqList.map((faqInfo, index) => (
            <li key={index} className={styles.faqItem}>
              <a className={styles.toggleButton}>
                <div className={styles.question}>{faqInfo.question}</div>
              </a>

              <ul className={styles.answerList}>
                {faqInfo.answer.map((_answer, index) => (
                  <li key={index} className={styles.answerListItem}>
                    {_answer}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
