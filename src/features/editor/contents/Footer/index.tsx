import { FooterValues } from "@/types";
import styles from "./Footer.module.css";

interface Props extends FooterValues {}

export default function Footer({ companyName, companyInfo }: Props) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.footerTitle}>{companyName}</h2>
      <div>
        <address
          className={styles.address}
          dangerouslySetInnerHTML={{ __html: companyInfo }}
        />
      </div>
    </div>
  );
}
