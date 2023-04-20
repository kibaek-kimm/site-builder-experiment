/* eslint-disable @next/next/no-img-element */
"use client";

import ContentEditable from "../ContentEditable";
import styles from "./Vision.module.css";
import { ChangeEvent, useState } from "react";
import axios from "axios";

interface VisionValues {
  heading: string;
  description: string;
  image: string;
}

interface Props {
  defaultValues?: Partial<VisionValues>;
  onChange?: (values: VisionValues) => void;
}

export default function Vision({ defaultValues, onChange }: Props) {
  const [values, setValues] = useState<VisionValues>({
    heading: defaultValues?.heading ?? "",
    description: defaultValues?.description ?? "",
    image: defaultValues?.image ?? "",
  });
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const file = (target.files as FileList)[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      axios
        .post("/api/upload-image", formData)
        .then(({ data }) => {
          const newValues = { ...values, image: data.path };
          setValues(newValues);

          if (onChange) {
            onChange(newValues);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftArea}>
        <ContentEditable
          className={styles.heading}
          tagName="h2"
          defaultValue={values.heading}
          placeholder="비전의 제목을 입력해주세요."
          onInputChange={(content) => {
            const newValues = { ...values, heading: content };
            setValues(newValues);

            if (onChange) {
              onChange(newValues);
            }
          }}
        />

        <ContentEditable
          className={styles.description}
          tagName="p"
          defaultValue={values.description}
          placeholder="비전의 내용을 입력해주세요."
          onInputChange={(content) => {
            const newValues = { ...values, description: content };
            setValues(newValues);

            if (onChange) {
              onChange(newValues);
            }
          }}
        />
      </div>
      <div className={styles.rightArea}>
        <div className={styles.image}>
          {values.image ? (
            <img src={values.image} alt="" />
          ) : (
            <>이미지를 업로드해주세요.</>
          )}
        </div>
        <input type="file" onChange={handleFile} />
      </div>
    </div>
  );
}
