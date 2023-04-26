/* eslint-disable @next/next/no-img-element */
"use client";

import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import ContentEditable from "@/features/editor/core/ContentEditable";
import { DEFAULT_GALLERY2_CARD_LIST } from "./constants";
import StructuredContentEditable from "@/features/editor/core/StructuredContentEditable";
import Section from "@/features/editor/core/Section";
import { ImageGallery2Values } from "@/types";
import styles from "./ImageGallery2.module.css";

interface Props {
  defaultValues?: ImageGallery2Values;
  onChange?: (values: ImageGallery2Values) => void;
}

export default function ImageGallery2({ defaultValues, onChange }: Props) {
  const [values, setValues] = useState<ImageGallery2Values>({
    enable: defaultValues?.enable ?? false,
    heading: defaultValues?.heading ?? "",
    children: defaultValues?.children ?? DEFAULT_GALLERY2_CARD_LIST,
  });

  const handleFile = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const target = e.currentTarget;
    const file = (target.files as FileList)[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      axios
        .post("/api/upload-image", formData)
        .then(({ data }) => {
          const newState = { ...values };
          newState.children[index].image = data.path;
          setValues(newState);

          if (onChange) {
            onChange(newState);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange(values);
    }
  }, []);

  return (
    <Section label="이미지 갤러리 II">
      <div className={styles.wrapper}>
        <div className={styles.innerContents}>
          <ContentEditable
            tagName="h2"
            className={styles.heading}
            placeholder="최고의 일상과 성과를 위한 다양한 지원을 제공합니다"
            defaultValue={values.heading}
            onInputChange={(content) => {
              const newValues = { ...values, heading: content };
              setValues(newValues);

              if (onChange) {
                onChange(newValues);
              }
            }}
          />

          <div className={styles.cardWrapper}>
            {values.children.map((card, index) => (
              <div key={`image-gallery2-info-${index}`} className={styles.card}>
                <div className={styles.cardImage}>
                  {card.image ? (
                    <img src={card.image} alt="" />
                  ) : (
                    <input type="file" onChange={(e) => handleFile(e, index)} />
                  )}
                </div>
                <ContentEditable
                  tagName="h3"
                  defaultValue={card.heading}
                  placeholder="복지 섹션의 제목을 입력해주세요."
                  className={styles.cardHeading}
                  onInputChange={(content) => {
                    const { children } = { ...values };
                    children[index].heading = content;
                    const newState = {
                      ...values,
                      children,
                    };

                    setValues(newState);

                    if (onChange) {
                      onChange(newState);
                    }
                  }}
                />
                <StructuredContentEditable
                  defaultValue={card.descriptions}
                  parentNode={<ul className={styles.galleryList} />}
                  onChange={(content) => {
                    const { children } = { ...values };
                    children[index].descriptions = content;
                    const newState = {
                      ...values,
                      children,
                    };

                    setValues(newState);

                    if (onChange) {
                      onChange(newState);
                    }
                  }}
                  childNode={
                    <li
                      className={styles.galleryListItem}
                      data-placeholder="값을 입력해주세요."
                    />
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
