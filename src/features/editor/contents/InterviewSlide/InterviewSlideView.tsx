import { useState } from "react";
import classNames from "classnames";
import { InterviewSlideSectionValues } from "@/types";
import styles from "./InterviewSlide.module.css";

export default function InterviewSlideView({
  cardList,
}: Omit<InterviewSlideSectionValues, "enable">) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerContents}>
        <a
          className={classNames(styles.arrow, styles.arrowLeft)}
          // onClick={handleClickPrev}
        />
        <a
          className={classNames(styles.arrow, styles.arrowRight)}
          // onClick={handleClickNext}
        />
        <div className={styles.cardList}>
          {cardList.map((card, index) => (
            <div
              key={index}
              className={classNames(styles.cardItem, {
                [styles.active]: activeIndex === index,
              })}
            >
              <div className={styles.image}>
                {card.image && <img src={card.image} alt="" />}
              </div>

              <div className={styles.content}>{card.content}</div>

              <p className={styles.interviewee}>{card.interviewee}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
