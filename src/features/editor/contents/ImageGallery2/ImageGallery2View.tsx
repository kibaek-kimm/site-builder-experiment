/* eslint-disable @next/next/no-img-element */
"use client";

import { ImageGallery2Values } from "@/types";
import styles from "./ImageGallery2.module.css";

export default function ImageGallery2View({
  heading,
  cardList,
}: Omit<ImageGallery2Values, "enable">) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerContents}>
        <h2 className={styles.heading}>{heading}</h2>

        <div className={styles.cardWrapper}>
          {cardList.map((card, index) => (
            <div key={`image-gallery2-info-${index}`} className={styles.card}>
              <div className={styles.cardImage}>
                {card.image && <img src={card.image} alt="" />}
              </div>

              <h3 className={styles.cardHeading}>{card.heading}</h3>

              <ul className={styles.galleryList}>
                {card.descriptions.map((description, index) => (
                  <li key={index} className={styles.galleryListItem}>
                    {description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
