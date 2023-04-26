import { useState } from "react";
import ContentEditable from "../../core/ContentEditable";
import Section from "../../core/Section";
import styles from "./Introduction.module.css";
import { IntroductionSectionValues } from "@/types";
import SectionAsidePanel from "../../core/SectionAsidePanel";
import PanelContent from "../../core/SectionAsidePanel/PanelContent";
import SubTitle from "../../core/SectionAsidePanel/SubTitle";
import ImageUploaderList from "../../core/ImageUploader/ImageUploaderList";
import ImageUploader from "../../core/ImageUploader";
import { uploadImage } from "@/apis/uploadImage";

interface Props {
  defaultValue?: Partial<IntroductionSectionValues>;
  onChange?: (values: IntroductionSectionValues) => void;
}

export default function Introduction({ defaultValue, onChange }: Props) {
  const [values, setValues] = useState<IntroductionSectionValues>({
    enable: defaultValue?.enable ?? false,
    heading: defaultValue?.heading ?? "",
    description: defaultValue?.description ?? "",
    image: defaultValue?.image ?? "",
  });

  const handleChangeValues = (key: string, value: string) => {
    const newState = { ...values };
    newState[key] = value;

    setValues(newState);

    if (onChange) {
      onChange(newState);
    }
  };

  return (
    <Section label="소개글">
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
                <ImageUploaderList
                  disclaimer={
                    <>
                      파일 규격 jpg, png, gif <br />
                      권장 최소 가로 크기 <strong>976px</strong>, 최대 이미지
                      크기 <strong>2M</strong>
                    </>
                  }
                >
                  <ImageUploader
                    defaultImage={values.image}
                    onUploadedFile={async (file) => {
                      const { data, status } = await uploadImage(file);

                      if (status === 200) {
                        handleChangeValues("image", data.path);
                      }
                    }}
                  />
                </ImageUploaderList>
              </PanelContent>
            </SectionAsidePanel>
          )}
          <div className={styles.wrapper}>
            <div className={styles.innerContents}>
              <div className={styles.imageWrapper}>
                {values.image && <img src={values.image} alt="" />}
              </div>
              <div className={styles.textWrapper}>
                <ContentEditable
                  tagName="h3"
                  defaultValue={values.heading}
                  className={styles.heading}
                  onInputChange={(content) => {
                    handleChangeValues("heading", content);
                  }}
                />
                <ContentEditable
                  tagName="p"
                  className={styles.description}
                  defaultValue={values.description}
                  onInputChange={(content) => {
                    handleChangeValues("description", content);
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </Section>
  );
}
