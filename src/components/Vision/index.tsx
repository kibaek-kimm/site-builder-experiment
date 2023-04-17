"use client";

import ContentEditable from "../ContentEditable";
import styles from "./Vision.module.css";

export default function Vision() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftArea}>
        <ContentEditable
          className={styles.heading}
          tagName="h2"
          placeholder={`사용자 가치를<br/>최우선으로 생각합니다.`}
          onInputChange={(content) => {
            console.log(content);
          }}
        />

        <ContentEditable
          className={styles.description}
          tagName="p"
          placeholder="내용을 입력해주세요."
          onInputChange={(content) => {
            console.log(content);
          }}
        />
      </div>
      <div className={styles.rightArea}>
        <div className={styles.image}>이미지를 업로드해주세요.</div>
      </div>
    </div>
  );
}
