"use client";

import ContentEditable from "@/features/editor/core/ContentEditable";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { MainSectionValues } from "@/types";
import Section from "@/features/editor/core/Section";
import styles from "./Main.module.css";
import SectionAsidePanel from "../../core/SectionAsidePanel";

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

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const file = (target.files as FileList)[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      axios
        .post("/api/upload-image", formData)
        .then(({ data }) => {
          const newState = { ...values };
          newState.backgroundImage = data.path;
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
            />
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
        </div>
      )}
    </Section>
  );
}
