import { useState } from "react";
import ImageUploader from "../../core/ImageUploader";
import ImageUploaderList from "../../core/ImageUploader/ImageUploaderList";
import Section from "../../core/Section";
import SectionAsidePanel from "../../core/SectionAsidePanel";
import PanelContent from "../../core/SectionAsidePanel/PanelContent";
import SubTitle from "../../core/SectionAsidePanel/SubTitle";
import styles from "./HighlightCard.module.css";
import { HighlightCardSectionValues } from "@/types";
import ContentEditable from "../../core/ContentEditable";

interface Props {
  defaultValue: HighlightCardSectionValues;
  onChange: (values: HighlightCardSectionValues) => void;
}

export default function HighlightCard({ defaultValue, onChange }: Props) {
  const [cardLength, setCardLength] = useState<number>(5);
  const [values, setValues] = useState<HighlightCardSectionValues>({
    enable: defaultValue?.enable ?? true,
    heading: defaultValue?.heading ?? "",
    cardList: defaultValue?.cardList ?? [],
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
    <Section label="하이라이트 카드">
      {({ active, setActive }) => (
        <>
          {active && (
            <SectionAsidePanel
              title="하이라이트 카드"
              description="강조하고 싶은 내용을 카드로 만들어 주세요."
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
                <SubTitle>카드 개수</SubTitle>
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    setCardLength(Number(e.target.value));
                  }}
                >
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5" selected>
                    5
                  </option>
                </select>
              </PanelContent>
            </SectionAsidePanel>
          )}
          <div className={styles.wrapper}>
            <div className={styles.innerContents}>
              <ContentEditable
                tagName="h2"
                className={styles.heading}
                defaultValue={values.heading}
                onInputChange={(content) =>
                  handleChangeValues("heading", content)
                }
              />

              <ul className={styles.cardList}>
                {Array.from({ length: cardLength }, (_, index) => (
                  <li key={index} className={styles.cardItem}>
                    <ContentEditable
                      tagName="h3"
                      className={styles.cardTitle}
                      defaultValue={
                        values.cardList.length > index
                          ? values.cardList[index]?.title
                          : ""
                      }
                      onInputChange={(content) => {
                        const { cardList } = { ...values };

                        if (values.cardList.length > index) {
                          cardList[index].title = content;
                        } else {
                          cardList[index] = {
                            title: content,
                            description: "",
                          };
                        }

                        handleChangeValues("cardList", cardList);
                      }}
                    />
                    <ContentEditable
                      tagName="p"
                      className={styles.cardDescription}
                      defaultValue={
                        values.cardList.length > index
                          ? values.cardList[index]?.description
                          : ""
                      }
                      onInputChange={(content) => {
                        const { cardList } = { ...values };

                        if (values.cardList.length > index) {
                          cardList[index].description = content;
                        } else {
                          cardList[index] = {
                            title: "",
                            description: content,
                          };
                        }
                        handleChangeValues("cardList", cardList);
                      }}
                    />
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
