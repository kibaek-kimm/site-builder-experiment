/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import ContentEditable from "@/features/editor/core/ContentEditable";
import { DEFAULT_GALLERY2_CARD_LIST } from "./constants";
import StructuredContentEditable from "@/features/editor/core/StructuredContentEditable";
import Section from "@/features/editor/core/Section";
import { ImageGallery1Values } from "@/types";
import styles from "./ImageGallery1.module.css";
import SectionAsidePanel from "../../core/SectionAsidePanel";
import PanelContent from "../../core/SectionAsidePanel/PanelContent";
import SubTitle from "../../core/SectionAsidePanel/SubTitle";
import ImageUploaderList from "../../core/ImageUploader/ImageUploaderList";
import ImageUploader from "../../core/ImageUploader";
import { uploadImage } from "@/apis/uploadImage";

interface Props {
  defaultValues?: ImageGallery1Values;
  onChange?: (values: ImageGallery1Values) => void;
}

export default function ImageGallery2({ defaultValues, onChange }: Props) {
  const [values, setValues] = useState<ImageGallery1Values>({
    enable: defaultValues?.enable ?? false,
    heading: defaultValues?.heading ?? "",
    imageList: ["", "", "", "", "", ""],
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
              title="이미지 갤러리 I"
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
                  {values.imageList.map((imagePath, index) => (
                    <ImageUploader
                      key={index}
                      defaultImage={imagePath}
                      onUploadedFile={async (file) => {
                        const { data, status } = await uploadImage(file);

                        if (status === 200) {
                          const { imageList } = { ...values };
                          imageList[index] = data.path;
                          handleChangeValues("imageList", imageList);
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

              <ContentEditable
                tagName="h3"
                className={styles.subTitle}
                placeholder="최고의 일상과 성과를 위한 다양한 지원을 제공합니다"
                defaultValue={values.heading}
                onInputChange={(content) => {
                  handleChangeValues("heading", content);
                }}
              />

              <ul className={styles.cardWrapper}>
                {values.imageList.map((imagePath, index) => (
                  <li
                    key={`image-gallery1-info-${index}`}
                    className={styles.cardImage}
                  >
                    {imagePath && <img src={imagePath} alt="" />}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </Section>
  );
}
