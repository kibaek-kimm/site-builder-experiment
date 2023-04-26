/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, PropsWithChildren, ReactNode, useState } from "react";
import styles from "./SectionAsidePanel.module.css";
import SubTitle from "./SubTitle";

interface Props {
  title: string;
  description: ReactNode;
  defaultEnabled?: boolean;
  onClickClose: () => void;
  onChangeEnable: (enable: boolean) => void;
}

export default function SectionAsidePanel({
  children,
  title,
  description,
  defaultEnabled,
  onClickClose,
  onChangeEnable,
}: PropsWithChildren<Props>) {
  const [enable, setEnable] = useState<boolean>(!!defaultEnabled);

  const handleClose = () => {
    if (onClickClose) {
      onClickClose();
    }
  };

  const handleChangeEnable = (e: ChangeEvent<HTMLInputElement>) => {
    const newEnable = e.currentTarget.checked;
    console.log("newEnable::: ", newEnable);

    setEnable(newEnable);

    if (onChangeEnable) {
      onChangeEnable(newEnable);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.panelHeader}>
        <h3 className={styles.panelTitle}>{title}</h3>
        <button
          className={styles.closeButton}
          title="닫기"
          onClick={handleClose}
        >
          <img
            src="/images/ico-panel-close.png"
            srcSet="/images/ico-panel-close@2x.png 2x"
            alt=""
          />
        </button>
      </div>

      <div className={styles.panelBody}>
        <div className={styles.enableSection}>
          <SubTitle className={styles.subTitle}>사용여부</SubTitle>
          <input
            type="checkbox"
            id="enable-section"
            checked={enable}
            onChange={handleChangeEnable}
          />
        </div>

        <div className={styles.sectionDescription}>{description}</div>
        {children}
      </div>
    </div>
  );
}
