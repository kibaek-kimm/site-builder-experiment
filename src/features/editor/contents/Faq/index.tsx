import { useState } from "react";
import Section from "../../core/Section";
import SectionAsidePanel from "../../core/SectionAsidePanel";
import PanelContent from "../../core/SectionAsidePanel/PanelContent";
import SubTitle from "../../core/SectionAsidePanel/SubTitle";
import styles from "./Faq.module.css";
import { FAQdSectionValues } from "@/types";
import ContentEditable from "../../core/ContentEditable";
import StructuredContentEditable from "../../core/StructuredContentEditable";
import classNames from "classnames";

interface Props {
  defaultValue?: FAQdSectionValues;
  onChange?: (values: FAQdSectionValues) => void;
}

export default function Faq({ defaultValue, onChange }: Props) {
  const [cardLength, setCardLength] = useState<number>(5);
  const [values, setValues] = useState<FAQdSectionValues>({
    enable: defaultValue?.enable ?? true,
    faqList: defaultValue?.faqList ?? [],
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
                  defaultValue="5"
                  name=""
                  id=""
                  onChange={(e) => {
                    setCardLength(Number(e.target.value));
                  }}
                >
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </PanelContent>
            </SectionAsidePanel>
          )}
          <div className={styles.wrapper}>
            <div className={styles.innerContents}>
              <h2>자주 묻는 질문</h2>

              <ul className={styles.cardList} data-testid="faq-list">
                {Array.from({ length: cardLength }, (_, index) => (
                  <li
                    key={index}
                    className={classNames(styles.faqItem, styles.active)}
                  >
                    <a className={styles.toggleButton}>
                      <ContentEditable
                        tagName="div"
                        className={styles.question}
                        defaultValue={
                          values.faqList.length > index
                            ? values.faqList[index]?.question
                            : ""
                        }
                        onInputChange={(content) => {
                          const { faqList } = { ...values };

                          if (values.faqList.length > index) {
                            faqList[index].question = content;
                          } else {
                            faqList[index] = {
                              question: content,
                              answer: [],
                            };
                          }

                          handleChangeValues("faqList", faqList);
                        }}
                      />
                    </a>
                    <StructuredContentEditable
                      parentNode={<ul className={styles.answerList} />}
                      childNode={<li className={styles.answerListItem} />}
                      defaultValue={
                        values.faqList.length > index
                          ? values.faqList[index]?.answer
                          : []
                      }
                      onChange={(content: string[]) => {
                        const { faqList } = { ...values };

                        faqList[index].answer = content;
                        handleChangeValues("faqList", faqList);
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
