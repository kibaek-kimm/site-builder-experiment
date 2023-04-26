/* eslint-disable @next/next/no-img-element */
"use client";

import ContentEditable from "@/features/editor/core/ContentEditable";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { MainSectionValues } from "@/types";
import Section from "@/features/editor/core/Section";
import styles from "./Main.module.css";
import SectionAsidePanel from "../../core/SectionAsidePanel";
import SubTitle from "../../core/SectionAsidePanel/SubTitle";
import ImageUploaderList from "../../core/ImageUploader/ImageUploaderList";
import ImageUploader from "../../core/ImageUploader";
import PanelContent from "../../core/SectionAsidePanel/PanelContent";
import { uploadImage } from "@/apis/uploadImage";

interface Props {
  defaultValues?: Partial<MainSectionValues>;
  onChange?: (values: MainSectionValues) => void;
}

export default function Main({ defaultValues, onChange }: Props) {
  const [values, setValues] = useState<MainSectionValues>({
    heading: defaultValues?.heading ?? "",
    backgroundImage: defaultValues?.backgroundImage ?? "",
    // TODO: api연동
    enable: true,
  });

  return (
    <Section label="메인 타이틀">
      {({ active, setActive }) => (
        <div className={styles.wrapper}>
          {active && (
            <SectionAsidePanel
              title="메인 타이틀"
              description="가장 상단에 보이는 메인 타이틀 영역입니다. 회사를 소개할 수 있는 문구와 사진을 게재해주세요."
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
                  disclaimer={
                    <>
                      파일 규격 jpg, png, gif
                      <br />
                      권장 최소 가로 크기 <strong>2880px</strong> , 최대 이미지
                      크기 <strong>5M</strong>
                    </>
                  }
                >
                  <ImageUploader
                    defaultImage={values.backgroundImage}
                    onUploadedFile={async (file) => {
                      const { data, status } = await uploadImage(file);

                      if (status === 200) {
                        const newValues = {
                          ...values,
                          backgroundImage: data.path,
                        };
                        setValues(newValues);

                        if (onChange) {
                          onChange(newValues);
                        }
                      }
                    }}
                  />
                </ImageUploaderList>
              </PanelContent>
            </SectionAsidePanel>
          )}
          <ContentEditable
            className={styles.heading}
            tagName="h1"
            placeholder="제목을 입력하세요."
            defaultValue={values.heading}
            onInputChange={(content) => {
              const newValues = { ...values, heading: content };
              setValues(newValues);

              if (onChange) {
                onChange(newValues);
              }
            }}
          />

          {values.backgroundImage && (
            <div className={styles.mainImage}>
              <img src={values.backgroundImage} alt="" />
            </div>
          )}

          {/* /uploads/image-1682493547642.png */}
        </div>
      )}
    </Section>
  );
}
