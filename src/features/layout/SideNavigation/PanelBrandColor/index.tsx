import { FormEvent, useEffect, useRef, useState } from "react";
import commonStyles from "../SideNavigation.module.css";
import styles from "./PanelBrandColor.module.css";
import { validateHex } from "./helper";

interface Props {
  defaultValue?: string;
  onChangeComplete?: (color: string) => void;
}

export default function PanelBrandColor({
  defaultValue,
  onChangeComplete,
}: Props) {
  const [invalidHex, setInvalidHex] = useState<boolean>();
  const [customPrimaryColor, setCustomPrimaryColor] = useState<string>("");
  const colorPickerRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateHex(customPrimaryColor);

    setInvalidHex(!isValid);

    if (!isValid) {
      return;
    }

    if (onChangeComplete) {
      onChangeComplete(customPrimaryColor);
    }
  };

  useEffect(() => {
    if (typeof defaultValue == "string" && defaultValue !== "") {
      const isValid = validateHex(defaultValue);

      if (!isValid) {
        setInvalidHex(true);
      } else {
        setCustomPrimaryColor(defaultValue);
      }
    }
  }, [defaultValue]);

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.wrapper}>
        <button
          type="button"
          title="컬러를 선택해주세요."
          className={styles.colorPickerButton}
          style={{ backgroundColor: customPrimaryColor }}
          onClick={() => {
            if (colorPickerRef.current) {
              colorPickerRef.current.click();
            }
          }}
        />
        <input
          type="color"
          ref={colorPickerRef}
          defaultValue={customPrimaryColor}
          className={styles.colorInput}
          onChange={(e) => setCustomPrimaryColor(e.target.value)}
        />

        <div className={styles.primaryColorField}>
          <input
            className={commonStyles.input}
            placeholder="브랜드 컬러를 입력해주세요."
            value={customPrimaryColor}
            onChange={(e) => setCustomPrimaryColor(e.target.value)}
          />
          <button>적용</button>
        </div>
      </div>
      {invalidHex && (
        <div className={styles.errorMessage}>hex값이 유효하지 않습니다.</div>
      )}
    </form>
  );
}
