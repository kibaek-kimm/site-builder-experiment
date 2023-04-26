import { useState } from "react";
import Section from "../../core/Section";
import SectionAsidePanel from "../../core/SectionAsidePanel";
import PanelContent from "../../core/SectionAsidePanel/PanelContent";
import SubTitle from "../../core/SectionAsidePanel/SubTitle";
import { InterviewSLideSectionValues } from "@/types";
import ImageUploaderList from "../../core/ImageUploader/ImageUploaderList";
import ImageUploader from "../../core/ImageUploader";
import { uploadImage } from "@/apis/uploadImage";
import styles from "./InterviewSlide.module.css";
import ContentEditable from "../../core/ContentEditable";
import classNames from "classnames";

interface Props {
  defaultValue: InterviewSLideSectionValues;
  onChange: (values: InterviewSLideSectionValues) => void;
}

export default function InterviewSlide({ defaultValue, onChange }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardLength, setCardLength] = useState<number>(3);
  const [values, setValues] = useState<InterviewSLideSectionValues>({
    enable: defaultValue?.enable ?? true,
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

  const handleClickPrev = () => {
    if (activeIndex === 0) {
      setActiveIndex(cardLength - 1);

      return;
    }

    setActiveIndex((prevState) => prevState - 1);
  };

  const handleClickNext = () => {
    if (activeIndex === cardLength - 1) {
      setActiveIndex(0);

      return;
    }

    setActiveIndex((prevState) => prevState + 1);
  };

  return (
    <Section lable="인터뷰 슬라이드">
      {({ active, setActive }) => (
        <>
          {active && (
            <SectionAsidePanel
              title="인터뷰 슬라이드"
              description="현직자 혹은 유명 인사들의 코멘트를 작성해주세요."
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
                <SubTitle>인터뷰 개수</SubTitle>
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    setCardLength(Number(e.target.value));
                  }}
                >
                  <option value="2">2</option>
                  <option value="3" selected>
                    3
                  </option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </PanelContent>
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
                  {Array.from({ length: cardLength }, (_, index) => (
                    <ImageUploader
                      key={index}
                      defaultImage={values.cardList[index]?.image}
                      onUploadedFile={async (file) => {
                        const { data, status } = await uploadImage(file);

                        if (status === 200) {
                          const { cardList } = { ...values };

                          if (values.cardList.length > index) {
                            cardList[index].image = data.path;
                          } else {
                            cardList[index] = {
                              image: data.path,
                              content: "",
                              interviewee: "",
                            };
                          }

                          handleChangeValues("cardList", cardList);
                          setActiveIndex(index);
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
              <a
                className={classNames(styles.arrow, styles.arrowLeft)}
                onClick={handleClickPrev}
              />
              <a
                className={classNames(styles.arrow, styles.arrowRight)}
                onClick={handleClickNext}
              />
              <div className={styles.cardList}>
                {Array.from({ length: cardLength }, (_, index) => (
                  <div
                    key={index}
                    className={classNames(styles.cardItem, {
                      [styles.active]: activeIndex === index,
                    })}
                  >
                    <div className={styles.image}>
                      {values.cardList.length > index &&
                        values.cardList[index]?.image && (
                          <img src={values.cardList[index]?.image} alt="" />
                        )}
                    </div>

                    <ContentEditable
                      tagName="div"
                      className={styles.content}
                      defaultValue={
                        values.cardList.length > index
                          ? values.cardList[index]?.content
                          : ""
                      }
                      onInputChange={(content) => {
                        const { cardList } = { ...values };

                        if (values.cardList.length > index) {
                          cardList[index].content = content;
                        } else {
                          cardList[index] = {
                            image: "",
                            content,
                            interviewee: "",
                          };
                        }

                        handleChangeValues("cardList", cardList);
                      }}
                    />
                    <ContentEditable
                      tagName="p"
                      className={styles.interviewee}
                      defaultValue={
                        values.cardList.length > index
                          ? values.cardList[index]?.interviewee
                          : ""
                      }
                      onInputChange={(content) => {
                        const { cardList } = { ...values };

                        if (values.cardList.length > index) {
                          cardList[index].interviewee = content;
                        } else {
                          cardList[index] = {
                            image: "",
                            content: "",
                            interviewee: content,
                          };
                        }
                        handleChangeValues("cardList", cardList);
                      }}
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
