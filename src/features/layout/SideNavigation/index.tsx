import useBuilderStore from "@/store";
import styles from "./SideNavigation.module.css";
import ImageUploaderList from "@/features/editor/core/ImageUploader/ImageUploaderList";
import ImageUploader from "@/features/editor/core/ImageUploader";
import { useRef, useState } from "react";
import classNames from "classnames";
import { uploadImage } from "@/apis/uploadImage";

export default function SideNavigation() {
  const colorPickerRef = useRef<HTMLInputElement>(null);
  const [customPrimaryColor, setCustomPrimaryColor] = useState<string>("");
  const { setBuilderMetadata, primaryColor, enableCompanyWebsite } =
    useBuilderStore();

  return (
    <aside className={styles.wrapper}>
      <div className={styles.tabs}>
        <label htmlFor="metadata">기본 설정</label>
        <input type="radio" id="metadata" name="builder-contents" />
        &nbsp; &nbsp; &nbsp; &nbsp;
        <label htmlFor="contents">콘텐츠</label>
        <input type="radio" id="contents" name="builder-contents" />
      </div>

      <div className={styles.group}>
        <div className={styles.subTitle}>도메인</div>
        <div className={styles.domain}>
          http://insight.wanted.co.kr/eb-site/
        </div>
        <input type="text" className={styles.input} />
      </div>
      <div className={styles.group}>
        <div className={styles.subTitle}>브랜드 컬러</div>
        <div className={styles.primaryColorWrapper}>
          <button
            className={styles.colorPickerButton}
            style={{ backgroundColor: primaryColor }}
            onClick={() => {
              if (colorPickerRef.current) {
                colorPickerRef.current.click();
              }
            }}
          />
          <input
            type="color"
            ref={colorPickerRef}
            defaultValue={primaryColor}
            className={styles.colorInput}
            onChange={(e) =>
              setBuilderMetadata({ primaryColor: e.target.value })
            }
          />

          <div className={styles.primaryColorField}>
            <input
              className={styles.input}
              placeholder={primaryColor}
              value={customPrimaryColor}
              onChange={(e) => setCustomPrimaryColor(e.target.value)}
            />
            <button
              onClick={() => {
                setBuilderMetadata({ primaryColor: customPrimaryColor });
                setCustomPrimaryColor("");
              }}
            >
              적용
            </button>
          </div>
        </div>
      </div>
      <div className={styles.group}>
        <div className={styles.subTitle}>로고 이미지</div>
        <ImageUploaderList
          disclaimer={
            <>
              파일 규격 jpg, png, gif, svg <br />
              권장 최소 가로 크기 <strong>176px</strong>, 최대 이미지 크기{" "}
              <strong>1M</strong>
            </>
          }
        >
          <ImageUploader
            onUploadedFile={async (file) => {
              const { status, data } = await uploadImage(file);

              if (status === 200) {
                setBuilderMetadata({ logo: data.path });
              }
            }}
          />
        </ImageUploaderList>
      </div>
      <div className={styles.group}>
        <div className={styles.subTitle}>기업 사이트 링크</div>
        <div className={styles.enableWrapper}>
          <label htmlFor="enable-website">사용 여부</label>
          <input
            type="checkbox"
            id="enable-website"
            readOnly
            checked={enableCompanyWebsite}
            onChange={(e) => {
              setBuilderMetadata({ enableCompanyWebsite: e.target.checked });
            }}
          />
        </div>
        <input
          type="website"
          className={styles.input}
          disabled={!enableCompanyWebsite}
          onChange={(e) => {
            setBuilderMetadata({ companyWebsite: e.target.value });
          }}
        />
      </div>
    </aside>
  );
}
