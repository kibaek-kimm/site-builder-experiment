/* eslint-disable @next/next/no-img-element */
"use client";

import { ImageGallery1Values } from "@/types";
import styles from "./ImageGallery1.module.css";

export default function ImageGallery1View({
  heading,
  description,
  imageList,
}: Omit<ImageGallery1Values, "enable">) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerContents}>
        <h2 className={styles.heading}>{heading}</h2>
        <h3 className={styles.subTitle}>{description}</h3>

        {imageList && imageList.length > 0 && (
          <ul className={styles.cardWrapper}>
            {imageList.map((imagePath, index) => (
              <li
                key={`image-gallery1-info-${index}`}
                className={styles.cardImage}
              >
                {imagePath && <img src={imagePath} alt="" />}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
