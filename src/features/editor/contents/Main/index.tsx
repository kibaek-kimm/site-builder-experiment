"use client";

import ContentEditable from "@/features/editor/core/ContentEditable";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { MainSectionValues } from "@/types";
import Section from "@/features/editor/core/Section";
import styles from "./Main.module.css";

interface Props {
  defaultValues?: Partial<MainSectionValues>;
  onChange?: (values: MainSectionValues) => void;
}

export default function Main({ defaultValues, onChange }: Props) {
  const [values, setValues] = useState<MainSectionValues>({
    heading: defaultValues?.heading ?? "",
    backgroundImage: defaultValues?.backgroundImage ?? "",
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
      <div className={styles.wrapper}>
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
    </Section>
  );
}
