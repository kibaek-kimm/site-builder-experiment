import { FooterValues } from "@/types";
import styles from "./Footer.module.css";
import { useState } from "react";
import ContentEditable from "../../core/ContentEditable";

interface Props {
  defaultValue?: FooterValues;
  onChange?: (values: FooterValues) => void;
}

export default function Footer({ defaultValue, onChange }: Props) {
  const [values, setValues] = useState<FooterValues>(defaultValue ?? {});

  const handleChangeValues = (key: string, value: string) => {
    const newState = { ...values };
    newState[key] = value;

    setValues(newState);

    if (onChange) {
      onChange(newState);
    }
  };

  return (
    <div className={styles.wrapper}>
      <ContentEditable
        tagName="h2"
        className={styles.footerTitle}
        defaultValue={values.companyName}
        onInputChange={(content) => handleChangeValues("companyName", content)}
      />
      <div>
        <ContentEditable
          tagName="address"
          className={styles.address}
          defaultValue={values.companyInfo}
          role="company-information"
          onInputChange={(content) =>
            handleChangeValues("companyInfo", content)
          }
        />
      </div>
    </div>
  );
}
