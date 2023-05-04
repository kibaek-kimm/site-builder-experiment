import { useState } from "react";
import ContentEditable from "../../core/ContentEditable";
import Section from "../../core/Section";
import styles from "./VideoContents.module.css";
import { VideoContentsSectionValues } from "@/types";
import SectionAsidePanel from "../../core/SectionAsidePanel";
import PanelContent from "../../core/SectionAsidePanel/PanelContent";
import { extractYouTubeID } from "@/utils/extractYouTubeID";

interface Props {
  defaultValue?: Partial<VideoContentsSectionValues>;
  onChange?: (values: VideoContentsSectionValues) => void;
}

export default function VideoContents({ defaultValue, onChange }: Props) {
  const [youtubeId, setYoutubeId] = useState<string>("");
  const [values, setValues] = useState<VideoContentsSectionValues>({
    enable: defaultValue?.enable ?? true,
    heading: defaultValue?.heading ?? "",
    description: defaultValue?.description ?? "",
    youtubeId: defaultValue?.youtubeId ?? "",
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
    <Section label="영상 콘텐츠">
      {({ active, setActive }) => (
        <>
          {active && (
            <SectionAsidePanel
              title="영상 콘텐츠"
              description="유튜브 영상을 임베드 할 수 있습니다."
              onClickClose={() => setActive(false)}
            >
              <PanelContent>
                <div className={styles.panelYoutubeLink}>https://youtu.be/</div>
                <div>
                  <input
                    type="text"
                    name="youtube-code"
                    placeholder="공유 코드"
                    value={youtubeId}
                    onChange={(e) => {
                      setYoutubeId(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      if (youtubeId) {
                        const extractedYoutubeId = extractYouTubeID(youtubeId);

                        if (extractedYoutubeId) {
                          setYoutubeId(extractedYoutubeId);
                          handleChangeValues("youtubeId", extractedYoutubeId);
                        } else {
                          alert("값이 유효하지 않습니다!");
                        }
                      }
                    }}
                  >
                    연결
                  </button>
                </div>
              </PanelContent>
            </SectionAsidePanel>
          )}
          <div className={styles.wrapper}>
            <div className={styles.innerContents}>
              <div className={styles.textWrapper}>
                <ContentEditable
                  tagName="h3"
                  className={styles.heading}
                  defaultValue={values.heading}
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
              <div className={styles.videoWrapper}>
                {values.youtubeId && (
                  <iframe
                    className={styles.youtube}
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${values.youtubeId}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Section>
  );
}
