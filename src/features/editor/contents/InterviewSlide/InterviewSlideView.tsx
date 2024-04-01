import Slider from "react-slick";
import { useRef, useState } from "react";
import classNames from "classnames";
import { InterviewSlideSectionValues } from "@/types";
import styles from "./InterviewSlide.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function InterviewSlideView({
  cardList,
}: Omit<InterviewSlideSectionValues, "enable">) {
  const slickRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    slickRef.current.slickPrev();
  };

  const handleNext = () => {
    slickRef.current.slickNext();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerContents}>
        <a
          className={classNames(styles.arrow, styles.arrowLeft)}
          onClick={handlePrev}
          // onClick={handleClickPrev}
        />
        <a
          className={classNames(styles.arrow, styles.arrowRight)}
          onClick={handleNext}
          // onClick={handleClickNext}
        />
        <div className={styles.cardList}>
          <Slider {...settings} ref={slickRef}>
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

                <div
                  className={styles.content}
                  dangerouslySetInnerHTML={{ __html: card.content }}
                />

                <p
                  className={styles.interviewee}
                  dangerouslySetInnerHTML={{ __html: card.interviewee }}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
