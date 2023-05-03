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
import SectionAsidePanel from "../../core/SectionAsidePanel";
import PanelContent from "../../core/SectionAsidePanel/PanelContent";
import SubTitle from "../../core/SectionAsidePanel/SubTitle";
import ImageUploaderList from "../../core/ImageUploader/ImageUploaderList";
import ImageUploader from "../../core/ImageUploader";
import { uploadImage } from "@/apis/uploadImage";

interface Props {
  defaultValues?: ImageGallery2Values;
  onChange?: (values: ImageGallery2Values) => void;
}

export default function ImageGallery2({ defaultValues, onChange }: Props) {
  const [values, setValues] = useState<ImageGallery2Values>({
    enable: defaultValues?.enable ?? false,
    heading: defaultValues?.heading ?? "",
    cardList: defaultValues?.cardList ?? DEFAULT_GALLERY2_CARD_LIST,
  });

  const handleChangeValues = (key: string, value: string) => {
    const newState = { ...values };
    newState[key] = value;

    setValues(newState);

    if (onChange) {
      onChange(newState);
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange(values);
    }
  }, []);

  return (
    <Section label="이미지 갤러리 II">
      {({ active, setActive }) => (
        <>
          {active && (
            <SectionAsidePanel
              title="이미지 갤러리 II"
              description="회사 이미지, 서비스, 문화 등 소개하고 싶은 사진을 자유롭게 업로드 해주세요."
              onClickClose={() => setActive(false)}
              onChangeEnable={(enable) => {
                const newValues = { ...values, enable };
                setValues(newValues);

                if (onChange) {
                  onChange(newValues);
                }
              }}
            >
              <PanelContent>
                <SubTitle>이미지</SubTitle>
                <ImageUploaderList
                  column={2}
                  disclaimer={
                    <>
                      파일 규격 jpg, png, gif
                      <br />
                      권장 최소 가로 크기 <strong>976px</strong> , 최대 이미지
                      크기 <strong>2M</strong>
                    </>
                  }
                >
                  {Array.from({ length: 4 }, (_, index) => (
                    <ImageUploader
                      key={index}
                      defaultImage={values.cardList[index]?.image}
                      onUploadedFile={async (file) => {
                        const { data, status } = await uploadImage(file);

                        if (status === 200) {
                          const { cardList } = { ...values };
                          cardList[index].image = data.path;
                          handleChangeValues("cardList", children);
                        }
                      }}
                    />
                  ))}
                </ImageUploaderList>
              </PanelContent>
            </SectionAsidePanel>
          )}
          <div className={styles.wrapper}>
            <div className={styles.innerContents}>
              <ContentEditable
                tagName="h2"
                className={styles.heading}
                placeholder="최고의 일상과 성과를 위한 다양한 지원을 제공합니다"
                defaultValue={values.heading}
                onInputChange={(content) => {
                  handleChangeValues("heading", content);
                }}
              />

              <div className={styles.cardWrapper}>
                {values.cardList.map((card, index) => (
                  <div
                    key={`image-gallery2-info-${index}`}
                    className={styles.card}
                  >
                    <div className={styles.cardImage}>
                      {card.image && <img src={card.image} alt="" />}
                    </div>
                    <ContentEditable
                      tagName="h3"
                      defaultValue={card.heading}
                      placeholder="복지 섹션의 제목을 입력해주세요."
                      className={styles.cardHeading}
                      onInputChange={(content) => {
                        const { cardList } = { ...values };
                        cardList[index].heading = content;
                        handleChangeValues("cardList", cardList);
                      }}
                    />
                    <StructuredContentEditable
                      defaultValue={card.descriptions}
                      parentNode={<ul className={styles.galleryList} />}
                      onChange={(content) => {
                        const { cardList } = { ...values };
                        cardList[index].heading = content;
                        handleChangeValues("cardList", cardList);
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
        </>
      )}
    </Section>
  );
}
