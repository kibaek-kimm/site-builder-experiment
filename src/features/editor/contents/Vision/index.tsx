/* eslint-disable @next/next/no-img-element */
"use client";

import ContentEditable from "@/features/editor/core/ContentEditable";
import styles from "./Vision.module.css";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import Section from "@/features/editor/core/Section";
import SectionAsidePanel from "@/features/editor/core/SectionAsidePanel";
import PanelContent from "@/features/editor/core/SectionAsidePanel/PanelContent";
import SubTitle from "@/features/editor/core/SectionAsidePanel/SubTitle";

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
    <Section label="비전">
      {({ active, setActive }) => (
        <>
          {active && (
            <SectionAsidePanel
              title="소개글"
              description="한개의 이미지, 타이틀, 설명 영역으로 구성되어있는 영역입니다. 구체적인 회사의 소개를 작성해주세요."
              onClickClose={() => setActive(false)}
            >
              <PanelContent>
                <SubTitle>이미지</SubTitle>
                qwdpkqwdop
              </PanelContent>
            </SectionAsidePanel>
          )}
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
        </>
      )}
    </Section>
  );
}
